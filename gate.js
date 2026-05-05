// ── Site password gate ──
// TO REMOVE: delete gate.js and remove the two gate script tags from every HTML file.

(function () {
  const PASSWORD = 'password';
  const KEY = 'ct_site_access';

  if (sessionStorage.getItem(KEY) === '1') return;

  // Build overlay
  const overlay = document.createElement('div');
  overlay.id = 'gate-overlay';
  overlay.innerHTML = `
    <div id="gate-box">
      <div id="gate-brand">ct<span>.</span></div>
      <p id="gate-label">This site is private.<br>Enter the password to continue.</p>
      <input id="gate-input" type="password" placeholder="Password" autocomplete="off">
      <button id="gate-btn">Enter</button>
      <p id="gate-error"></p>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    #gate-overlay {
      position: fixed; inset: 0; z-index: 99999;
      background: #061440;
      display: flex; align-items: center; justify-content: center;
      font-family: 'DM Sans', sans-serif;
    }
    #gate-box {
      display: flex; flex-direction: column; align-items: center;
      gap: 16px; width: 100%; max-width: 340px; padding: 0 24px;
    }
    #gate-brand {
      font-family: 'Syne', sans-serif; font-weight: 800;
      font-size: 2.5rem; color: #fff; letter-spacing: -0.02em;
      margin-bottom: 8px;
    }
    #gate-brand span { color: #4A9EFF; }
    #gate-label {
      color: rgba(255,255,255,0.6); font-size: 0.9rem;
      text-align: center; line-height: 1.5;
    }
    #gate-input {
      width: 100%; padding: 12px 16px; border-radius: 6px;
      border: 1px solid rgba(255,255,255,0.15);
      background: rgba(255,255,255,0.07); color: #fff;
      font-size: 1rem; outline: none; text-align: center;
      letter-spacing: 0.1em;
    }
    #gate-input:focus { border-color: #4A9EFF; }
    #gate-btn {
      width: 100%; padding: 12px; border-radius: 6px;
      background: #4A9EFF; color: #fff; border: none;
      font-size: 0.95rem; font-weight: 600; cursor: pointer;
      transition: background 0.2s;
    }
    #gate-btn:hover { background: #2d87f0; }
    #gate-error {
      color: #ff6b6b; font-size: 0.85rem; min-height: 1.2em;
    }
  `;

  document.head.appendChild(style);
  document.body.prepend(overlay);
  document.body.style.overflow = 'hidden';

  const input = document.getElementById('gate-input');
  const btn = document.getElementById('gate-btn');
  const error = document.getElementById('gate-error');

  function attempt() {
    if (input.value === PASSWORD) {
      sessionStorage.setItem(KEY, '1');
      overlay.remove();
      style.remove();
      document.body.style.overflow = '';
    } else {
      error.textContent = 'Incorrect password.';
      input.value = '';
      input.focus();
    }
  }

  btn.addEventListener('click', attempt);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') attempt(); });
  input.focus();
})();
