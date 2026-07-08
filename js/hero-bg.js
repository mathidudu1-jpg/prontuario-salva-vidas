/* Fundo do herói: campo sutil de nós conectando-se por linhas —
   a metáfora literal de sistemas que passam a conversar (brief §4).
   Carregado só em desktop, sem reduced-motion. Nunca protagonista. */

export async function initHeroBg(container) {
  const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js");

  const W = () => container.clientWidth;
  const H = () => container.clientHeight;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(W(), H());
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(0, W(), 0, H(), -100, 100);

  // --- nós ---
  const COUNT = 46;
  const CONNECT_DIST = 190;
  const nodes = [];
  for (let i = 0; i < COUNT; i++) {
    nodes.push({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
    });
  }

  const dotGeo = new THREE.BufferGeometry();
  const dotPos = new Float32Array(COUNT * 3);
  dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPos, 3));
  const dots = new THREE.Points(
    dotGeo,
    new THREE.PointsMaterial({ color: 0xc46b4a, size: 3.4, transparent: true, opacity: 0.4 })
  );
  scene.add(dots);

  // --- linhas (buffer no tamanho máximo de pares) ---
  const MAX_LINKS = (COUNT * (COUNT - 1)) / 2;
  const lineGeo = new THREE.BufferGeometry();
  const linePos = new Float32Array(MAX_LINKS * 6);
  lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
  const lines = new THREE.LineSegments(
    lineGeo,
    new THREE.LineBasicMaterial({ color: 0x2c5754, transparent: true, opacity: 0.13 })
  );
  scene.add(lines);

  // --- loop, pausado quando o herói sai da tela ---
  let running = true;
  let rafId = null;

  function tick() {
    if (!running) return;
    const w = W(), h = H();
    let li = 0;

    for (let i = 0; i < COUNT; i++) {
      const n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      dotPos[i * 3] = n.x;
      dotPos[i * 3 + 1] = n.y;
      dotPos[i * 3 + 2] = 0;
    }

    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (dx * dx + dy * dy < CONNECT_DIST * CONNECT_DIST) {
          linePos[li++] = nodes[i].x; linePos[li++] = nodes[i].y; linePos[li++] = 0;
          linePos[li++] = nodes[j].x; linePos[li++] = nodes[j].y; linePos[li++] = 0;
        }
      }
    }

    lineGeo.setDrawRange(0, li / 3);
    lineGeo.attributes.position.needsUpdate = true;
    dotGeo.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(tick);
  }

  function start() {
    if (rafId === null) { running = true; rafId = requestAnimationFrame(tick); }
  }
  function stop() {
    running = false;
    if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
  }

  new IntersectionObserver(
    ([entry]) => (entry.isIntersecting ? start() : stop()),
    { threshold: 0 }
  ).observe(container);

  document.addEventListener("visibilitychange", () =>
    document.hidden ? stop() : start()
  );

  window.addEventListener("resize", () => {
    renderer.setSize(W(), H());
    camera.right = W();
    camera.bottom = H();
    camera.updateProjectionMatrix();
  });

  start();
}
