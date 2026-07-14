const buttons = document.querySelectorAll('.button, .nav a');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    document.documentElement.classList.add('nav-used');
    window.setTimeout(() => {
      document.documentElement.classList.remove('nav-used');
    }, 180);
  });
});
