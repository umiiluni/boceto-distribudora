// responsive-menu.js - Fix completo para menú móvil AMICI
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando menú responsive AMICI...');
    
    // Elementos del DOM
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbar = document.querySelector('#mainNavbar');
    
    if (!navbarToggler || !navbarCollapse) {
        console.warn('Elementos del navbar no encontrados');
        return;
    }
    
    // Variable para controlar estado del menú
    let isMenuOpen = false;
    
    // ========== FIX 1: CERRAR MENÚ AL TOCAR FUERA ==========
    document.addEventListener('click', function(event) {
        const isClickInsideNavbar = navbar.contains(event.target);
        const isClickOnToggler = navbarToggler.contains(event.target);
        
        if (isMenuOpen && !isClickInsideNavbar && !isClickOnToggler) {
            closeMenu();
        }
    });
    
    // ========== FIX 2: CERRAR MENÚ AL TOCAR ENLACE ==========
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                closeMenu();
            }
        });
    });
    
    // ========== FIX 3: CERRAR MENÚ AL HACER SCROLL ==========
    window.addEventListener('scroll', function() {
        if (isMenuOpen && window.innerWidth < 992) {
            closeMenu();
        }
    });
    
    // ========== FIX 4: BOTÓN HAMBURGUESA PERSONALIZADO ==========
    navbarToggler.addEventListener('click', function() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // ========== FUNCIONES PARA ABRIR/CERRAR MENÚ ==========
    function openMenu() {
        isMenuOpen = true;
        navbarCollapse.classList.add('show');
        document.body.classList.add('menu-open');
        navbarToggler.setAttribute('aria-expanded', 'true');
        console.log('Menú abierto');
    }
    
    function closeMenu() {
        isMenuOpen = false;
        navbarCollapse.classList.remove('show');
        document.body.classList.remove('menu-open');
        navbarToggler.setAttribute('aria-expanded', 'false');
        console.log('Menú cerrado');
    }
    
    // ========== FIX 5: AJUSTAR ALTURA DEL MENÚ EN MÓVILES ==========
    function adjustMenuHeight() {
        if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
            const windowHeight = window.innerHeight;
            const navbarHeight = navbar.offsetHeight;
            const availableHeight = windowHeight - navbarHeight - 20;
            
            navbarCollapse.style.maxHeight = availableHeight + 'px';
        }
    }
    
    // ========== FIX 6: ESC KEY PARA CERRAR MENÚ ==========
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
    
    // ========== FIX 7: SWIPE PARA CERRAR MENÚ EN MÓVILES ==========
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(event) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', function(event) {
        if (!isMenuOpen) return;
        
        const touchX = event.touches[0].clientX;
        const touchY = event.touches[0].clientY;
        const deltaX = touchX - touchStartX;
        const deltaY = touchY - touchStartY;
        
        // Si el swipe es horizontal y significativo, cerrar menú
        if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 30) {
            closeMenu();
        }
    });
    
    // ========== INICIALIZACIÓN ==========
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            // En desktop, asegurar que el menú esté cerrado y sin estilos móviles
            closeMenu();
            navbarCollapse.style.maxHeight = '';
            document.body.classList.remove('menu-open');
        }
    });
    
    // Ajustar inicialmente
    if (window.innerWidth < 992) {
        adjustMenuHeight();
    }
    
    console.log('Menú responsive inicializado correctamente');
});