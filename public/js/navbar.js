document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInside = navToggle.contains(event.target) || navMenu.contains(event.target);
      if (!isClickInside && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }
});
