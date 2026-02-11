// form-whats.js - Versión simplificada para AMICI
// Este archivo es opcional si ya incluiste el script en el HTML

console.log('Formulario AMICI cargado');

// Función para formatear número de teléfono
function formatearTelefono(numero) {
    const limpio = numero.replace(/\D/g, '');
    if (limpio.length === 10) {
        return limpio.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2$3');
    }
    return limpio;
}

// Función para obtener ubicación
function obtenerUbicacion() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject('Geolocalización no soportada');
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            position => resolve(position),
            error => reject(error)
        );
    });
}

// Función para crear mensaje de WhatsApp
function crearMensajeWhatsApp(datos) {
    const hora = new Date().toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    return `¡Hola! Quiero realizar un pedido a AMICI 🍔🍕

👤 *Nombre:* ${datos.nombre}
📱 *Teléfono:* ${datos.telefono}
📍 *Dirección:* ${datos.direccion}

📋 *Mi pedido:*
${datos.pedido}

⏰ *Hora:* ${hora}

¡Gracias! 😊`;
}

// Inicialización cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarFormulario);
} else {
    inicializarFormulario();
}

function inicializarFormulario() {
    const form = document.getElementById('pedidoForm');
    
    if (!form) {
        console.log('Formulario no encontrado');
        return;
    }
    
    console.log('Formulario AMICI inicializado correctamente');
}