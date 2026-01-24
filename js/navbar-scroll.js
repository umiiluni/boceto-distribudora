// navbar-scroll.js - Versión optimizada para móviles

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('#mainNavbar');
    if (!navbar) return;
    
    let lastScrollTop = 0;
    const scrollThreshold = 100;
    let ticking = false;
    
    // Solo aplicar scroll hide en desktop
    if (window.innerWidth > 768) {
        navbar.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
        
        function handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Si está cerca del top, mostrar navbar
            if (scrollTop < 10) {
                navbar.style.transform = 'translateY(0)';
                return;
            }
            
            // Si el menú está abierto en móviles, no ocultar
            const isMenuOpen = document.querySelector('.navbar-collapse.show');
            if (isMenuOpen) return;
            
            // Ocultar al bajar, mostrar al subir
            if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    // Ajustar padding del body según altura del navbar
    function adjustBodyPadding() {
        const navbarHeight = navbar.offsetHeight;
        document.body.style.paddingTop = navbarHeight + 'px';
    }
    
    // Inicializar y ajustar en resize
    adjustBodyPadding();
    window.addEventListener('resize', adjustBodyPadding);
    
    // Mejorar cierre del menú en móviles al tocar fuera
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 992) {
            const navbarCollapse = document.querySelector('.navbar-collapse.show');
            const toggler = document.querySelector('.navbar-toggler');
            
            if (navbarCollapse && !navbarCollapse.contains(e.target) && 
                !toggler.contains(e.target)) {
                toggler.click();
            }
        }
    });
});