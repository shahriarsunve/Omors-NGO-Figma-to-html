async function loadPartials() {
  const header = await fetch("../partials/header.html").then(res => res.text());
  const sidebar = await fetch("../partials/sidebar.html").then(res => res.text());
  const footer = await fetch("../partials/footer.html").then(res => res.text());

  document.getElementById("header").innerHTML = header;
  document.getElementById("sidebar").innerHTML = sidebar;
  document.getElementById("footer").innerHTML = footer;
}

loadPartials();


document.querySelectorAll(".sidebar-item a").forEach(link => {
  if (link.href === window.location.href) {
    link.parentElement.classList.add("active");
  }
});