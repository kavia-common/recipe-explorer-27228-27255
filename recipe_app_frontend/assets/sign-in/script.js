(function () {
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const toggle = document.querySelector('.toggle-visibility');
  const submit = document.getElementById('submitBtn');

  // Show/hide password
  if (toggle && password) {
    toggle.addEventListener('click', () => {
      const isPassword = password.getAttribute('type') === 'password';
      password.setAttribute('type', isPassword ? 'text' : 'password');
      toggle.setAttribute('aria-pressed', String(isPassword));
      toggle.textContent = isPassword ? 'Hide' : 'Show';
      password.focus();
    });
  }

  // Simple validation and mock submit
  function validate() {
    let valid = true;
    // basic email pattern
    const emailVal = email.value.trim();
    const passVal = password.value;

    if (!email.checkValidity() || !/.+@.+\..+/.test(emailVal)) valid = false;
    if (passVal.length < 6) valid = false;

    return valid;
  }

  // Visual feedback on invalid
  function showInvalid(el) {
    const rect = el.closest('.field-rect');
    if (rect) {
      rect.style.borderColor = '#EF4444';
      rect.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
      setTimeout(() => {
        rect.style.borderColor = '';
        rect.style.boxShadow = '';
      }, 1500);
    }
  }

  if (submit) {
    submit.addEventListener('click', () => {
      if (!validate()) {
        if (!email.checkValidity()) showInvalid(email);
        if (password.value.length < 6) showInvalid(password);
        return;
      }
      // Mock success: focus primary button and announce
      submit.blur();
      alert('Signed in (mock). This is a static prototype.');
    });
  }

  // Accessibility: pressing Enter inside inputs triggers submit
  [email, password].forEach((el) => {
    el && el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submit.click();
      }
    });
  });
})();
