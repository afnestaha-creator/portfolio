function reveal() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add("active");
        } else {
            element.classList.remove("active");
        }
    });
}

window.addEventListener("load", reveal);
window.addEventListener("scroll", reveal);

document.addEventListener('DOMContentLoaded', () => {
    console.log("Script chargé !"); // Vérifiez la console F12

    const menuBtn = document.getElementById('menubtn');
    const menu = document.getElementById('menu');

    if (!menuBtn || !menu) {
        console.error("Erreur : Impossible de trouver le bouton ou le menu.");
        return;
    }

    menuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log("Clic sur le bouton détecté");
        
        // Bascule la classe 'show' sur le menu
        const isOpen = menu.classList.toggle('show');
        menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        
        // Gestion visuelle de l'icône
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    // Fermer au clic sur un lien
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('show');
            menuBtn.setAttribute('aria-expanded', 'false');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
});

            // Scroll Reveal Animation
            const reveals = document.querySelectorAll('.reveal');

            function revealOnScroll() {
                const windowHeight = window.innerHeight;
                const elementVisible = 100;

                reveals.forEach((reveal) => {
                    const elementTop = reveal.getBoundingClientRect().top;
                    if (elementTop < windowHeight - elementVisible) {
                        reveal.classList.add('active');
                    }
                });
            }

            // Trigger once on load, then on scroll
            revealOnScroll();
            window.addEventListener('scroll', revealOnScroll);
            
        ;