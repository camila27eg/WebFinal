import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { nextId } from 'three/examples/jsm/libs/tween.module.js'



console.log(DRACOLoader)

// Base
const gui = new GUI()
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

// Models (load)
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/') // Add worker providing Draco files
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

let mixer = null

// Textures MatCap
const textureLoader = new THREE.TextureLoader()
const matcapTexture1 = textureLoader.load('/models/Tuneles/Matcaps/matcap2.png')
const matcapTexture2 = textureLoader.load('/models/Tuneles/Matcaps/matcap5.png')
const matcapTexture3 = textureLoader.load('/models/Tuneles/Matcaps/matcap1.png')

// Variables para los modelos y sus materiales originales
let tunel, tunel2, tunel3, tunel4, tunel4dientes;
const originalMaterials = {};

// Función para aplicar MatCap a los modelos
function aplicarMatcap(matcapTexture) {
        [tunel, tunel2, tunel3, tunel4, tunel4dientes].forEach((model) => {
            if (model) {
                let i = 0
                model.scene.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        if (matcapTexture) {
                            child.material = new THREE.MeshMatcapMaterial({
                                matcap: matcapTexture
                            });
                        } else if (originalMaterials[model.name]) {
        
                            // Restaurar el material original
                            child.material = originalMaterials[model.name][i];
                        }
                        i += 1
                    }
                });
            }
        });
    
}

// Funciones para cargar los modelos
gltfLoader.load('/models/Tuneles/Tunel1/Tunel1.gltf', (gltf) => {
    tunel = gltf;
    tunel.name = "Tunel1"
    gltf.scene.scale.set(5, 5, 5);
    gltf.scene.position.set(0, 0, 0);
    scene.add(gltf.scene);
    
    // Guardamos el material original
    originalMaterials[tunel.name] = [];
    gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            originalMaterials[tunel.name].push(child.material)

            
        
        }
    });
    //aplicarMatcap(matcapTexture1); // Aplicar la textura inicial
});

gltfLoader.load('/models/Tuneles/Tunel2/Tunel3(2).gltf', (gltf2) => {
    tunel2 = gltf2;
    tunel2.name = "Tunel2"
    gltf2.scene.scale.set(5, 5, 5);
    gltf2.scene.position.set(0, 0, 0);
    scene.add(gltf2.scene);

    const pointLight = new THREE.PointLight(0xffffff, 2,3)
        pointLight.position.set(0, 0, -4.5)
        scene.add(pointLight)

        const pointLight2 = new THREE.PointLight(0x0000ff, 1,3)
        pointLight2.position.set(0, 0, -6)
        scene.add(pointLight2)

    // Guardamos el material original
    originalMaterials[tunel2.name] = [];
    gltf2.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            originalMaterials[tunel2.name].push(child.material)
            
        }
    });
    //aplicarMatcap(matcapTexture2); // Aplicar la textura inicial
});

gltfLoader.load('/models/Tuneles/Tunel3/Tunel4.gltf', (gltf4) => {
    tunel3 = gltf4;
    tunel3.name = "Tunel3"
    gltf4.scene.scale.set(5, 5, 5);
    gltf4.scene.position.set(0, 0, 0);
    scene.add(gltf4.scene);

    // Guardamos el material original
    originalMaterials[tunel3.name] = [];
    gltf4.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            originalMaterials[tunel3.name].push(child.material)
            
        }
    });
    //aplicarMatcap(matcapTexture3); // Aplicar la textura inicial
});

gltfLoader.load('/models/Tuneles/Tunel4/Tunel2(Boca).gltf', (gltf3) => {
    tunel4 = gltf3;
    tunel4.name = "Tunel4Boca"
    gltf3.scene.scale.set(5, 5, 5);
    gltf3.scene.position.set(0, 0, 0);
    scene.add(gltf3.scene);

    // Guardamos el material original
    originalMaterials[tunel4.name] = [];
    gltf3.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            originalMaterials[tunel4.name].push(child.material)
            
        }
    });
});

gltfLoader.load('/models/Tuneles/Tunel4/Tunel2(Dientes).gltf', (gltf5) => {
    tunel4dientes = gltf5;
    tunel4dientes.name = "Tunel4Dientes"
    gltf5.scene.scale.set(5, 5, 5);
    gltf5.scene.position.set(0, 0, 0);
    scene.add(gltf5.scene);

    // Guardamos el material original
    originalMaterials[tunel4dientes.name] = [];
    gltf5.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            originalMaterials[tunel4dientes.name].push(child.material)
            
        }
    });
});

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 2.4)
scene.add(ambientLight)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
directionalLight.castShadow = true
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

// Camera
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});

const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 2
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()
let previousTime = 0
const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
    if (tunel) tunel.scene.rotation.z += 0.01
    if (tunel2) tunel2.scene.rotation.z += -0.01
    if (tunel3) tunel3.scene.rotation.z += 0.01
    if (tunel4) tunel4.scene.rotation.z += -0.01
    if (tunel4dientes) tunel4dientes.scene.rotation.z += -0.01
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()

