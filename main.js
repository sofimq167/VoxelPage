let scene, camera, renderer, controls;

function init() {
    // Crear la escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Configurar la cámara
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Configurar el renderizador
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Agregar controles de órbita
    // Cambio importante: usar OrbitControls como estaba en ejemplos anteriores
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    // Agregar luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    // Cargar el modelo GLB
    const loader = new THREE.GLTFLoader();
    loader.load(
        './escenario.glb',
        (gltf) => {
            scene.add(gltf.scene);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% cargado');
        },
        (error) => {
            console.error('Ocurrió un error al cargar el modelo', error);
        }
    );

    // Manejar el redimensionamiento de la ventana
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Iniciar
init();
animate();
