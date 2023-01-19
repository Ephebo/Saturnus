import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// =============================== Configurando o ambiente =====================================
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 2000);
camera.position.setY(15);
camera.position.setX(78);

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#background') });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
// =============================================================================================

// =============================== CONFIGURANDO PRIMEIRO OBJETO (ANEL1) =========================
const rings1Texture = new THREE.TextureLoader().load('assets/ring.webp');
const rings1 = new THREE.Mesh(
  new THREE.TorusGeometry(50.9, 7.9, 2, 100),
  new THREE.MeshStandardMaterial({ map: rings1Texture }),
);
scene.add(rings1, rings1Texture);
// =============================================================================================

// =============================== CONFIGURANDO SEGUNDO OBJETO (ANEL2) =========================
const rings2Texture = new THREE.TextureLoader().load('assets/ring.webp');
const rings2 = new THREE.Mesh(
  new THREE.TorusGeometry(65, 6, 2, 100),
  new THREE.MeshStandardMaterial({ map: rings2Texture }),
);
scene.add(rings2, rings2Texture);
// =============================================================================================




// ================================ CONFIGURANDO TERCEIRO OBJETO (ESFERA) ========================
const mimasTexture = new THREE.TextureLoader().load('assets/mimas.webp');
const normalMimas = new THREE.TextureLoader().load('assets/normal.webp');
const mimas = new THREE.Mesh(
  new THREE.SphereGeometry(5, 30, 16, 0),
  new THREE.MeshStandardMaterial({ map: mimasTexture, normalMap: normalMimas }),
);
scene.add(mimas, mimasTexture);

mimas.position.z = 280;
mimas.position.y = 8;
mimas.position.setX(43);

// ====================================== CONFIGURANDO LUZ =====================================
const PointLight = new THREE.PointLight(0xffffff, 0.2);
PointLight.position.set(100, 80, 10);

const ambientPointLight = new THREE.AmbientLight(0xffffff);

const lightHelper = new THREE.PointLightHelper(PointLight);

scene.add(PointLight, ambientPointLight, lightHelper);
// ==============================================================================================

// =================================== CONFIGURANDO CONTROLES ===================================
const controls = new OrbitControls(camera, renderer.domElement);
// ==============================================================================================

// ====================== CONFIGURANDO QUARTO OBJETO (ESFERA) =================================
const planetTexture = new THREE.TextureLoader().load('assets/saturn.webp')
const normalPlanet = new THREE.TextureLoader().load('assets/normalPlanet.webp')
const planet = new THREE.Mesh(
  new THREE.SphereGeometry(35, 32, 32),
  new THREE.MeshStandardMaterial({
    map: planetTexture, normalMap: normalPlanet
  }),
);
scene.add(planet, planetTexture);

// =========================================== TEXTURAS =========================================
const backgrountTexture = new THREE.TextureLoader().load('assets/background.webp');
scene.background = backgrountTexture;
scene.add(backgrountTexture)
// ==============================================================================================

// ======================================= CÓDIGO ESPECIAL ======================================
function addStar() {
  const geometry = new THREE.SphereGeometry(0.9, 200, 30);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  // ---------------------------------------------------------------------------------------------
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(697));
  // ---------------------------------------------------------------------------------------------

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar)
// ===============================================================================================

// ================================== CONFIGURANDO PÁGINA ========================================
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.03;
  camera.position.x = t *= 0.002;
  camera.position.y = t * -0.002;
}
document.body.onscroll = moveCamera;
// ===============================================================================================

// ======================================= CONFIGURANDO ANIMAÇÃO =================================
function animate() {
  requestAnimationFrame(animate);
  planet.rotation.x = 0.2;

  rings1.rotation.x = 5;
  rings1.rotation.y = 9.5;
  rings1.rotation.z += 0.01;

  rings2.rotation.x = 5;
  rings2.rotation.y = 9.5;
  rings2.rotation.z += 0.01;

  mimas.rotation.x = 0.1;
  mimas.rotation.z -= 0.001;
  mimas.rotation.y = 1;

  controls.update();
  renderer.render(scene, camera);
}


animate();
// ===============================================================================================


