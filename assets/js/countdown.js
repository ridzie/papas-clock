// Countdown logic
(function(){
  // Config: retirement target
  // Today: 2025-11-29; retiring in 91 days => target is 2026-02-28
  // Adjust if you want a different date.
//  const targetDate = new Date('2026-02-28T00:00:00');
  const targetDate = new Date('2025-11-29T00:00:00');
  const elDays = document.getElementById('days');
  const elHours = document.getElementById('hours');
  const elMinutes = document.getElementById('minutes');
  const elSeconds = document.getElementById('seconds');
  const countdownSection = document.querySelector('.countdown');
  const statusText = document.getElementById('statusText');

  function pad(n){ return String(n).padStart(2, '0'); }

  function update(){
    const now = new Date();
    let diff = targetDate.getTime() - now.getTime();

    if(diff <= 0){
      // Celebration
      elDays.textContent = '00';
      elHours.textContent = '00';
      elMinutes.textContent = '00';
      elSeconds.textContent = '00';
      countdownSection.classList.remove('soon','very-soon');
      statusText.textContent = "Happy Retirement, Papa! Enjoy the adventure ✨";
      document.dispatchEvent(new CustomEvent('retirement:day'));
      return;
    }

    const seconds = Math.floor(diff / 1000);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    elDays.textContent = pad(days);
    elHours.textContent = pad(hours);
    elMinutes.textContent = pad(minutes);
    elSeconds.textContent = pad(secs);

    // Visual urgency cues
    countdownSection.classList.remove('soon','very-soon');
    if(days <= 30) countdownSection.classList.add('soon');
    if(days <= 7) countdownSection.classList.add('very-soon');

    // Character state progress event
    document.dispatchEvent(new CustomEvent('retirement:progress', {
      detail: {
        totalDays: 91,
        remainingDays: days
      }
    }));
  }

  update();
  setInterval(update, 1000);
})();
