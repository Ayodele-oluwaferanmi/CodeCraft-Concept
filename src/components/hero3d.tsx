"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.innerWidth < 768;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060607, 0.045);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    // lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.DirectionalLight(0xd4ff3f, 2.2);
    key.position.set(4, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x7c5cff, 2.5);
    rim.position.set(-5, -2, 3);
    scene.add(rim);
    const cyan = new THREE.PointLight(0x4de3ff, 30, 30);
    cyan.position.set(0, 2, 3);
    scene.add(cyan);

    const group = new THREE.Group();
    scene.add(group);

    // core icosahedron wireframe
    const coreGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x111114,
      metalness: 0.9,
      roughness: 0.25,
      flatShading: true,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    const wireMat = new THREE.LineBasicMaterial({
      color: 0xd4ff3f,
      transparent: true,
      opacity: 0.55,
    });
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(coreGeo),
      wireMat
    );
    wire.scale.setScalar(1.002);
    group.add(wire);

    // outer torus rings
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.02, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0x7c5cff, transparent: true, opacity: 0.7 })
    );
    ring1.rotation.x = Math.PI / 2.4;
    group.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.9, 0.015, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0x4de3ff, transparent: true, opacity: 0.45 })
    );
    ring2.rotation.x = Math.PI / 1.8;
    ring2.rotation.y = 0.5;
    group.add(ring2);

    // inner glow sphere
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xd4ff3f })
    );
    group.add(glow);
    const glowLight = new THREE.PointLight(0xd4ff3f, 20, 12);
    group.add(glowLight);

    // particles
    const pCount = isMobile ? 350 : 900;
    const pos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = 4 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.035,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // floating cubes (code fragments)
    const cubes: THREE.Mesh[] = [];
    const cubeGeo = new THREE.BoxGeometry(0.16, 0.16, 0.16);
    const cubeColors = [0xd4ff3f, 0x7c5cff, 0x4de3ff, 0xffffff];
    for (let i = 0; i < (isMobile ? 10 : 22); i++) {
      const m = new THREE.Mesh(
        cubeGeo,
        new THREE.MeshBasicMaterial({
          color: cubeColors[i % cubeColors.length],
          transparent: true,
          opacity: 0.85,
        })
      );
      const a = Math.random() * Math.PI * 2;
      const r = 3.4 + Math.random() * 3;
      m.position.set(Math.cos(a) * r, (Math.random() - 0.5) * 5, Math.sin(a) * r);
      m.userData = { speed: 0.3 + Math.random() * 0.8, off: Math.random() * 10 };
      cubes.push(m);
      scene.add(m);
    }

    let mx = 0,
      my = 0,
      tx = 0,
      ty = 0;
    let scrollY = 0;
    const onMouse = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        tx = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        ty = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
      }
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;

      if (!reduced) {
        group.rotation.y = t * 0.18 + mx * 0.6 + scrollY * 0.0012;
        group.rotation.x = Math.sin(t * 0.2) * 0.15 + my * 0.35;
        ring1.rotation.z = t * 0.25;
        ring2.rotation.z = -t * 0.18;
        particles.rotation.y = t * 0.02 + mx * 0.1;
        particles.rotation.x = my * 0.08;

        glow.position.x = Math.cos(t * 1.2) * 1.1;
        glow.position.y = Math.sin(t * 0.9) * 1.1;
        glowLight.position.copy(glow.position);
        const s = 1 + Math.sin(t * 3) * 0.12;
        glow.scale.setScalar(s);

        cubes.forEach((c) => {
          c.rotation.x += 0.01 * c.userData.speed;
          c.rotation.y += 0.015 * c.userData.speed;
          c.position.y += Math.sin(t * c.userData.speed + c.userData.off) * 0.003;
        });

        camera.position.x = mx * 0.9;
        camera.position.y = -my * 0.7 - scrollY * 0.001;
        camera.lookAt(0, 0, 0);
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("scroll", onScroll);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Points || o instanceof THREE.LineSegments) {
          o.geometry.dispose();
          const m = o.material as THREE.Material | THREE.Material[];
          if (Array.isArray(m)) m.forEach((x) => x.dispose());
          else m.dispose();
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <div ref={mountRef} className="h-full w-full" />
      {/* vignette + grid overlays */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 30%, rgba(6,6,7,0.55) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 60% 55% at 50% 45%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 55% at 50% 45%, black, transparent 75%)",
        }}
      />
    </div>
  );
}
