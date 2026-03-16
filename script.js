const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
)

camera.position.z = 3

const renderer = new THREE.WebGLRenderer({
antialias:true
})

renderer.setSize(
window.innerWidth,
window.innerHeight
)

document.body.appendChild(
renderer.domElement
)

// controle para mouse e dedo
const controls = new THREE.OrbitControls(
camera,
renderer.domElement
)

controls.enableZoom = true
controls.enablePan = false

// textura terra
const loader = new THREE.TextureLoader()

const texture = loader.load(
"https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg"
)

const geometry = new THREE.SphereGeometry(
1,
64,
64
)

const material = new THREE.MeshStandardMaterial({
map:texture
})

const earth = new THREE.Mesh(
geometry,
material
)

scene.add(earth)

// luz
const light = new THREE.DirectionalLight(
0xffffff,
1
)

light.position.set(5,3,5)

scene.add(light)

// estrelas
const starsGeometry = new THREE.BufferGeometry()

const starsCount = 5000

const posArray = new Float32Array(starsCount * 3)

for(let i=0;i<starsCount*3;i++){

posArray[i] = (Math.random() - 0.5) * 200

}

starsGeometry.setAttribute(
'position',
new THREE.BufferAttribute(posArray,3)
)

const starsMaterial = new THREE.PointsMaterial({
size:0.2
})

const stars = new THREE.Points(
starsGeometry,
starsMaterial
)

scene.add(stars)

// animação
function animate(){

requestAnimationFrame(animate)

earth.rotation.y += 0.0005

controls.update()

renderer.render(scene,camera)

}

animate()

// responsivo
window.addEventListener(
'resize',
() => {

camera.aspect =
window.innerWidth /
window.innerHeight

camera.updateProjectionMatrix()

renderer.setSize(
window.innerWidth,
window.innerHeight
)

}
)
