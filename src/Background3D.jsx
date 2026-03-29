import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
    mount.appendChild(renderer.domElement);

    // --- Object Setup (Particles) ---
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000; 
    
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Get Accent Color from CSS variables or fallback
    const style = getComputedStyle(document.documentElement);
    let accentColor = style.getPropertyValue('--accent').trim() || '#3b82f6';
    let isLight = document.documentElement.getAttribute('data-theme') === 'light';
    
    const material = new THREE.PointsMaterial({
        size: 0.15,
        color: new THREE.Color(accentColor),
        transparent: true,
        opacity: isLight ? 0.8 : 0.6,
        blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    // --- Interactivity Setup ---
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    };
    document.addEventListener('mousemove', onDocumentMouseMove);

    const handleThemeChanged = (e) => {
        material.color.set(e.detail.accentHex);
        const lightMode = e.detail.isLight;
        material.opacity = lightMode ? 0.8 : 0.6;
        material.blending = lightMode ? THREE.NormalBlending : THREE.AdditiveBlending;
        material.needsUpdate = true;
    };
    window.addEventListener('theme-changed', handleThemeChanged);

    // --- Animation Loop ---
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = elapsedTime * 0.02;

        camera.position.x += (mouseX * 0.005 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.005 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    // --- Window Resize Handling ---
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('mousemove', onDocumentMouseMove);
        window.removeEventListener('theme-changed', handleThemeChanged);
        cancelAnimationFrame(animationFrameId);
        
        particlesGeometry.dispose();
        material.dispose();
        renderer.dispose();
        
        if (mount && renderer.domElement) {
            mount.removeChild(renderer.domElement);
        }
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10 pointer-events-none transition-colors duration-400" />;
}