window.app.views.SimPage = Backbone.View.extend({

  el: "#view",
  template: JST["app/templates/sim.us"],
  camera: null,
  scene: null,
  renderer: null,
  controls: null,
  transform: null,
  materials: [
    //new THREE.MeshLambertMaterial({ color: 0x000000 }), //Outer Floor Color 
    ///new THREE.MeshLambertMaterial({ color: 0x666666 }), //Outer Roof Ceiling Color 
    //new THREE.MeshLambertMaterial({ color: 0xcccccc, opacity: 0.1, depthWrite: false, depthTest: false, vertexColors: THREE.VertexColors }),
    //new THREE.MeshLambertMaterial({ color: 0xcccccc, wireframe: true }), //WireFrame or Wall color 
    //new THREE.MeshLambertMaterial({ color: 0xe0ffff, opacity: 0.8, depthWrite: false, depthTest: false, vertexColors: THREE.NoColors }) //Window Color etc 
  ],

  events: {
    'click #run-button' : 'runSimulation',
    'change .group-disable' : 'handleSliderCheckboxChange'
  },

  // Create a transform matrix that will put the center of a zone at the origin (0, 0, 0)
  buildOriginTransform: function(zone) {
    var dimensions = { x: {}, y: {}, z: {} };
    _.each(zone, function(surface) {
      if (surface.BuildingSurface) {
        _.each(surface.BuildingSurface.vertices, function(vertex) {
          if (dimensions.x.min === undefined || vertex.x < dimensions.x.min) { dimensions.x.min = vertex.x; }
          if (dimensions.x.max === undefined || vertex.x > dimensions.x.max) { dimensions.x.max = vertex.x; }
          if (dimensions.y.min === undefined || vertex.y < dimensions.y.min) { dimensions.y.min = vertex.y; }
          if (dimensions.y.max === undefined || vertex.y > dimensions.y.max) { dimensions.y.max = vertex.y; }
          if (dimensions.z.min === undefined || vertex.z < dimensions.z.min) { dimensions.z.min = vertex.z; }
          if (dimensions.z.max === undefined || vertex.z > dimensions.z.max) { dimensions.z.max = vertex.z; }
        });
      }
    });

    return new THREE.Matrix4().makeTranslation(-dimensions.x.min-(dimensions.x.max-dimensions.x.min)/2,
      -dimensions.y.min-(dimensions.y.max-dimensions.y.min)/2,
      -dimensions.z.min-(dimensions.z.max-dimensions.z.min)/2);
  },

  getMaterialIndex: function(surfaceType) {
    switch (surfaceType) {
      case 'Floor':
        return 0;
      case 'Ceiling':
        return 1;
      case 'Wall':
        return 2;
      case 'Window':
        return 3;
    }
    return -1;
  },

  createGeometry: function(surface, transform) {
    var geometry = new THREE.PlaneGeometry();
    geometry.vertices = [];
    _.each(surface.vertices, function(vertex) {
      var vector = new THREE.Vector3(vertex.x, vertex.y, vertex.z);
      vector.applyMatrix4(transform);
      geometry.vertices.push(vector);
    });
    return geometry;
  },

  createFaces: function(surface) {
    var faces = [];
    var face = new THREE.Face3(0, 1, 2);
    face.materialIndex = this.getMaterialIndex(surface.type);
    faces.push(face);
    face = new THREE.Face3(2, 3, 0);
    face.materialIndex = this.getMaterialIndex(surface.type);
    faces.push(face);
    return faces;
  },

  addPlane: function(scene, surface, transform) {
      var geometry = this.createGeometry(surface, transform);
      geometry.faces = this.createFaces(surface);
      geometry.computeBoundingSphere();
      geometry.computeFaceNormals();
      geometry.computeCentroids();
      geometry.name = surface.name;
      geometry.type = surface.type;

      //var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors, overdraw: 0.5 });
      //var plane = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(this.materials));
      //plane.castShadow=true;
      //scene.add(plane);
      var axes = new THREE.AxisHelper (20);
      scene.add(axes);
      var cubeGeometry=new THREE.CubeGeometry(4,3,4);
      var cubeMaterial= new THREE.MeshLambertMaterial({color: 0xf2d478});
      var solarCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      solarCube.position.x=0;
      solarCube.position.y=0;
      solarCube.position.z=2;
      solarCube.castShadow=true;
      scene.add(solarCube);

      var groundPlaneGeometry = new THREE.PlaneGeometry (100,100);
      var groundPlaneMaterial= new THREE.MeshLambertMaterial ({color: 0xcccccc});
      var groundPlane = new THREE.Mesh (groundPlaneGeometry, groundPlaneMaterial);
      groundPlane.position.x=0;
      groundPlane.position.y=0;
      groundPlane.position.z=-0;
      groundPlane.receiveShadow=true;
      scene.add(groundPlane);

      var sunLight= new THREE.DirectionalLight (0xffffff, 0.1);
      sunLight.position.set(45,45,100);
      sunLight.castShadow=true;
      sunLight.onlyShadow=false;
      scene.add(sunLight);
      
      //var ambilight = new THREE.AmbientLight( 0x404040 ); // soft white light
      //scene.add( ambilight );
  },

  addPlanes: function(scene, surfaces, transform) {
    var self = this;
    _.each(surfaces, function(surface) {
      if (surface.BuildingSurface) {
        self.addPlane(scene, surface.BuildingSurface, transform);
      } else if (surface.FenestrationSurface) {
        self.addPlane(scene, surface.FenestrationSurface, transform);
      }
    });
  },

  createCamera: function(canvas) {
    var camera = new THREE.PerspectiveCamera(60, canvas.innerWidth() / canvas.innerHeight(), 1, 1000);
    camera.position.x = -10;
    camera.position.y = 10;
    camera.position.z = 5;
    //camera.lookAt(scene.position);
    return camera;
  },

  createCanvasControls: function(canvas) {
    var controls = new THREE.TrackballControls(this.camera, canvas[0]);
    controls.rotateSpeed = 0.1;
    controls.zoomSpeed = 0.5;
    controls.panSpeed = 0.7;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [ 65, 83, 68 ];
    return controls;
  },

  createManualControls: function() {
    var self = this;
    $("#Length").slider({ min: 1, max: 10, value: 5, slide: self.updateSliderDisplay });
    $("#Depth").slider({ min: 1, max: 10, value: 5, slide: self.updateSliderDisplay });
    $("#Height").slider({ min: 1, max: 10, value: 5, slide: self.updateSliderDisplay });
    $("#NWinGR").slider({ min: 1, max: 99, value: 50, disabled: true, slide: self.updateSliderDisplay });
    $("#EWinGR").slider({ min: 1, max: 99, value: 50, disabled: true, slide: self.updateSliderDisplay });
    $("#SWinGR").slider({ min: 1, max: 99, value: 50, disabled: true, slide: self.updateSliderDisplay });
    $("#WWinGR").slider({ min: 1, max: 99, value: 50, disabled: true, slide: self.updateSliderDisplay });
    $("#insulation-level").slider({ min: 1, max: 10, value: 5 });
    $("#ventilation-rate").slider({ min: 1, max: 10, value: 5 });
    $("#run-button").button();

    this.setSliderDisplayValue('#Length');
    this.setSliderDisplayValue('#Depth');
    this.setSliderDisplayValue('#Height');
    this.setSliderDisplayValue('#NWinGR');
    this.setSliderDisplayValue('#EWinGR');
    this.setSliderDisplayValue('#SWinGR');
    this.setSliderDisplayValue('#WWinGR');
  },

  handleSliderCheckboxChange: function(event) {
    var grId = '#'+event.target.id+'GR';
    $(grId).slider(event.target.checked ? "enable" : "disable");
    if (event.target.checked) {
      $(grId+'Disp').show();
    } else {
      $(grId+'Disp').hide();
    }
  },

  updateSliderDisplay: function(event, ui) {
    this.setSliderDisplayValue('#'+event.target.id, ui.value);
  },

  setSliderDisplayValue: function(sliderId, val) {
    if (val === undefined) {
      val = $(sliderId).slider('value');
    }
    $(sliderId+'Disp').text(val);
  },

  createRenderer: function(canvas) {
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColorHex(0xffffff, 1.0);
    renderer.setSize(canvas.innerWidth(), canvas.innerHeight());
    renderer.shadowMapEnabled=true;
    return renderer;
  },

  init: function() {
    var self = this;
    var container = $("#canvas");
    this.scene = new THREE.Scene();
    this.camera = this.createCamera(container);
    this.controls = this.createCanvasControls(container);
    this.createManualControls();
    this.renderer = this.createRenderer(container);
    container[0].appendChild(this.renderer.domElement);

    $.get('simulation/load/25', function(d) {
      if (d.status === 0) {
        transform = self.buildOriginTransform(d.data.zone);
        self.addPlanes(self.scene, d.data.zone, transform);
      }
    });

    window.addEventListener('resize', function() {
      var canvas = $('#canvas');
      var width = canvas.innerWidth();
      var height = canvas.innerHeight();
      renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    });
  },

  animate: function(controls, renderer) {
    window.requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  },


  runSimulation: function() {
    var zone = [];
    var inverseTransform = new THREE.Matrix4();

    var progbar = $('#progressbar');

    $("#run-button").button("option", "disabled", true);
    progbar.progressbar({ value: false });
    progbar.show();

    inverseTransform.getInverse(transform);
    _.each(this.scene.children, function(child) {
      var result = {};
      result.name = child.geometry.name;
      result.type = child.geometry.type;
      result.vertices = [];

      _.each(child.geometry.vertices, function(vertex) {
        var vert = vertex.clone().applyMatrix4(inverseTransform);
        result.vertices.push({x: vert.x, y: vert.y, z: vert.z});
      });

      zone.push(result);
    });

    $.post('simulation/run', { zone: zone }, this.getSimulationResults);
  },

  getSimulationResults: function(data, status) {
    window.console.log(data);
    window.console.log(status);
    $.get('simulation/' + data.jobId, this.handleSimulationResults.bind(this));
    // TODO: add some error checking
  },

  handleSimulationResults: function(results) {
    if (results.finished) {
      window.console.log('simulation run finished');
      window.console.log(results);
      var progbar = $('#progressbar');
      progbar.hide();
      progbar.progressbar('destroy');
      $("#run-button").button("option", "disabled", false);
    } else {
      window.setTimeout(this.getSimulationResults.bind(this, results), 5000);
    }
  },

  initialize: function(options) {
    _.bindAll(this);
    this.model = new window.app.models.Simulation();
  },

  render: function() {
    var self = this;
    this.$el.html(this.template(this.model.attributes));
    window.setTimeout(function() {
      self.init();
      self.animate();
    }, 0);
    return this;
  }

});
