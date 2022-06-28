var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const clock = new THREE.Clock();
const loader = new THREE.TextureLoader();
const div = document.querySelector(".div")

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(div.clientWidth, div.clientHeight);
div.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
//LOad model

const gltfLoader = new GLTFLoader();
const url = '/models/Parrot.glb';
gltfLoader.load(url, (gltf) => {
    const root = gltf.scene;
    root.position.y = 50 
    root.castShadow = true
    scene.add(root);
});
let mainWidth=20;
var geometry = new THREE.BoxGeometry( mainWidth, mainWidth, mainWidth);
var material = new THREE.MeshBasicMaterial( {  map: loader.load('/textureRock.jpg'), } );
var cube = new THREE.Mesh( geometry, material );
cube.position.y = mainWidth/2
cube.castShadow = true;

scene.add( cube );



//scene settings
scene.background = new THREE.Color( '#64C6FF' );

//Light
const light = new THREE.DirectionalLight( 0xffffff, 0.5 );
light.position.set( 30, 40, 10 );
light.castShadow = true;

let helper = new THREE.DirectionalLightHelper(light,5)
light.add(helper);
light.shadow.mapSize.width = 2000; // default
light.shadow.mapSize.height = 2000; // default
light.shadow.camera.top = 100;
light.shadow.camera.bottom = -100;
light.shadow.camera.left = - 100;
light.shadow.camera.right = 100;
scene.add( light );

const color = 0xFCFFA0;
const intensity = 0.5;
const Alight = new THREE.AmbientLight(color, intensity);
Alight.position.y = 1000
scene.add(Alight);

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
var radius = 100;
function animate() {

    delta = clock.getDelta(); // getDelta() - возвращает интервал в долях секунды
    requestAnimationFrame( animate );
//camera.lookAt( cameraTarget );

    camera.position.x = Math.cos(angle) * radius;
    camera.position.y=100;
    camera.position.z = Math.sin(angle) * radius;
    angle += angularSpeed * delta; // приращение угла
    cameraTarget = new THREE.Vector3( 0, 20, 0 );
    camera.lookAt( cameraTarget );
    render();

}

function render() {
    const elapsedTime = clock.getElapsedTime()
    
  

    renderer.render( scene, camera );

}

animate();
///
