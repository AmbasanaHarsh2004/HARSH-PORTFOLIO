import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  mode: 'network' | 'orbits' | 'helix';
}

export default function ThreeCanvas({ mode }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef(mode);

  // Keep ref up to date to switch animations in real time without recreating the canvas
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050507, 0.015);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 45;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // 3. Create Objects based on different styles

    // --- A. Network Mode Assets ---
    const particleCount = 120;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Spawn particles in a spherical/cloud structure
      const r = 25 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      velocities.push({
        x: (Math.random() - 0.5) * 0.04,
        y: (Math.random() - 0.5) * 0.04,
        z: (Math.random() - 0.5) * 0.04,
      });
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Custom Canvas-based glowing star texture for beautiful particles
    const createStarTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(0, 245, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(191, 0, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.2,
      map: createStarTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particleSystem);

    // Dynamic Connections for Constellation
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00f5ff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    // Create line segments container
    const maxConnections = 150;
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineColors = new Float32Array(maxConnections * 2 * 3);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineSegments = new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.25,
    }));
    scene.add(lineSegments);


    // --- B. Orbits Mode Assets ---
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    // Central Sphere
    const sphereGeo = new THREE.SphereGeometry(3.5, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xbf00ff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const centralSphere = new THREE.Mesh(sphereGeo, sphereMat);
    orbitGroup.add(centralSphere);

    // Outer glow light
    const pointLight = new THREE.PointLight(0x00f5ff, 2, 50);
    orbitGroup.add(pointLight);

    // Orbit Rings
    const orbitCount = 3;
    const satellites: THREE.Mesh[] = [];
    const orbitRadii = [10, 18, 25];
    const orbitColors = [0x00f5ff, 0xbf00ff, 0x00f5ff];

    orbitRadii.forEach((radius, idx) => {
      // Draw Orbit Ring line
      const ringGeo = new THREE.RingGeometry(radius - 0.1, radius + 0.1, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: orbitColors[idx],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.15,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      orbitGroup.add(ring);

      // Create Satellite Orb
      const satGeo = new THREE.SphereGeometry(0.8, 16, 16);
      const satMat = new THREE.MeshBasicMaterial({
        color: orbitColors[idx],
        wireframe: idx % 2 === 0,
      });
      const satellite = new THREE.Mesh(satGeo, satMat);
      orbitGroup.add(satellite);
      satellites.push(satellite);
    });


    // --- C. Helix Mode Assets ---
    const helixGroup = new THREE.Group();
    scene.add(helixGroup);

    const helixPoints = 80;
    const helixRadius = 8;
    const helixHeight = 35;
    const helixPositions1: THREE.Vector3[] = [];
    const helixPositions2: THREE.Vector3[] = [];

    const helixMat1 = new THREE.MeshBasicMaterial({ color: 0x00f5ff });
    const helixMat2 = new THREE.MeshBasicMaterial({ color: 0xbf00ff });

    for (let i = 0; i < helixPoints; i++) {
      const t = (i / helixPoints) * Math.PI * 6; // Spiral periods
      const y = (i / helixPoints - 0.5) * helixHeight;

      // Strand 1
      const x1 = Math.cos(t) * helixRadius;
      const z1 = Math.sin(t) * helixRadius;
      const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 8), helixMat1);
      sphere1.position.set(x1, y, z1);
      helixGroup.add(sphere1);
      helixPositions1.push(sphere1.position);

      // Strand 2
      const x2 = Math.cos(t + Math.PI) * helixRadius;
      const z2 = Math.sin(t + Math.PI) * helixRadius;
      const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 8), helixMat2);
      sphere2.position.set(x2, y, z2);
      helixGroup.add(sphere2);
      helixPositions2.push(sphere2.position);

      // Connective rungs
      if (i % 3 === 0) {
        const rungPoints = [sphere1.position, sphere2.position];
        const rungGeo = new THREE.BufferGeometry().setFromPoints(rungPoints);
        const rungMat = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.15,
        });
        const rung = new THREE.Line(rungGeo, rungMat);
        helixGroup.add(rung);
      }
    }


    // 4. Interaction (Mouse movement)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Convert to normalized coordinates (-1 to 1)
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      mouseX = (x / width) * 2 - 1;
      mouseY = -(y / height) * 2 + 1;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // 5. Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const currentMode = modeRef.current;

      // Smooth mouse tracking
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Adjust group visibility based on mode
      if (currentMode === 'network') {
        particleSystem.visible = true;
        lineSegments.visible = true;
        orbitGroup.visible = false;
        helixGroup.visible = false;

        // Slow rotate network
        particleSystem.rotation.y = elapsedTime * 0.05;
        particleSystem.rotation.x = elapsedTime * 0.02;
        lineSegments.rotation.y = elapsedTime * 0.05;
        lineSegments.rotation.x = elapsedTime * 0.02;

        // Animate particles
        const positionsArr = particlesGeometry.attributes.position.array as Float32Array;
        let lineIdx = 0;
        const linePositionsArr = lineGeometry.attributes.position.array as Float32Array;
        const lineColorsArr = lineGeometry.attributes.color.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          // Update physics
          positionsArr[i * 3] += velocities[i].x;
          positionsArr[i * 3 + 1] += velocities[i].y;
          positionsArr[i * 3 + 2] += velocities[i].z;

          // Boundary checks
          const maxDist = 30;
          if (Math.abs(positionsArr[i * 3]) > maxDist) velocities[i].x *= -1;
          if (Math.abs(positionsArr[i * 3 + 1]) > maxDist) velocities[i].y *= -1;
          if (Math.abs(positionsArr[i * 3 + 2]) > maxDist) velocities[i].z *= -1;

          // Influence with mouse position
          const dx = positionsArr[i * 3] - targetX * 15;
          const dy = positionsArr[i * 3 + 1] - targetY * 15;
          const distMouse = Math.sqrt(dx * dx + dy * dy);
          if (distMouse < 8) {
            positionsArr[i * 3] += dx * 0.02;
            positionsArr[i * 3 + 1] += dy * 0.02;
          }
        }
        particlesGeometry.attributes.position.needsUpdate = true;

        // Connections logic
        for (let i = 0; i < particleCount; i++) {
          const px = positionsArr[i * 3];
          const py = positionsArr[i * 3 + 1];
          const pz = positionsArr[i * 3 + 2];

          for (let j = i + 1; j < particleCount; j++) {
            const qx = positionsArr[j * 3];
            const qy = positionsArr[j * 3 + 1];
            const qz = positionsArr[j * 3 + 2];

            const dx = px - qx;
            const dy = py - qy;
            const dz = pz - qz;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            // Connect if close
            if (dist < 10 && lineIdx < maxConnections) {
              // Line Start
              linePositionsArr[lineIdx * 6] = px;
              linePositionsArr[lineIdx * 6 + 1] = py;
              linePositionsArr[lineIdx * 6 + 2] = pz;

              // Line End
              linePositionsArr[lineIdx * 6 + 3] = qx;
              linePositionsArr[lineIdx * 6 + 4] = qy;
              linePositionsArr[lineIdx * 6 + 5] = qz;

              // Opacity gradient based on distance
              const alpha = (1.0 - dist / 10) * 0.4;
              const isCyan = i % 2 === 0;

              // Start color
              lineColorsArr[lineIdx * 6] = isCyan ? 0.0 : 0.7; // R
              lineColorsArr[lineIdx * 6 + 1] = isCyan ? 0.96 : 0.0; // G
              lineColorsArr[lineIdx * 6 + 2] = isCyan ? 1.0 : 1.0; // B

              // End color
              lineColorsArr[lineIdx * 6 + 3] = isCyan ? 0.0 : 0.7;
              lineColorsArr[lineIdx * 6 + 4] = isCyan ? 0.96 : 0.0;
              lineColorsArr[lineIdx * 6 + 5] = isCyan ? 1.0 : 1.0;

              lineIdx++;
            }
          }
        }
        // Fill remaining spaces in buffer geometry with 0
        for (let k = lineIdx * 6; k < maxConnections * 6; k++) {
          linePositionsArr[k] = 0;
          lineColorsArr[k] = 0;
        }
        lineGeometry.attributes.position.needsUpdate = true;
        lineGeometry.attributes.color.needsUpdate = true;

        // Camera gentle drift
        camera.position.x += (targetX * 5 - camera.position.x) * 0.05;
        camera.position.y += (targetY * 5 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

      } else if (currentMode === 'orbits') {
        particleSystem.visible = false;
        lineSegments.visible = false;
        orbitGroup.visible = true;
        helixGroup.visible = false;

        // Rotate central core
        centralSphere.rotation.y = elapsedTime * 0.4;
        centralSphere.rotation.x = elapsedTime * 0.2;

        // Animate satellites orbiting
        satellites.forEach((sat, index) => {
          const speedFactor = 0.5 + index * 0.25;
          const angle = elapsedTime * speedFactor + index * (Math.PI / 1.5);
          const radius = orbitRadii[index];

          // Orbital position in plane
          sat.position.x = Math.cos(angle) * radius;
          sat.position.y = Math.sin(angle) * radius * 0.3; // slightly tilted plane
          sat.position.z = Math.sin(angle) * radius * 0.9;
        });

        // Interactive camera response
        orbitGroup.rotation.y = targetX * 0.6;
        orbitGroup.rotation.x = -targetY * 0.6;

        camera.position.x += (0 - camera.position.x) * 0.05;
        camera.position.y += (0 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

      } else if (currentMode === 'helix') {
        particleSystem.visible = false;
        lineSegments.visible = false;
        orbitGroup.visible = false;
        helixGroup.visible = true;

        // Spin Helix structure
        helixGroup.rotation.y = elapsedTime * 0.5;

        // Push-pull zoom on mouse hover
        helixGroup.position.y = targetY * 10;
        helixGroup.rotation.x = targetX * 0.3;

        camera.position.x += (targetX * 8 - camera.position.x) * 0.05;
        camera.position.y += (0 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 6. Resize Handler
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 1 }}
      id="three-3d-scene"
    />
  );
}
