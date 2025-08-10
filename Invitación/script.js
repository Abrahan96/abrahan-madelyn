// Esperamos a que todo esté listo
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 1. Inicialización segura de Supabase
        const { createClient } = window.supabase;
        const supabase = createClient(
            'https://eyemokwxswevabnuldej.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5ZW1va3d4c3dldmFibnVsZGVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5Mjg3NjAsImV4cCI6MjA1NzUwNDc2MH0.PrlwMQ4Exxuo1dGfclqmwBDnchRQ_7mQFi1hjiZKcno'
        );

        // 2. Contador regresivo mejorado
        const actualizarContador = () => {
            const ahora = new Date();
            const fechaBoda = new Date('2025-10-11T18:30:00');
            const diff = fechaBoda - ahora;
            
            const dias = Math.floor(diff / (86400000));
            const horas = Math.floor((diff % 86400000) / 3600000);
            const minutos = Math.floor((diff % 3600000) / 60000);
            
            document.getElementById('dias').textContent = dias;
            document.getElementById('horas').textContent = horas;
            document.getElementById('minutos').textContent = minutos;
        };
        
        // Actualizar cada segundo
        actualizarContador();
        setInterval(actualizarContador, 1000);

        // 3. Manejo del formulario optimizado
        const formulario = document.getElementById('rsvpForm');
        const respuesta = document.getElementById('respuesta');
        
        formulario.addEventListener('submit', async (e) => {
            e.preventDefault();
            respuesta.textContent = 'Enviando...';
            respuesta.style.color = '#3498db';
            
            try {
                // Validación mejorada
                const nombre = document.getElementById('nombre').value.trim();
                const confirmacion = document.getElementById('confirmacion').value;
                
                if (!nombre || !confirmacion) {
                    throw new Error('Por favor completa los campos obligatorios');
                }

                // Datos a enviar
                const datos = {
                    nombre,
                    confirmacion,
                    num_personas: parseInt(document.getElementById('num_personas').value) || 1,
                    mensaje: document.getElementById('mensaje').value.trim()
                };

                // Envío a Supabase
                const { error } = await supabase
                    .from('invitados')
                    .insert([datos]);

                if (error) throw error;
                
                // Feedback al usuario
                respuesta.textContent = '✅ ¡Confirmación exitosa! Nos vemos el 11/10/2025';
                respuesta.style.color = '#2ecc71';
                formulario.reset();
                
                // Limpiar mensaje después de 5 segundos
                setTimeout(() => {
                    respuesta.textContent = '';
                }, 5000);
                
            } catch (error) {
                console.error('Error:', error);
                respuesta.textContent = `❌ ${error.message}`;
                respuesta.style.color = '#e74c3c';
            }
        });

    } catch (error) {
        console.error('Error inicializando la aplicación:', error);
        alert('Ocurrió un error al cargar la página. Por favor recarga.');
    }
});