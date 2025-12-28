async function loadPartials() {
  const header = await fetch("../partials/header.html").then(res => res.text());
  const sidebar = await fetch("../partials/sidebar.html").then(res => res.text());
  const footer = await fetch("../partials/footer.html").then(res => res.text());

  document.getElementById("header").innerHTML = header;
  document.getElementById("sidebar").innerHTML = sidebar;
  document.getElementById("footer").innerHTML = footer;
  // Signal that partials are loaded so pages can initialize UI components
  document.dispatchEvent(new Event('partialsLoaded'));
}

loadPartials();

// Wait for partials to load before setting up sidebar functionality
document.addEventListener('partialsLoaded', function() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainContent = document.querySelector('main') || document.querySelector('[role="main"]');

  // Initialize sidebar state from localStorage
  const savedState = localStorage.getItem('sidebarCollapsed');
  if (savedState === 'true') {
    sidebar.classList.add('collapsed');
  }

  // Toggle sidebar on button click (desktop)
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      const isCollapsed = sidebar.classList.contains('collapsed');
      localStorage.setItem('sidebarCollapsed', isCollapsed);
    });
  }

  // Toggle sidebar on mobile menu button
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      sidebar.classList.toggle('mobile-expanded');
    });
  }

  // Close sidebar on mobile when a link is clicked
  const sidebarLinks = sidebar.querySelectorAll('.sidebar-item a');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('mobile-expanded');
      }
    });
  });

  // Close sidebar when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnMenuBtn = mobileMenuBtn && mobileMenuBtn.contains(event.target);
    
    if (!isClickInsideSidebar && !isClickOnMenuBtn && window.innerWidth <= 768) {
      sidebar.classList.remove('mobile-expanded');
    }
  });

  // Handle window resize to auto-hide sidebar on mobile
  function handleResize() {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('mobile-expanded');
    } else {
      sidebar.classList.remove('mobile-hidden');
    }
  }

  window.addEventListener('resize', handleResize);

  // Set active link based on current URL
  sidebarLinks.forEach(link => {
    if (link.href === window.location.href) {
      link.parentElement.classList.add('active');
    }
  });
});