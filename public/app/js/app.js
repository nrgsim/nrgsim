(function(NRGSIM, $, undefined) {

  var camera, scene, renderer;
  var controls;
  var materials = [
    new THREE.MeshBasicMaterial({ color: 0x000000 }), //Outer Floor Color 
    new THREE.MeshBasicMaterial({ color: 0x666666 }), //Outer Roof Ceiling Color 
    //new THREE.MeshLambertMaterial({ color: 0xcccccc, opacity: 0.1, depthWrite: false, depthTest: false, vertexColors: THREE.VertexColors }),
    new THREE.MeshBasicMaterial({ color: 0xcccccc, wireframe: true }), //WireFrame or Wall color 
    new THREE.MeshBasicMaterial({ color: 0xe0ffff, opacity: 1.0, depthWrite: false, depthTest: false, vertexColors: THREE.NoColors }) //Window Color etc 
  ];
  var transform;

  // Create a transform matrix that will put the center of a zone at the origin (0, 0, 0)
  function buildOriginTransform(zone) {
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
  }

  function getMaterialIndex(surfaceType) {
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
  }

  function createGeometry(surface, transform) {
    var geometry = new THREE.PlaneGeometry();
    geometry.vertices = [];
    _.each(surface.vertices, function(vertex) {
      var vector = new THREE.Vector3(vertex.x, vertex.y, vertex.z);
      vector.applyMatrix4(transform);
      geometry.vertices.push(vector);
    });
    return geometry;
  }

  function createFaces(surface) {
    var faces = [];
    var face = new THREE.Face3(0, 1, 2);
    face.materialIndex = getMaterialIndex(surface.type);
    faces.push(face);
    face = new THREE.Face3(2, 3, 0);
    face.materialIndex = getMaterialIndex(surface.type);
    faces.push(face);
    return faces;
  }

  function addPlane(scene, surface, transform) {
      var geometry = createGeometry(surface, transform);
      geometry.faces = createFaces(surface);
      geometry.computeBoundingSphere();
      geometry.computeFaceNormals();
      geometry.computeCentroids();
      geometry.name = surface.name;
      geometry.type = surface.type;

      //var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors, overdraw: 0.5 });
      var plane = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
      scene.add(plane);
  }

  function addPlanes(scene, surfaces, transform) {
    _.each(surfaces, function(surface) {
      if (surface.BuildingSurface) {
        addPlane(scene, surface.BuildingSurface, transform);
      } else if (surface.FenestrationSurface) {
        addPlane(scene, surface.FenestrationSurface, transform);
      }
    });
  }

  function createCamera(canvas) {
    var camera = new THREE.PerspectiveCamera(3, canvas.innerWidth() / canvas.innerHeight(), 1, 1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 100;
    return camera;
  }

  function createCanvasControls(canvas) {
    var controls = new THREE.TrackballControls(camera, canvas[0]);
    controls.rotateSpeed = 0.7;
    controls.zoomSpeed = 0.7;
    controls.panSpeed = 0.7;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [ 65, 83, 68 ];
    return controls;
  }

  function createManualControls() {
    $("#Length").slider({ min: 1, max: 10, value: 5, slide: updateSliderDisplay });
    $("#Depth").slider({ min: 1, max: 10, value: 5, slide: updateSliderDisplay });
    $("#Height").slider({ min: 1, max: 10, value: 5, slide: updateSliderDisplay });
    $("#NWinGR").slider({ min: 1, max: 99, value: 50, disabled: true, slide: updateSliderDisplay });
    $("#EWinGR").slider({ min: 1, max: 99, value: 50, disabled: true, slide: updateSliderDisplay });
    $("#SWinGR").slider({ min: 1, max: 99, value: 50, disabled: true, slide: updateSliderDisplay });
    $("#WWinGR").slider({ min: 1, max: 99, value: 50, disabled: true, slide: updateSliderDisplay });
    $("#insulation-level").slider({ min: 1, max: 10, value: 5 });
    $("#ventilation-rate").slider({ min: 1, max: 10, value: 5 });
    $("#run-button").button();

    $("#NWin").change(handleSliderCheckboxChange);
    $("#EWin").change(handleSliderCheckboxChange);
    $("#SWin").change(handleSliderCheckboxChange);
    $("#WWin").change(handleSliderCheckboxChange);

    setSliderDisplayValue('#Length');
    setSliderDisplayValue('#Depth');
    setSliderDisplayValue('#Height');
    setSliderDisplayValue('#NWinGR');
    setSliderDisplayValue('#EWinGR');
    setSliderDisplayValue('#SWinGR');
    setSliderDisplayValue('#WWinGR');

    $("#run-button").click(function(evt) {
      runSimulation();
    });
  }

  function handleSliderCheckboxChange(event) {
    console.log(event.target.id + ' ' + this.checked);
    var grId = '#'+event.target.id+'GR';
    $(grId).slider(this.checked ? "enable" : "disable");
    if (this.checked) {
      $(grId+'Disp').show();
    } else {
      $(grId+'Disp').hide();
    }
    
  }

  function updateSliderDisplay(event, ui) {
    setSliderDisplayValue('#'+event.target.id, ui.value);
  }

  function setSliderDisplayValue(sliderId, val) {
    if (val === undefined) {
      val = $(sliderId).slider('value');
    }
    $(sliderId+'Disp').text(val);
  }

  function createRenderer(canvas) {
    var renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setSize(canvas.innerWidth(), canvas.innerHeight());
    return renderer;
  }

  function init() {
    var container = $("#canvas");
    scene = new THREE.Scene();
    camera = createCamera(container);
    controls = createCanvasControls(container);
    createManualControls();
    renderer = createRenderer(container);
    container[0].appendChild(renderer.domElement);

    /*
    $.get("excel/ZoneGeometry.xlsx", function(d) {
      var transform = buildOriginTransform(d.data.zone);
      addPlanes(scene, d.data.zone, transform);
      addPlanes(scene, d.data.windows, transform);
    });
    */
    $.get('simulation/load/25', function(d) {
      if (d.status === 0) {
        transform = buildOriginTransform(d.data.zone);
        addPlanes(scene, d.data.zone, transform);
      }
    });

    window.addEventListener('resize', function() {
      var canvas = $('#canvas');
      var width = canvas.innerWidth();
      var height = canvas.innerHeight();
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  init();
  animate();

  function runSimulation() {
    var zone = [];
    var inverseTransform = new THREE.Matrix4();
    inverseTransform.getInverse(transform);
    _.each(scene.children, function(child) {
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

window.console.log(zone);
    $.post('simulation/run', { zone: zone }, handleSimulationResults);
  }

  function handleSimulationResults(data, status) {
    window.console.log(data);
    window.console.log(status);
  }

})(window.NRGSIM = window.NRGSIM || {}, jQuery);
