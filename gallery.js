(function () {
  const overlay = document.getElementById("overlay-gallery");
  if (!overlay) return;

  const galleryCard = overlay.querySelector(".gallery-card");
  const grid = overlay.querySelector(".gallery-grid");
  const items = overlay.querySelectorAll(".gallery-grid__item img");

  // Build fullscreen viewer element
  const viewer = document.createElement("div");
  viewer.className = "gallery-viewer";
  viewer.setAttribute("aria-hidden", "true");
  viewer.innerHTML =
    '<button class="gallery-viewer__close" type="button" aria-label="חזרה לגלריה">&times;</button>' +
    '<img class="gallery-viewer__img" alt="">';
  galleryCard.appendChild(viewer);

  const viewerImg = viewer.querySelector(".gallery-viewer__img");
  const closeBtn = viewer.querySelector(".gallery-viewer__close");

  function open(img) {
    viewerImg.src = img.src || img.dataset.src;
    viewerImg.alt = img.alt;
    viewer.setAttribute("aria-hidden", "false");
    viewer.classList.add("is-open");
  }

  function close() {
    viewer.classList.remove("is-open");
    viewer.setAttribute("aria-hidden", "true");
  }

  items.forEach(function (img) {
    img.style.cursor = "pointer";
    img.addEventListener("click", function () { open(img); });
  });

  closeBtn.addEventListener("click", close);

  viewer.addEventListener("click", function (e) {
    if (e.target === viewer) close();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && viewer.classList.contains("is-open")) close();
  });
})();
