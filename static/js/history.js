// Simple search filter
function filterTable() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase();
  const table = document.getElementById("historyTable");
  const trs = table.getElementsByTagName("tr");

  for (let i = 1; i < trs.length; i++) {
    const tds = trs[i].getElementsByTagName("td");
    if (tds[1]) {
      const txtValue = tds[1].textContent || tds[1].innerText;
      trs[i].style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
    }
  }
}

// Parallax glow
document.addEventListener('mousemove', (e) => {
  const glowLayer = document.querySelector('.glow-layer');
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  glowLayer.style.transform = `translate(${x}px, ${y}px)`;
});
