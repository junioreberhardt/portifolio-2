document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LÓGICA DO MODO ESCURO ---
    const themeButton = document.querySelector('a[href="#"]:has(.fa-moon)'); // Seleciona o link com o ícone de lua
    const body = document.body;

    if (themeButton) {
        themeButton.addEventListener('click', (e) => {
            e.preventDefault();
            body.classList.toggle('dark-mode');

            // Troca o ícone entre lua e sol (opcional, se quiseres mudar o ícone)
            const icon = themeButton.querySelector('i');
            if (body.classList.contains('dark-mode')) {
                icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }

    // --- 2. ANIMAÇÃO DAS SKILLS AO FAZER SCROLL ---
    // Usamos a Intersection Observer API para detetar quando a secção aparece
    const skillBars = document.querySelectorAll('.skill-bar-progress');

    const observerOptions = {
        threshold: 0.5 // A animação começa quando 50% da barra estiver visível
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona uma classe para disparar a animação ou define o width
                const bar = entry.target;
                const width = bar.style.getPropertyValue('--width');
                bar.style.width = width;
                observer.unobserve(bar); // Para de observar depois de animar uma vez
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        // Resetamos o width inicial para 0 no JS para garantir que a animação ocorra
        bar.style.width = '0';
        observer.observe(bar);
    });

    // --- 3. SCROLL SUAVE PARA OS LINKS DO MENU ---
    const menuLinks = document.querySelectorAll('#menu a[href^="#"]');

    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== "#") {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
