'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
}

export default function ParticleNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Get accent color based on color scheme
    const getAccentColor = () => {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return isDark ? 0x60a5fa : 0x2563eb;
    };

    // Particle configuration
    const particleCount = 80;
    const connectionDistance = 15;
    const particles: Particle[] = [];

    // Create particle positions
    const positions = new Float32Array(particleCount * 3);
    const spread = 60;

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * spread * 2;
      const y = (Math.random() - 0.5) * spread * 2;
      const z = (Math.random() - 0.5) * spread * 0.5;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      particles.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.01
        ),
      });
    }

    // Create points geometry
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Points material
    const pointsMaterial = new THREE.PointsMaterial({
      color: getAccentColor(),
      size: 0.8,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    // Line material for connections
    const lineMaterial = new THREE.LineBasicMaterial({
      color: getAccentColor(),
      transparent: true,
      opacity: 0.08,
    });

    // Lines group
    let linesGroup = new THREE.Group();
    scene.add(linesGroup);

    // Mouse tracking for parallax
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Handle color scheme change
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleColorSchemeChange = () => {
      const newColor = getAccentColor();
      pointsMaterial.color.setHex(newColor);
      lineMaterial.color.setHex(newColor);
    };

    colorSchemeQuery.addEventListener('change', handleColorSchemeChange);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Update particle positions
      const positionsArray = pointsGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const particle = particles[i];

        // Update position
        particle.position.add(particle.velocity);

        // Boundary check - bounce back
        if (Math.abs(particle.position.x) > spread) {
          particle.velocity.x *= -1;
        }
        if (Math.abs(particle.position.y) > spread) {
          particle.velocity.y *= -1;
        }
        if (Math.abs(particle.position.z) > spread * 0.25) {
          particle.velocity.z *= -1;
        }

        // Update buffer
        positionsArray[i * 3] = particle.position.x;
        positionsArray[i * 3 + 1] = particle.position.y;
        positionsArray[i * 3 + 2] = particle.position.z;
      }

      pointsGeometry.attributes.position.needsUpdate = true;

      // Update connections
      scene.remove(linesGroup);
      linesGroup = new THREE.Group();

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const distance = particles[i].position.distanceTo(particles[j].position);

          if (distance < connectionDistance) {
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
              particles[i].position,
              particles[j].position,
            ]);

            // Fade line based on distance
            const opacity = 0.08 * (1 - distance / connectionDistance);
            const fadedMaterial = new THREE.LineBasicMaterial({
              color: getAccentColor(),
              transparent: true,
              opacity: opacity,
            });

            const line = new THREE.Line(lineGeometry, fadedMaterial);
            linesGroup.add(line);
          }
        }
      }

      scene.add(linesGroup);

      // Subtle parallax effect on mouse move
      targetRotation.x = mouse.y * 0.05;
      targetRotation.y = mouse.x * 0.05;

      scene.rotation.x += (targetRotation.x - scene.rotation.x) * 0.02;
      scene.rotation.y += (targetRotation.y - scene.rotation.y) * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      colorSchemeQuery.removeEventListener('change', handleColorSchemeChange);

      if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }

      renderer.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
