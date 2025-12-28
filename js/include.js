async function loadPartials() {
  const header = await fetch("../partials/header.html").then(res => res.text());
  const sidebar = await fetch("../partials/sidebar.html").then(res => res.text());
  const footer = await fetch("../partials/footer.html").then(res => res.text());

  document.getElementById("header").innerHTML = header;
  document.getElementById("sidebar").innerHTML = sidebar;
  document.getElementById("footer").innerHTML = footer;

  // Initialize sidebar right after loading
  initializeSidebar();
  
  // Set active link based on current URL
  // const sidebarLinks = document.querySelectorAll('.sidebar-item a');
  // sidebarLinks.forEach(link => {
  //   if (link.href === window.location.href) {
  //     link.parentElement.classList.add('active');
  //   }
  // });

  setActiveSidebarLink()
}

function initializeSidebar() {
  const sidebarDiv = document.getElementById('sidebar');
  const sidebarNav = document.querySelector('nav.sidebar');
  const toggleBtn = document.querySelector('.sidebar-toggle');

  console.log('Initializing sidebar...');
  console.log('Sidebar div element:', sidebarDiv);
  console.log('Sidebar nav element:', sidebarNav);
  console.log('Toggle button:', toggleBtn);

  if (!sidebarDiv || !sidebarNav || !toggleBtn) {
    console.error('Sidebar or toggle button not found');
    return;
  }

  // Initialize sidebar state based on screen size
  function setSidebarState() {
    if (window.innerWidth <= 768) {
      // Mobile: always collapsed
      sidebarDiv.classList.add('collapsed');
      sidebarNav.classList.add('collapsed');
    } else {
      // Desktop: load saved state
      const savedState = localStorage.getItem('sidebarCollapsed');
      if (savedState === 'true') {
        sidebarDiv.classList.add('collapsed');
        sidebarNav.classList.add('collapsed');
      } else {
        sidebarDiv.classList.remove('collapsed');
        sidebarNav.classList.remove('collapsed');
      }
    }
  }

  setSidebarState();

  // Toggle sidebar on button click
  toggleBtn.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Toggle button clicked!');
    sidebarDiv.classList.toggle('collapsed');
    sidebarNav.classList.toggle('collapsed');
    
    // Save state only on desktop
    if (window.innerWidth > 768) {
      const isCollapsed = sidebarDiv.classList.contains('collapsed');
      localStorage.setItem('sidebarCollapsed', isCollapsed);
      console.log('Saved collapsed state:', isCollapsed);
    }
  });

  // Handle window resize
  window.addEventListener('resize', setSidebarState);
}

loadPartials();


function setActiveSidebarLink() {
  const currentPath = window.location.pathname;
  const sidebarLinks = document.querySelectorAll('.sidebar-item a');
debugger
  sidebarLinks.forEach(link => {
    // Get the relative path from the link (e.g., /pages/projects.html)
    const linkPath = new URL(link.href).pathname.split('.')[0];

    // Check if the current URL ends with the link's path
    if (currentPath.endsWith(linkPath) || currentPath === linkPath) {
      // Remove active from others just in case
      document.querySelectorAll('.sidebar-item').forEach(item => item.classList.remove('active'));
      
      // Add active to the parent li or div
      link.parentElement.classList.add('active');
      
      console.log('Set active tab for:', linkPath);
    }
  });
}
