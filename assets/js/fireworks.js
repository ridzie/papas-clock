// Simple fireworks on retirement day
(function(){
  const canvas = document.getElementById('fireworks');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let rafId = null;

  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function random(min, max){ return Math.random() * (max - min) + min; }

  function spawnFirework(){
    const x = random(0.2, 0.8) * canvas.width;
    const y = random(0.2, 0.5) * canvas.height;
    const colors = ['#ff6b6b','#ffd166','#06d6a0','#4ecdc4','#8e44ad'];
    const color = colors[Math.floor(random(0, colors.length))];
    const count = 80;
    for(let i = 0; i < count; i++){
      const angle = (i / count) * Math.PI * 2;
      const speed = random(1.5, 4.5);
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: random(50, 110),
        color
      });
    }
  }

  function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = particles.length - 1; i >= 0; i--){
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02; // gravity
      p.life -= 1;
      if(p.life <= 0){ particles.splice(i, 1); continue; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
    if(particles.length > 0){
      rafId = requestAnimationFrame(update);
    }else{
      // spawn another burst occasionally
      spawnFirework();
      rafId = requestAnimationFrame(update);
    }
  }

  function start(){
    if(rafId) return;
    canvas.classList.add('active');
    spawnFirework();
    update();
  }

  function stop(){
    if(rafId){ cancelAnimationFrame(rafId); rafId = null; }
    canvas.classList.remove('active');
    particles = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  document.addEventListener('retirement:day', start);
})();
