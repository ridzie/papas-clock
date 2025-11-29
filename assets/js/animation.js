// Animation state control for dad character
(function(){
  const dad = document.querySelector('.dad');

  // Transition dad from office to vacation as days decrease
  function handleProgress(e){
    const { totalDays, remainingDays } = e.detail;
    const ratio = Math.max(0, Math.min(1, 1 - remainingDays / totalDays));

    // When less than half time left, start leaning vacation; fully vacation near end
    if(ratio > 0.5){
      dad.classList.add('vacation');
    }else{
      dad.classList.remove('vacation');
    }

    // Subtle bobbing animation tied to progress
    const amplitude = 6 + Math.floor(ratio * 8); // 6px -> 14px
    dad.style.animation = `bob 3s ease-in-out infinite`;
    const style = document.createElement('style');
    style.textContent = `@keyframes bob{ 0%, 100%{ transform: translateY(0); } 50%{ transform: translateY(-${amplitude}px); } }`;
    document.head.querySelectorAll('style[data-dynamic="bob"]').forEach(s => s.remove());
    style.setAttribute('data-dynamic','bob');
    document.head.appendChild(style);
  }

  document.addEventListener('retirement:progress', handleProgress);

  // On retirement day, show sunglasses and hat via celebrate class
  document.addEventListener('retirement:day', function(){
    dad.classList.add('celebrate');
  });
})();
