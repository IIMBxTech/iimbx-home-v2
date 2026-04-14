import * as THREE from 'three';
import { useEffect, useRef } from 'react';

const ParticleField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 80;

    // Mouse tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * -2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ---- PARTICLES ----
    const particleCount = 1800;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorOptions = [
      new THREE.Color(0x0066ff), // blue
      new THREE.Color(0x00e5ff), // cyan
      new THREE.Color(0xb01116), // red
      new THREE.Color(0x4444aa), // muted blue
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 320;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

      const col = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = Math.random() * 1.2 + 0.3;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.PointsMaterial({
      size: 0.7,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ---- FLOATING GEOMETRIES ----
    const geoGroup = new THREE.Group();
    scene.add(geoGroup);

    const geoShapes = [
      { geo: new THREE.IcosahedronGeometry(4, 0), pos: [30, 15, -20], color: 0x0066ff },
      { geo: new THREE.OctahedronGeometry(3, 0), pos: [-35, -10, -30], color: 0x00e5ff },
      { geo: new THREE.TetrahedronGeometry(3.5, 0), pos: [20, -20, -15], color: 0xb01116 },
      { geo: new THREE.IcosahedronGeometry(2.5, 0), pos: [-20, 20, -10], color: 0x0044cc },
      { geo: new THREE.OctahedronGeometry(2, 0), pos: [45, -5, -40], color: 0x00e5ff },
      { geo: new THREE.IcosahedronGeometry(1.8, 0), pos: [-45, 10, -25], color: 0x0066ff },
    ];

    const meshes = geoShapes.map(({ geo, pos, color }) => {
      const mat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      geoGroup.add(mesh);
      return mesh;
    });

    // Animation loop
    let frame = 0;
    const animate = () => {
      frame++;
      const t = frame * 0.003;

      // Smooth mouse tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Rotate particles slowly
      particles.rotation.y = t * 0.05 + mouse.x * 0.05;
      particles.rotation.x = mouse.y * 0.03;

      // Rotate each geometry
      meshes.forEach((mesh, i) => {
        mesh.rotation.x += 0.003 + i * 0.001;
        mesh.rotation.y += 0.005 + i * 0.001;
        mesh.position.y += Math.sin(t + i) * 0.015;
      });

      // Gentle camera parallax
      camera.position.x += (mouse.x * 6 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 4 - camera.position.y) * 0.04;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return <canvas id="three-canvas" ref={canvasRef} />;
};

export default ParticleField;
