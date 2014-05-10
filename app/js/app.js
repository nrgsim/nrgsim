var camera, scene, renderer;
var controls;
var surfaceColors = {
  Ceiling: 0x333333,
  Floor: 0x000000,
  Wall: 0xcccccc,
  Window: 0xe0ffff
};

// Create a transform matrix that will put the center of a zone at the origin (0, 0, 0)
function buildOriginTransform(zone) {
  var dimensions = { x: {}, y: {}, z: {} };
  _.each(zone, function(surface) {
    _.each(surface.vertices, function(vertex) {
      if (dimensions.x.min === undefined || vertex.x < dimensions.x.min) { dimensions.x.min = vertex.x; }
      if (dimensions.x.max === undefined || vertex.x > dimensions.x.max) { dimensions.x.max = vertex.x; }
      if (dimensions.y.min === undefined || vertex.y < dimensions.y.min) { dimensions.y.min = vertex.y; }
      if (dimensions.y.max === undefined || vertex.y > dimensions.y.max) { dimensions.y.max = vertex.y; }
      if (dimensions.z.min === undefined || vertex.z < dimensions.z.min) { dimensions.z.min = vertex.z; }
      if (dimensions.z.max === undefined || vertex.z > dimensions.z.max) { dimensions.z.max = vertex.z; }
    });
  });

  return new THREE.Matrix4().makeTranslation(-dimensions.x.min-(dimensions.x.max-dimensions.x.min)/2,
    -dimensions.y.min-(dimensions.y.max-dimensions.y.min)/2,
    -dimensions.z.min-(dimensions.z.max-dimensions.z.min)/2);
}

function getColor(surfaceType) {
  return surfaceColors[surfaceType];
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
  var clr = getColor(surface.type);
  face.color.setHex(clr);
  faces.push(face);
  face = new THREE.Face3(2, 3, 0);
  face.color.setHex(clr);
  faces.push(face);
  faces[0].color.setHex(clr);
  faces[1].color.setHex(clr);
  return faces;
}

function addPlanes(scene, surfaces, transform) {
  _.each(surfaces, function(surface) {
    var geometry = createGeometry(surface, transform);
    geometry.faces = createFaces(surface);
    geometry.computeBoundingSphere();
    geometry.computeFaceNormals();
    geometry.computeCentroids();

    var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors, overdraw: 0.5 });
    var plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
  });
}

function addCube(scene, width, height, depth) {
  var geometry = new THREE.CubeGeometry(width, height, depth);
  for (var i=0; i<geometry.faces.length; i+=2) {
    var hex = Math.random() * 0xffffff;
    geometry.faces[i].color.setHex(hex);
    geometry.faces[i+1].color.setHex(hex);
  }
  var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors, overdraw: 0.5 });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}

function createCamera(canvas) {
  var camera = new THREE.PerspectiveCamera(25, canvas.innerWidth() / canvas.innerHeight(), 1, 1000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 100;
  return camera;
}

function createCanvasControls(canvas) {
  var controls = new THREE.TrackballControls(camera, canvas[0]);
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = false;
  controls.dynamicDampingFactor = 0.3;
  controls.keys = [ 65, 83, 68 ];
  return controls;
}

function createManualControls() {
  $("#ventilation-rate").slider({ min: 1, max: 10, value: 5 });
  $("#insulation-level").slider({ min: 1, max: 10, value: 5 });
  $("#window-size").slider({ min: 1, max: 10, value: 5 });
  $("#window-type").slider({ min: 1, max: 10, value: 5 });
  $("#window-shading").slider({ min: 1, max: 10, value: 5 });
  $("#save-button").button();
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
  $.get("zone/33", function(zone) {
    var transform = buildOriginTransform(zone);
    addPlanes(scene, zone, transform);

    $.get("windows/33", function(windows) {
      addPlanes(scene, windows, transform);

    });
  });
  */

  $.get("excel/ZoneGeometry.xlsx", function(d) {
    var transform = buildOriginTransform(d.data.zone);
    addPlanes(scene, d.data.zone, transform);
    addPlanes(scene, d.data.windows, transform);
  });

  //addCube(scene, 20, 20, 20);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

init();
animate();
