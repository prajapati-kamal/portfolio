/**
 * ============================================================================
 * KAMAL PRAJAPATI PORTFOLIO - THREE.JS 3D SCENE
 * Interactive 3D Neural Constellation & Cybernetic Geometries Engine
 * ============================================================================
 */

(function () {
  'use strict';

  // Check WebGL availability
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 85;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const pointLightCyan = new THREE.PointLight(0x00f2fe, 3, 120);
  pointLightCyan.position.set(40, 30, 40);
  scene.add(pointLightCyan);

  const pointLightPurple = new THREE.PointLight(0x8a2be2, 3, 120);
  pointLightPurple.position.set(-40, -30, 30);
  scene.add(pointLightPurple);

  // --------------------------------------------------------------------------
  // 1. NEURAL DATA NETWORK (Particles & Dynamic Connecting Lines)
  // --------------------------------------------------------------------------
  const particleCount = 140;
  const maxDistance = 22;
  const particleCoords = [];
  const particleVelocities = [];

  const bounds = { x: 75, y: 50, z: 50 };

  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * bounds.x * 2;
    const y = (Math.random() - 0.5) * bounds.y * 2;
    const z = (Math.random() - 0.5) * bounds.z * 2;
    particleCoords.push(x, y, z);

    particleVelocities.push({
      x: (Math.random() - 0.5) * 0.045,
      y: (Math.random() - 0.5) * 0.045,
      z: (Math.random() - 0.5) * 0.045
    });
  }

  // Particle Points Geometry
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(particleCoords, 3)
  );

  // Create subtle circular texture for points
  function createCircleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(0, 242, 254, 1)');
    gradient.addColorStop(0.5, 'rgba(79, 172, 254, 0.6)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x00f2fe,
    size: 2.2,
    map: createCircleTexture(),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleSystem);

  // Connecting Lines Geometry
  const maxLineConnections = particleCount * 6;
  const linePositions = new Float32Array(maxLineConnections * 6);
  const lineColors = new Float32Array(maxLineConnections * 6);

  const linesGeometry = new THREE.BufferGeometry();
  linesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage)
  );
  linesGeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage)
  );

  const linesMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending,
    opacity: 0.5,
    depthWrite: false
  });

  const lineMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
  scene.add(lineMesh);

  // --------------------------------------------------------------------------
  // 2. FLOATING HOLOGRAPHIC GEOMETRIES (Data Science & ML Symbols)
  // --------------------------------------------------------------------------
  const geoGroup = new THREE.Group();
  scene.add(geoGroup);

  // Torus Knot (Symbol of complex algorithms)
  const torusKnotGeo = new THREE.TorusKnotGeometry(12, 2.5, 90, 16);
  const torusKnotMat = new THREE.MeshStandardMaterial({
    color: 0x8a2be2,
    wireframe: true,
    transparent: true,
    opacity: 0.28,
    roughness: 0.2,
    metalness: 0.8
  });
  const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat);
  torusKnot.position.set(42, -10, -15);
  geoGroup.add(torusKnot);

  // Icosahedron (Symbol of Neural Network structure)
  const icosaGeo = new THREE.IcosahedronGeometry(9, 1);
  const icosaMat = new THREE.MeshStandardMaterial({
    color: 0x00f2fe,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
    roughness: 0.3,
    metalness: 0.9
  });
  const icosahedron = new THREE.Mesh(icosaGeo, icosaMat);
  icosahedron.position.set(-45, 18, -10);
  geoGroup.add(icosahedron);

  // Octahedron (Symbol of Data Mining / Precision)
  const octaGeo = new THREE.OctahedronGeometry(6, 0);
  const octaMat = new THREE.MeshStandardMaterial({
    color: 0x4facfe,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
    roughness: 0.1,
    metalness: 0.95
  });
  const octahedron = new THREE.Mesh(octaGeo, octaMat);
  octahedron.position.set(-35, -28, -5);
  geoGroup.add(octahedron);

  // --------------------------------------------------------------------------
  // 3. INTERACTION (Mouse Lerp & Scroll Reaction)
  // --------------------------------------------------------------------------
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  let scrollY = 0;
  let targetScrollY = 0;

  window.addEventListener('mousemove', (e) => {
    // Normalized to -1 to +1
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY;
  });

  // Window Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // --------------------------------------------------------------------------
  // 4. ANIMATION LOOP
  // --------------------------------------------------------------------------
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Smooth camera mouse follow
    targetX += (mouseX * 12 - targetX) * 0.05;
    targetY += (mouseY * 12 - targetY) * 0.05;
    scrollY += (targetScrollY - scrollY) * 0.05;

    camera.position.x = targetX;
    camera.position.y = targetY - scrollY * 0.035;
    camera.lookAt(0, -scrollY * 0.035, 0);

    // Rotate holographic geometries
    torusKnot.rotation.x += 0.005;
    torusKnot.rotation.y += 0.008;

    icosahedron.rotation.x -= 0.007;
    icosahedron.rotation.y += 0.005;

    octahedron.rotation.y += 0.009;
    octahedron.rotation.z += 0.006;

    // Gentle floating oscillations
    torusKnot.position.y = -10 + Math.sin(elapsedTime * 0.8) * 3;
    icosahedron.position.y = 18 + Math.cos(elapsedTime * 0.9) * 3;
    octahedron.position.y = -28 + Math.sin(elapsedTime * 1.1) * 2.5;

    // Update Particle Positions
    const pos = particleGeometry.attributes.position.array;
    let lineVertexIndex = 0;
    let colorVertexIndex = 0;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;

      // Apply velocity
      pos[idx] += particleVelocities[i].x;
      pos[idx + 1] += particleVelocities[i].y;
      pos[idx + 2] += particleVelocities[i].z;

      // Bounce off imaginary boundaries
      if (Math.abs(pos[idx]) > bounds.x) particleVelocities[i].x *= -1;
      if (Math.abs(pos[idx + 1]) > bounds.y) particleVelocities[i].y *= -1;
      if (Math.abs(pos[idx + 2]) > bounds.z) particleVelocities[i].z *= -1;

      // Dynamic line connections between nearby particles
      for (let j = i + 1; j < particleCount; j++) {
        const jdx = j * 3;
        const dx = pos[idx] - pos[jdx];
        const dy = pos[idx + 1] - pos[jdx + 1];
        const dz = pos[idx + 2] - pos[jdx + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance && lineVertexIndex < maxLineConnections * 6) {
          const alpha = (1 - dist / maxDistance);

          // Add line segment
          linePositions[lineVertexIndex++] = pos[idx];
          linePositions[lineVertexIndex++] = pos[idx + 1];
          linePositions[lineVertexIndex++] = pos[idx + 2];

          linePositions[lineVertexIndex++] = pos[jdx];
          linePositions[lineVertexIndex++] = pos[jdx + 1];
          linePositions[lineVertexIndex++] = pos[jdx + 2];

          // Set line vertex colors with cyan to purple interpolation
          lineColors[colorVertexIndex++] = 0.0;
          lineColors[colorVertexIndex++] = 0.95 * alpha;
          lineColors[colorVertexIndex++] = 1.0 * alpha;

          lineColors[colorVertexIndex++] = 0.54 * alpha;
          lineColors[colorVertexIndex++] = 0.17 * alpha;
          lineColors[colorVertexIndex++] = 0.89 * alpha;
        }
      }
    }

    particleGeometry.attributes.position.needsUpdate = true;

    linesGeometry.setDrawRange(0, lineVertexIndex / 3);
    linesGeometry.attributes.position.needsUpdate = true;
    linesGeometry.attributes.color.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();
})();
