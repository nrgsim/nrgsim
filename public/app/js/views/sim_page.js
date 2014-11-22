window.app.views.SimPage = Backbone.View.extend({

  el: "#view",

  template: JST["app/templates/sim.us"],

  camera: null,
  scene: null,
  renderer: null,
  controls: null,
  transform: null,
  solarCube: null,
  /*
  materials: [
    //new THREE.MeshLambertMaterial({ color: 0x000000 }), //Outer Floor Color
    ///new THREE.MeshLambertMaterial({ color: 0x666666 }), //Outer Roof Ceiling Color
    //new THREE.MeshLambertMaterial({ color: 0xcccccc, opacity: 0.1, depthWrite: false, depthTest: false, vertexColors: THREE.VertexColors }),
    //new THREE.MeshLambertMaterial({ color: 0xcccccc, wireframe: true }), //WireFrame or Wall color
    //new THREE.MeshLambertMaterial({ color: 0xe0ffff, opacity: 0.8, depthWrite: false, depthTest: false, vertexColors: THREE.NoColors }) //Window Color etc
  ],
  */

  events: {
    'resize window' : 'handleWindowResize',
    'click #run-button' : 'runSimulation',
    'change .group-disable' : 'handleSliderCheckboxChange',
    'click #left-panel-toggle' : 'toggleInputPanel',
    'change #input-menu' : 'inputMenuSelect',
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

  /*
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
    var boxGeometry =new THREE.BoxGeometry(4, 3, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xf2d478});
    var solarCube = new THREE.Mesh(boxGeometry, cubeMaterial);
    solarCube.position.x=0;
    solarCube.position.y=0;
    solarCube.position.z=2;
    solarCube.castShadow=true;
    scene.add(solarCube);

    var groundPlaneGeometry = new THREE.PlaneGeometry (100, 100);
    var groundPlaneMaterial= new THREE.MeshLambertMaterial ({color: 0xcccccc});
    var groundPlane = new THREE.Mesh (groundPlaneGeometry, groundPlaneMaterial);
    groundPlane.position.x=0;
    groundPlane.position.y=0;
    groundPlane.position.z=-0;
    groundPlane.receiveShadow=true;
    scene.add(groundPlane);

    var sunLight= new THREE.DirectionalLight (0xffffff, 0.1);
    sunLight.position.set(45, 45, 100);
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
  */

/*
South window sizer with a header until window gets too large
WindowHeaderSize depth set at .3 meters
This code needs to be hooked to slider for window percent 
window percent should not exceed 99%
Model Window as a thin box so it doesn't get lost in wall

windowheadersize=.3
Southper=double(Southpercent)/100
Southww=pow(Southper,0.5)*CDbl(EastWestLength)
Southwh=pow(Southper,0.5)*CDbl(BuildingHeight)
sy1=str((CDbl(EastWestLength)-Southww)/2)
sy2=str(((CDbl(EastWestLength)-Southww)/2)+Southww)
sz1=str(CDbl(BuildingHeight)-windowheadersize)
sz2=str(CDbl(BuildingHeight)-windowheadersize-Southwh)
*/

  initializeScene: function(scene, surfaces, transform) {
    var axes = new THREE.AxisHelper(2000);
    scene.add(axes);

    var boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    var cubeMaterial = new THREE.MeshBasicMaterial({color: 0xf2d478});
    this.solarCube = new THREE.Mesh(boxGeometry, cubeMaterial);
    this.solarCube.castShadow = true;
    this.solarCube.receiveShadow = true;
    this.solarCube.scale.x = 300;
    this.solarCube.scale.y = 400;
    this.solarCube.scale.z = 400;
    this.solarCube.position.x = 0;
    this.solarCube.position.y = 0;
    this.solarCube.position.z = 200;
    this.scene.add(this.solarCube);

    var southWindowGeometry = new THREE.BoxGeometry(1, 1, 1);
    var southWindowMaterial = new THREE.MeshBasicMaterial({color: 0x1011ff});
    this.southWindow = new THREE.Mesh(southWindowGeometry, southWindowMaterial);
    this.southWindow.castShadow = false;
    this.southWindow.receiveShadow = true;
    this.southWindow.scale.x = 150;
    this.southWindow.scale.y = 10;
    this.southWindow.scale.z = 200;
    this.southWindow.position.x = 0;
    this.southWindow.position.y = -200;
    this.southWindow.position.z = 200;
    this.scene.add(this.southWindow);

    var southShadeGeometry = new THREE.BoxGeometry(1, 1, 1);
    var southShadeMaterial = new THREE.MeshBasicMaterial({color: 0xd43d2d});
    this.southShade = new THREE.Mesh(southShadeGeometry, southShadeMaterial);
    this.southShade.castShadow = true;
    this.southShade.receiveShadow = false;
    this.southShade.scale.x = 300;
    this.southShade.scale.y = 100;
    this.southShade.scale.z = 10;
    this.southShade.position.x = 0;
    this.southShade.position.y = -200;
    this.southShade.position.z = 400;
    this.scene.add(this.southShade);

    var groundPlaneGeometry = new THREE.PlaneGeometry (10000, 10000);
    var groundPlaneMaterial = new THREE.MeshBasicMaterial ({color: 0xcccccc});
    var groundPlane = new THREE.Mesh(groundPlaneGeometry, groundPlaneMaterial);
    groundPlane.position.x = 0;
    groundPlane.position.y = 0;
    groundPlane.position.z = 0;
    groundPlane.receiveShadow = true;
    scene.add(groundPlane);

    var sunLight = new THREE.DirectionalLight (0xffffff, 0.1);
    sunLight.position.set(450, -450, 1000);
    sunLight.castShadow = true;
    sunLight.onlyShadow = true;
    scene.add(sunLight);
  },

  createCamera: function(canvas) {
    var camera = new THREE.PerspectiveCamera(60, canvas.innerWidth() / canvas.innerHeight(), 1, 10000);
    camera.position.x = 0;
    camera.position.y = -2000;
    camera.position.z = 200;
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

    $("#Length").slider({ min: 1, max: 10, value: 3, slide: self.updateLength });
    $("#Depth").slider({ min: 1, max: 10, value: 4, slide: self.updateWidth });
    $("#Height").slider({ min: 1, max: 10, value: 4, slide: self.updateHeight });  
    
    $("#ventilation-rate").slider({ min: 0.35, max: 10, value: 1 });

    $("#WinGR").slider({ min: 1, max: 99, value: 40, disabled: true, slide: self.updateSliderDisplay });
   // $("#NWinGR").slider({ min: 1, max: 99, value: 40, disabled: true, slide: self.updateSliderDisplay });
   // $("#EWinGR").slider({ min: 1, max: 99, value: 40, disabled: true, slide: self.updateSliderDisplay });
   // $("#SWinGR").slider({ min: 1, max: 99, value: 40, disabled: true, slide: self.updateSliderDisplay });
   // $("#WWinGR").slider({ min: 1, max: 99, value: 40, disabled: true, slide: self.updateSliderDisplay });

    $("#insulation-level").slider({ min: 1, max: 10, value: 3, slide: self.updateSliderDisplay });
   // $("#Rinsulation-level").slider({ min: 1, max: 10, value: 3, slide: self.updateSliderDisplay });
   // $("#Ninsulation-level").slider({ min: 1, max: 10, value: 2, slide: self.updateSliderDisplay });
   // $("#Einsulation-level").slider({ min: 1, max: 10, value: 2, slide: self.updateSliderDisplay });
   // $("#Sinsulation-level").slider({ min: 1, max: 10, value: 2, slide: self.updateSliderDisplay });
    //$("#Winsulation-level").slider({ min: 1, max: 10, value: 2, slide: self.updateSliderDisplay });

    //$("#occupency-type").selectmenu({Office,School,Residential});

    //$("#people-rate").slider({ min: 0, max: 100, value: 18 });
    //$("#lighting-rate").slider({ min: 0, max: 30, value: 11 });
    //$("#equipment-rate").slider({ min: 0, max: 30, value: 11 });
   // $("#hotwater-rate").slider({ min: 0, max: 30, value: 11 });

    $("#run-button").button();

    this.setSliderDisplayValue('#Length');
    this.setSliderDisplayValue('#Depth');
    this.setSliderDisplayValue('#Height');
    //this.setSliderDisplayValue('#infiltration-rate');

    this.setSliderDisplayValue('#WinGR');
    //this.setSliderDisplayValue('#NWinGR');
   // this.setSliderDisplayValue('#EWinGR');
   // this.setSliderDisplayValue('#SWinGR');
   // this.setSliderDisplayValue('#WWinGR');

    this.setSliderDisplayValue('#insulation-level');
   // this.setSliderDisplayValue('#Rinsulation-level');
   // this.setSliderDisplayValue('#Ninsulation-level');
   // this.setSliderDisplayValue('#Einsulation-level');
   // this.setSliderDisplayValue('#Sinsulation-level');
   // this.setSliderDisplayValue('#Winsulation-level');


   // this.setSliderDisplayValue('#people-rate');
  //  this.setSliderDisplayValue('#lighting-rate');
  //  this.setSliderDisplayValue('#equipment-rate');
  //  this.setSliderDisplayValue('#hotwater-rate');
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

  updateLength: function(event, ui) {
    this.updateSliderDisplay(event, ui);
    this.solarCube.scale.x = ui.value*100;
  },

  updateWidth: function(event, ui) {
    this.updateSliderDisplay(event, ui);
    this.solarCube.scale.y = ui.value*100;
  },

  updateHeight: function(event, ui) {
    this.updateSliderDisplay(event, ui);
    this.solarCube.scale.z = ui.value*100;
    this.solarCube.position.z = ui.value*100/2;
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
    renderer.shadowMapType = THREE.BasicShadowMap;
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
        transform = null; //self.buildOriginTransform(d.data.zone);
        self.initializeScene(self.scene, d.data.zone, transform);
      }
    });


    $('.accordion').accordion({ autoHeight: false });
    self.inputMenuSelect();


    // This help stuff is kludgy just to show that we can do it. It should be implemented better when we really have help.
    var helpDialog = $('#help-dialog').dialog({autoOpen: false});
    var otherHelpDialog = $('#other-help-dialog').dialog({autoOpen: false});
    $('#show-help').on('click', function(evt) {
      evt.preventDefault();
      helpDialog.dialog('open');
    });
    $('#other-help').on('click', function(evt) {
      evt.preventDefault();
      otherHelpDialog.dialog('open');
    });
  },

  handleWindowResize: function() {
    var canvas = $('#canvas');
    var width = canvas.innerWidth();
    var height = canvas.innerHeight();
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  },

  toggleInputPanel: function() {
    var panel = $('#inputs-panel');
    var wrapper = $('#inputs-panel .panel-content');
    if (panel.css('width') === '20px') {
      panel.css('width', '200px');
      wrapper.show();
      $('#left-panel-toggle').text('X');
    } else {
      panel.css('width', '20px');
      wrapper.hide();
      $('#left-panel-toggle').text('>');
    }
  },

  inputMenuSelect: function(evt, ui) {
    var sel = $('#input-menu').val();
    $('.input-wrapper-section').hide();
    $('#input-wrapper-'+sel).show();
  },

  animate: function(controls, renderer) {
    window.requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  },

  runSimulation: function() {
    var zone = { Window: null, northWindow: null, eastWindow: null, southWindow: null, westWindow: null };
    var inverseTransform = new THREE.Matrix4();
    var progbar = $('#progressbar');

    $("#run-button").button("option", "disabled", true);
    progbar.progressbar({ value: false });
    progbar.show();

    zone.weatherFile = "TODO: add UI to let user specify weather file";
    zone.length = $("#Length").slider('value');
    zone.width = $("#Depth").slider('value');
    zone.height = $("#Height").slider('value');

    if ($("#Win").prop("checked")) {
      zone.Window = $("#WinGR").slider('value');
    }

    if ($("#NWin").prop("checked")) {
      zone.northWindow = $("#NWinGR").slider('value');
    }


    if ($("#EWin").prop("checked")) {
      zone.northWindow = $("#EWinGR").slider('value');
    }

    if ($("#SWin").prop("checked")) {
      zone.southWindow = $("#SWinGR").slider('value');
    }

    if ($("#WWin").prop("checked")) {
      zone.westWindow = $("#WWinGR").slider('value');
    }

    zone.insulationLevel = $("#insulation-level").slider('value');
    zone.ventilationRate = $("#ventilation-rate").slider('value');

    $.post('simulation/run', zone, this.getSimulationResults);
  },

  getSimulationResults: function(data, status) {
    //window.console.log(data);
    //window.console.log(status);
    $.get('simulation/' + data.jobId, this.handleSimulationResults.bind(this));

    // TODO: add some error checking
  },

  handleSimulationResults: function(results, status, xhr) {
    if (xhr.status === 200) {
      //window.console.log('simulation run finished');
      var progbar = $('#progressbar');
      progbar.hide();
      progbar.progressbar('destroy');
      $("#run-button").button("option", "disabled", false);
      $("#results").text(results);
    } else {
      //window.console.log('simulation not finished');
      window.setTimeout(this.getSimulationResults.bind(this, results), 5000);
    }
  },

  initialize: function(options) {
    _.bindAll(this);
    this.model = new window.app.models.Simulation();
  },


  // NOTE: this is probably not the right way to implement this when using backbone. I'm not sure I understand what it does
  //       and it doesn't seem to make much differenct if I comment it out. I'd be happy to refactor it if I understood
  //       better what it is doing and how I can test it.
  onPageManipulations: function() {
    $(document).ready(function() {
      // global stuff that will be usefull throught
      var $win = $(window),
          $body = $('body'),
          curWinWidth = $win.width(),
          curWinHeight = $win.height(),
          timer,
          layoutView = 'small',
          smallMax = 640,
          mediumMax = 1024,
          checkLayout = function() {
            var $curWin = $(window);
            curWinWidth = $curWin.width();
            if ( curWinWidth <= smallMax ) {
              layoutView = 'small';
            } else if ( curWinWidth > smallMax && curWinWidth < mediumMax ) {
              layoutView = 'medium';
            } else {
              layoutView = 'large';
            }
            // console.log(layoutView);
          };

      var $mainContent = $('#main_content_id'),
          $mainHeader = $('#main_header_id'),
          levelContentHeight = function() {
            var mainHeaderHeight = $mainHeader.height(),
                newMainContnetHeight = curWinHeight - mainHeaderHeight;
            $mainContent.height(newMainContnetHeight);
          };


      // Panel Sliding
   //   var $resultsPanelToggle = $('#results_panel_toggle_id'),
   //       $inputsPanelToggle = $('#inputs_panel_toggle_id'),
   //       $resultsPanel = $('#results_panel_id'),
   //       $inputsPanel = $('#inputs_panel_id'),
   //       $panelToggles = $resultsPanelToggle.add($inputsPanelToggle);
   //   $resultsPanelToggle.data('togglePair', $resultsPanel);
   //   $inputsPanelToggle.data('togglePair', $inputsPanel);
   //   $resultsPanel.data('togglePair', $resultsPanelToggle);
   //   $inputsPanel.data('togglePair', $inputsPanelToggle);
   //   var closePanel = function($curPanel) {
  //    // close $curPanel
  //      $curPanel.addClass('closed');
  //      $($curPanel.data().togglePair).html('Open');
 //     },
 //     openPanel = function($curPanel) {
        // open $curPanel
 //       $($curPanel.data().togglePair).html('Close');
//        $curPanel.removeClass('closed');
 //     },
 //     togglePanel = function(clickedEl) {
 //       var $curPanel = $($(clickedEl).data().togglePair);
 //       if ( $curPanel.hasClass('closed') ) {
 //         openPanel($curPanel);
 //       } else {
 //         closePanel($curPanel);
 //       }
 //     };
 //     $panelToggles.click(function() {
  //      togglePanel(this);
  //    });


      // Initialize
      levelContentHeight();

      // NOTE - there is already a window resize handler (handleWindowResize() above) so this could just go in there
      // On Resize
      $win.resize(function() {
        clearTimeout(timer);     // NOTE that this timer variable is global since it is not the same scope as the declaration above
        // throttle the resize check
        timer = setTimeout(function() {
          // do resize stuff here
          checkLayout();
        }, 200);
      });
    });
  },

  render: function() {
    var self = this;
    this.$el.html(this.template(this.model.attributes));
    window.setTimeout(function() {
      self.init();
      self.animate();
    }, 0);
    this.onPageManipulations();
    return this;

  }

});
