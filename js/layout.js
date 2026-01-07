function updateSidebarHeight() {
  const sidebar = document.getElementById('sidebar');
  const footer = document.querySelector('.dashboard-footer');

  if (!sidebar || !footer) return;

  const sidebarTop = sidebar.getBoundingClientRect().top + window.scrollY;
  const footerTop = footer.getBoundingClientRect().top + window.scrollY;
  const height = Math.max(0, footerTop - sidebarTop - 16);

    const sidebarcls = document.querySelector('.sidebar');

  sidebarcls.style.setProperty('--computed-height', `${height}px`);
}

document.addEventListener('partialsLoaded', updateSidebarHeight);

window.addEventListener('resize', updateSidebarHeight);