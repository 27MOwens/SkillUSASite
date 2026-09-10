document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".sponsor-card"));
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 80}ms`;
  });
  
  // Nav submenu toggle for click-to-open on desktop and touch on small screens
  const navItems = Array.from(document.querySelectorAll('.nav-item'));
  navItems.forEach(item => {
    const link = item.querySelector('a');
    const submenu = item.querySelector('.submenu');
    
    if (!submenu) return; // Skip if no submenu
    
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Close any other open submenus first
      navItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          const otherSubmenu = otherItem.querySelector('.submenu');
          if (otherSubmenu && window.matchMedia('(max-width: 960px)').matches) {
            otherSubmenu.style.display = '';
          }
        }
      });
      
      // Toggle this item's submenu
      item.classList.toggle('open');
      
      // On small screens, manually control display; on desktop, CSS :hover + .open class handles it
      if (window.matchMedia('(max-width: 960px)').matches) {
        submenu.style.display = item.classList.contains('open') ? 'flex' : 'none';
      }
    });
  });

  // Close submenus when clicking outside the nav
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.main-nav')) {
      navItems.forEach(item => {
        item.classList.remove('open');
        const submenu = item.querySelector('.submenu');
        if (submenu && window.matchMedia('(max-width: 960px)').matches) {
          submenu.style.display = '';
        }
      });
    }
  });

    const heroMedia = document.querySelector(".hero-home .hero-media");

  if (heroMedia) {
    const heroImages = [
      "/yts_20241115_54158065724_o.jpg",
      "/yts_20251120_55057350316_o.jpg",
      "/yts_20251120_55057350346_o.jpg"
    ];

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    heroMedia.style.setProperty("--hero-current", `url("${heroImages[0]}")`);

    if (!reduceMotion) {
      heroImages.slice(1).forEach((src) => {
        const image = new Image();
        image.src = src;
      });

      let currentImage = 0;

      window.setInterval(() => {
        const nextImage = (currentImage + 1) % heroImages.length;

        heroMedia.style.setProperty(
          "--hero-next",
          `url("${heroImages[nextImage]}")`
        );

        heroMedia.classList.add("is-sliding");

        window.setTimeout(() => {
          currentImage = nextImage;

          const followingImage =
            (currentImage + 1) % heroImages.length;

          heroMedia.style.setProperty(
            "--hero-current",
            `url("${heroImages[currentImage]}")`
          );

          heroMedia.style.setProperty(
            "--hero-next",
            `url("${heroImages[followingImage]}")`
          );

          heroMedia.classList.add("no-transition");
          heroMedia.classList.remove("is-sliding");

          requestAnimationFrame(() => {
            heroMedia.classList.remove("no-transition");
          });
        }, 900);
      }, 5000);
    }
  }
});
