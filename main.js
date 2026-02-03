document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector(".nav-toggle");
    const primaryNav = document.querySelector("#primary-navigation");

    // 1. Mobiele Navigatie met Toegankelijkheid
    if (navToggle && primaryNav) {
        navToggle.addEventListener("click", () => {
            const isVisible = primaryNav.getAttribute("data-visible") === "true";
            
            primaryNav.setAttribute("data-visible", !isVisible);
            navToggle.setAttribute("aria-expanded", !isVisible);
            
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }

            if (!isVisible) {
                primaryNav.classList.remove('hidden');
                primaryNav.setAttribute('aria-hidden', 'false');
            } else {
                primaryNav.setAttribute('aria-hidden', 'true');
                setTimeout(() => {
                    if (primaryNav.getAttribute("data-visible") === "false") {
                        primaryNav.classList.add('hidden');
                    }
                }, 350);
            }
        });
    }

    // 2. Smooth Scroll met Offset Correctie
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Sluit menu na klik (mobiel)
                if (primaryNav && primaryNav.getAttribute("data-visible") === "true") {
                    navToggle.click();
                }
            }
        });
    });
});
