// Countdown logic
(function(){
  // Config: retirement target
  // Today: 2025-11-29; retiring in 91 days => target is 2026-02-28
  // Adjust if you want a different date.
    // Use India Standard Time (IST, UTC+05:30) regardless of viewer locale
    // Example final date at midnight IST:
    // const targetDate = new Date('2026-02-28T00:00:00+05:30');
  const targetDate = new Date('2026-02-28T20:30:00+05:30');
  const elDays = document.getElementById('days');
  const elHours = document.getElementById('hours');
  const elMinutes = document.getElementById('minutes');
  const elSeconds = document.getElementById('seconds');
  const countdownSection = document.querySelector('.countdown');
  const statusText = document.getElementById('statusText');

  function pad(n){ return String(n).padStart(2, '0'); }

  let celebrated = false; // fire celebration once

  function update(){
    const now = new Date();
    let diff = targetDate.getTime() - now.getTime();

    if(diff <= 0){
      // Switch to count-up since retirement
      const elapsedMs = now.getTime() - targetDate.getTime();
      const secondsUp = Math.floor(elapsedMs / 1000);
      const daysUp = Math.floor(secondsUp / 86400);
      const hoursUp = Math.floor((secondsUp % 86400) / 3600);
      const minutesUp = Math.floor((secondsUp % 3600) / 60);
      const secsUp = secondsUp % 60;

      elDays.textContent = pad(daysUp);
      elHours.textContent = pad(hoursUp);
      elMinutes.textContent = pad(minutesUp);
      elSeconds.textContent = pad(secsUp);

      countdownSection.classList.remove('soon','very-soon');
      statusText.textContent = "Happy Retirement, Papa! Enjoy the adventure ✨";

      if(!celebrated){
        // Ensure celebration visuals are applied immediately
        const dadEl = document.querySelector('.dad');
        if(dadEl) dadEl.classList.add('celebrate');
        celebrated = true;
      }
      // Continuously ensure fireworks keep running during count-up
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
