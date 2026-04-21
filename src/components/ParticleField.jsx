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

    // ---- PARTICLES — dark on light bg ----
    const particleCount = 1600;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Muted dark colors that show on white/light backgrounds
    const colorOptions = [
      new THREE.Color(0x0044cc), // navy blue
      new THREE.Color(0xb01116), // IIMB red
      new THREE.Color(0x3355aa), // muted blue
      new THREE.Color(0x8888cc), // light periwinkle
      new THREE.Color(0xcc2233), // soft red
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 400; // Wider X field
      positions[i * 3 + 1] = (Math.random() - 0.5) * 300; // Higher Y field
      positions[i * 3 + 2] = (Math.random() * -600) + 120; // Massive Z depth (120 to -480)

      const col = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3]     = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = Math.random() * 1.0 + 0.3;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.PointsMaterial({
      size: 0.55,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,   // subtle on light bg
      sizeAttenuation: true,
      blending: THREE.NormalBlending,  // no additive — cleaner on white
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ---- FLOATING WIREFRAME GEOMETRIES ----
    const geoGroup = new THREE.Group();
    scene.add(geoGroup);

    const geoShapes = [
      { geo: new THREE.IcosahedronGeometry(4, 0),   pos: [30, 25, -20],    color: 0x0044cc },
      { geo: new THREE.OctahedronGeometry(3, 0),    pos: [-45, -20, -80],  color: 0xb01116 },
      { geo: new THREE.TetrahedronGeometry(4.5, 0), pos: [25, -30, -160],  color: 0x0055dd },
      { geo: new THREE.IcosahedronGeometry(2.5, 0), pos: [-35, 40, -260],  color: 0xcc1122 },
      { geo: new THREE.OctahedronGeometry(3.5, 0),  pos: [50, 10, -360],   color: 0x0033aa },
      { geo: new THREE.IcosahedronGeometry(1.8, 0), pos: [-40, -20, -450], color: 0xb01116 },
    ];

    const meshes = geoShapes.map(({ geo, pos, color }) => {
      const mat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.18,   // very light — elegant on white
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      geoGroup.add(mesh);
      return mesh;
    });

    // Scroll tracking for hyper-kinetic feedback
    let targetScrollY = 0;
    let currentScrollY = 0;
    
    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation loop
    let frame = 0;
    let animationFrameId;
    const animate = () => {
      frame++;
      const t = frame * 0.003;
      
      // Interpolate scroll for butter-smooth camera movement
      currentScrollY += (targetScrollY - currentScrollY) * 0.06;

      // Smooth mouse tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Calculate max scroll depth approximation (fallback 5000 if body not loaded)
      const maxScroll = document.body.scrollHeight > window.innerHeight ? document.body.scrollHeight - window.innerHeight : 5000;
      const scrollProgress = currentScrollY / maxScroll;

      // Dynamic Camera Fly-through Z-Depth
      // Starts at 80, flies all the way down to -400
      const targetZ = 80 - (scrollProgress * 480);
      camera.position.z += (targetZ - camera.position.z) * 0.08;

      // Starfield twist
      particles.rotation.y = t * 0.04 + mouse.x * 0.04;
      particles.rotation.x = mouse.y * 0.025;

      // Kinetic Scroll-powered Mesh Rotations
      const scrollVelocity = (targetScrollY - currentScrollY) * 0.0003;

      meshes.forEach((mesh, i) => {
        mesh.rotation.x += 0.003 + i * 0.001 + scrollVelocity;
        mesh.rotation.y += 0.004 + i * 0.001 + (scrollVelocity * 1.5);
        mesh.position.y += Math.sin(t + i) * 0.012;
      });

      // Cinematic camera panning
      camera.position.x += (mouse.x * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 3 - (scrollProgress * 20) - camera.position.y) * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return <canvas id="three-canvas" ref={canvasRef} />;
};

export default ParticleField;