// Configuración de GUI
const settings = {
    cameraSpeed: 0.05,
    matcapTexture: 'original' // Valor inicial para el MatCap
};

// Controlador de velocidad de la cámara
gui.add(settings, 'cameraSpeed').min(0.01).max(0.5).step(0.01).name('Velocidad');

// Controlador para seleccionar textura MatCap
gui.add(settings, 'matcapTexture', ['original', 'matcap1', 'matcap2', 'matcap3']).name('Material').onChange((value) => {
    switch (value) {
        case 'original':
            // Restaurar los materiales originales
            aplicarMatcap(null);
            break;
        case 'matcap1':
            aplicarMatcap(matcapTexture1);
            break;
        case 'matcap2':
            aplicarMatcap(matcapTexture2);
            break;
        case 'matcap3':
            aplicarMatcap(matcapTexture3);
            break;
    }
});

// Variable para almacenar la posición objetivo en Z
let targetZ = camera.position.z;

// Función para mover la cámara en el eje Z con suavizado
function moverCamaraZ(data) {
    if (data.deltaY > 0) {
        targetZ += settings.cameraSpeed;
    } else if (data.deltaY < 0) {
        targetZ -= settings.cameraSpeed;
    }
}

// Función de actualización para suavizar el movimiento
function updateCameraZ() {
    // Interpolación suave hacia la posición objetivo
    camera.position.z += (targetZ - camera.position.z) * 0.1; // 0.1 controla la suavidad
}

// Escuchar el evento de la rueda del ratón
window.addEventListener('wheel', moverCamaraZ);

// Asegúrate de llamar a `updateCameraZ()` dentro de tu ciclo de animación
function animate() {
    requestAnimationFrame(animate);

    updateCameraZ(); // Suavizar el movimiento en Z

    renderer.render(scene, camera); // Renderizar la escena
}

animate();

// Función para mover la cámara en el eje Z
/* function moverCamaraZ(data) {
    let offset = 0;
    if (data.deltaY > 0) {
        offset += settings.cameraSpeed;
    } else if (data.deltaY < 0) {
        offset -= settings.cameraSpeed;
    }
    camera.position.z += offset;
}
window.addEventListener('wheel', moverCamaraZ); */

/* import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { nextId } from 'three/examples/jsm/libs/tween.module.js'

console.log(DRACOLoader)


 //Base
 
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



//Models (load)
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/') //add worker providing draco files

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

let mixer = null



//Texturas Matcap
const textureLoader = new THREE.TextureLoader
const matcapTexture1 = textureLoader.load('/models/Tuneles/Tunel1/matcap2.png')

//Variable para rotación
var tunel;

//TUNEL 1
gltfLoader.load(
    '/models/Tuneles/Tunel1/Tunel1.gltf',
     (gltf) =>
     {

         //A la variable se le asigna el nombre de donde se importa el modelo para la rotación
        tunel = gltf

        
        const matcapMaterial = new THREE.MeshMatcapMaterial({
            matcap : matcapTexture1  // Asignar la textura MatCap
        })

        gltf.scene.traverse(
            (child) => {
                if(child instanceof THREE.Mesh){
                    child.material = matcapMaterial
                }
            }
        )

       gltf.scene.scale.set(5, 5, 5)
       gltf.scene.position.set(0, 0, 0)
        scene.add(gltf.scene)

     }
)


//Variable para rotación
var tunel2;

//TUNEL 2
gltfLoader.load(
    '/models/Tuneles/Tunel1/Tunel3(2).gltf',
     (gltf2) =>
     {
        //A la variable se le asigna el nombre de donde se importa el modelo para la rotación
        tunel2 = gltf2

        const textureLoader = new THREE.TextureLoader
        const matcapTexture1 = textureLoader.load('/models/Tuneles/Tunel1/matcap5.png')

        const matcapMaterial = new THREE.MeshMatcapMaterial({
            matcap : matcapTexture1  // Asignar la textura MatCap
        })

        gltf2.scene.traverse(
            (child) => {
                if(child instanceof THREE.Mesh){
                    child.material = matcapMaterial
                }
            }
        )

       gltf2.scene.scale.set(5, 5, 5)
       gltf2.scene.position.set(0, 0, 0)
        scene.add(gltf2.scene)

        const pointLight = new THREE.PointLight(0xffffff, 2,3)
        pointLight.position.set(0, 0, -4.5)
        scene.add(pointLight)

        const pointLight2 = new THREE.PointLight(0x0000ff, 1,3)
        pointLight2.position.set(0, 0, -6)
        scene.add(pointLight2)

        //matcap: matcapTexture1 // Asignar la textura MatCap
     }
)


//Variable para rotación
var tunel3

//TUNEL 3(4)
gltfLoader.load(
    '/models/Tuneles/Tunel4.gltf',
     (gltf4) =>
     {
        //A la variable se le asigna el nombre de donde se importa el modelo para la rotación
        tunel3 = gltf4


       gltf4.scene.scale.set(5, 5, 5)
       gltf4.scene.position.set(0, 0, 0)
        scene.add(gltf4.scene)

        const pointLight3 = new THREE.PointLight(0xffffff, 1.5,3)
        pointLight3.position.set(0, 0, -12)
        scene.add(pointLight3)
        
     }
)

//Variable para rotación
var tunel4

//TUNEL 4(2)
gltfLoader.load(
    '/models/Tuneles/Tunel2(Boca).gltf',
     (gltf3) =>
     {
        //A la variable se le asigna el nombre de donde se importa el modelo para la rotación
        tunel4 = gltf3


       gltf3.scene.scale.set(5, 5, 5)
       gltf3.scene.position.set(0, 0, 0)
        scene.add(gltf3.scene)
        
     }
)

//Variable para rotación
var tunel4dientes

//TUNEL 4 DIENTES(2)
gltfLoader.load(
    '/models/Tuneles/Tunel2(Dientes).gltf',
     (gltf5) =>
     {
        //A la variable se le asigna el nombre de donde se importa el modelo para la rotación
        tunel4dientes = gltf5


       gltf5.scene.scale.set(5, 5, 5)
       gltf5.scene.position.set(0, 0, 0)
        scene.add(gltf5.scene)

        //const pointLight3 = new THREE.PointLight(0xffffff, 1.5,3)
        //pointLight3.position.set(0, 0, -12)
        //scene.add(pointLight3)
        
     }
)

//Uso de teclas
/* function keyDown(event ){
    switch (event.code){
        case 'ArrowLeft' : 
        next = true;
        break;
    }
    switch (event.code){
        case 'ArrowDown':
        back = true;
        break;
    }
}

function keyUp(event ){
    switch (event.code){
        case 'ArrowLeft' : 
        next = false;
        break;
    }
    switch (event.code){
        case 'ArrowDown':
        back = false;
        break;
    }
}

function animate(){
    requestAnimationFrame(animate);
    if (next) n= n+1;
  if(back) n= n-1;
 matcapMaterial [n];

  Renderer.render(scene,camera);
}
animate(); */


