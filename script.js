/* Core behavior for the Valentine pages */
(function(){
  document.addEventListener('DOMContentLoaded', ()=>{
    const container = document.getElementById('buttons');
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');

    if (noBtn && container){
      noBtn.style.position = 'absolute';
      noBtn.addEventListener('click', e => moveButton(e.currentTarget, container));
    }

    if (yesBtn){
      yesBtn.addEventListener('click', ()=>{
        window.location.href = 'celebration.html';
      });
    }

    const recipient = document.getElementById('recipient');
    if (recipient){
      recipient.addEventListener('click', ()=>{
        const name = prompt('Enter recipient name','[Recipient Name]');
        if (name !== null) recipient.textContent = name.trim() || '[Recipient Name]';
      });
    }
  });

  function moveButton(btn, container){
    const cRect = container.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    const padding = 8;
    const maxX = Math.max(0, cRect.width - bRect.width - padding*2);
    const maxY = Math.max(0, cRect.height - bRect.height - padding*2);
    const x = Math.floor(Math.random() * maxX) + padding + bRect.width/2;
    const y = Math.floor(Math.random() * maxY) + padding + bRect.height/2;
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
  }

  // Simple confetti implementation
  window.startConfetti = function(duration = 6000){
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';canvas.style.left=0;canvas.style.top=0;
    canvas.style.pointerEvents='none';canvas.style.zIndex=9999;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    window.addEventListener('resize', ()=>{W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight});

    const colors = ['#ff3d6a','#ffb3c6','#ffd166','#ff6b9a','#7ee8fa'];
    const pieces = [];
    const count = Math.floor(W/12);
    for (let i=0;i<count;i++){
      pieces.push({
        x:Math.random()*W, y:Math.random()*-H, r:Math.random()*8+4, w:Math.random()*12+6,
        tilt:Math.random()*360, speedY:Math.random()*3+2, color:colors[Math.floor(Math.random()*colors.length)],
      });
    }

    let start = performance.now();
    function draw(now){
      const t = now - start;
      ctx.clearRect(0,0,W,H);
      for (const p of pieces){
        p.x += Math.sin((t+p.x)/100) * 0.5;
        p.y += p.speedY;
        p.tilt += 4;
        ctx.save();
        ctx.translate(p.x,p.y);
        ctx.rotate(p.tilt * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w/2,-p.r/2,p.w,p.r);
        ctx.restore();
        if (p.y > H + 50){ p.y = -10; p.x = Math.random()*W; }
      }
      if (now - start < duration) requestAnimationFrame(draw); else { document.body.removeChild(canvas); }
    }
    requestAnimationFrame(draw);
  }

})();
