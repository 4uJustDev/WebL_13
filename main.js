var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;

const clock = new THREE.Clock();
const loader = new THREE.TextureLoader();

var geometry = new THREE.BoxGeometry( 10, 10, 10);
var material = new THREE.MeshBasicMaterial( {  map: loader.load('/textureRock.jpg'), } );
var cube = new THREE.Mesh( geometry, material );
cube.position.y = 5
cube.castShadow = true;

scene.add( cube );
//camera settings
cameraTarget = new THREE.Vector3( 0, 20, 0 );
camera.position.y=30;
camera.lookAt( cameraTarget );


//scene settings
scene.background = new THREE.Color( '#64C6FF' );

//Light
const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 10, 10, 10 );
light.castShadow = true;

let helper = new THREE.DirectionalLightHelper(light,5)
light.add(helper);
light.shadow.mapSize.width = 2000; // default
light.shadow.mapSize.height = 2000; // default
light.shadow.camera.top = 14;
light.shadow.camera.bottom = 0;
light.shadow.camera.left = - 10;
light.shadow.camera.right = 10;
scene.add( light );

//Plane
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry( 4000, 4000 ),
    new THREE.MeshPhongMaterial( { color: 0xfffffff, dithering: true } )
);
plane.rotation.x = - Math.PI / 2;
plane.receiveShadow = true;
scene.add( plane );


renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var angle = 0; // текущий угол
var angularSpeed = 0.35;
var delta = 0;
var radius = 60;
function animate() {

    delta = clock.getDelta(); // getDelta() - возвращает интервал в долях секунды
    requestAnimationFrame( animate );
//camera.lookAt( cameraTarget );

    camera.position.x = Math.cos(angle) * radius;
    camera.position.z = Math.sin(angle) * radius;
    angle += angularSpeed * delta; // приращение угла
    camera.lookAt( cameraTarget );
    render();

}

function render() {
    const elapsedTime = clock.getElapsedTime()
    
  

    renderer.render( scene, camera );

}

animate();
///