//Agregar ejes (cajas)

/* var axisWidth = 0.1;
var axisLength = 10;

const cajaX = new THREE.Mesh(
    new THREE.BoxGeometry(axisLength, axisWidth, axisWidth),
    new THREE.MeshBasicMaterial({
        color: '#FF0000'
    })
)

scene.add(cajaX)

const cajaY = new THREE.Mesh(
    new THREE.BoxGeometry(axisWidth, axisLength, axisWidth),
    new THREE.MeshBasicMaterial({
        color: '#00FF00'
    })
)

scene.add(cajaY)

const cajaZ = new THREE.Mesh(
    new THREE.BoxGeometry(axisWidth, axisWidth, axisLength),
    new THREE.MeshBasicMaterial({
        color: '#0000FF'
    })
)

scene.add(cajaZ) */


 //Lights

/* const ambientLight = new THREE.AmbientLight(0xffffff, 2.4)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)


 //Sizes

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


 //Camera

// Base camera
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 100)
//camera.position.x = 1
//camera.position.y = 1
var posicionZ = 2;
camera.position.z = posicionZ
scene.add(camera) */




 //Renderer

/* const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


 //Animate

const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    //Rotación de túneles llamando a las variables de cada
    if (tunel) tunel.scene.rotation.z += 0.01
    if (tunel2) tunel2.scene.rotation.z += -0.01
    if (tunel3) tunel3.scene.rotation.z += 0.01
    if (tunel4) tunel4.scene.rotation.z += -0.01
    if (tunel4dientes) tunel4dientes.scene.rotation.z += -0.01

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// Configuración inicial
const settings = {
    cameraSpeed: 0.05, // Velocidad inicial para mover la cámara en Z
};

// Agregar controlador GUI para ajustar la velocidad
gui.add(settings, 'cameraSpeed').min(0.01).max(0.5).step(0.01).name('Velocidad');

// Función para mover la cámara en el eje Z
function moverCamaraZ(data) {
    console.log(data.deltaY);
    let offset = 0;
    if (data.deltaY > 0) {
        offset += settings.cameraSpeed; // Usar la velocidad configurada
    } else if (data.deltaY < 0) {
        offset -= settings.cameraSpeed; // Usar la velocidad configurada
    }
    
    posicionZ += offset;
    camera.position.z = posicionZ;
}

// Escuchar el evento de desplazamiento del ratón
window.addEventListener('wheel', moverCamaraZ);
 */
/* function moverCamaraZ(data) {
    console.log(data.deltaY);
    let offset = 0;
    if (data.deltaY > 0) {
        offset += 0.05;
    } else if (data.deltaY < 0){
        offset -= 0.05;
    }
    
    posicionZ += offset;
    camera.position.z = posicionZ;
}
window.addEventListener('wheel', moverCamaraZ) */