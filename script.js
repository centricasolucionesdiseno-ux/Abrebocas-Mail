document.addEventListener('DOMContentLoaded', function() {

    const generarBtn = document.getElementById('generar-btn');
    const firmaContainer = document.getElementById('firma-container');
    const copyBtn = document.getElementById('copy-btn');
    const mobileActionBtn = document.getElementById('mobile-action-btn');
    const generadoSpan = document.getElementById('generado');
    const resultadoWrapper = document.getElementById('resultado-wrapper');

    const formInputs = {
        nombre: document.getElementById('nombre'),
        cargo: document.getElementById('cargo'),
        tef: document.getElementById('tef'),
        dependencia: document.getElementById('dependencia'),
    };
    
    const signatureOutputs = {
        nombre: document.getElementById('nombre-empleado'),
        cargo: document.getElementById('cargo-empleado'),
        tef: document.getElementById('tef-empleado'),
        mobileWrapper: document.getElementById('mobile-field-wrapper'),
        dependencia: document.getElementById('dependencia-empleado'),
    };

    // --- Funciones existentes ---
    function toTitleCase(str) {
        if (!str) return '';
        return str.toLowerCase().split(' ').map(function(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    }

    function updateSignature() {
        const nombreVal = toTitleCase(formInputs.nombre.value.trim());
        const cargoVal = toTitleCase(formInputs.cargo.value.trim());
        const tefVal = formInputs.tef.value.trim();
        
        signatureOutputs.nombre.textContent = nombreVal;
        signatureOutputs.cargo.textContent = cargoVal;

        const dependenciaVal = formInputs.dependencia.value;
        signatureOutputs.dependencia.textContent = dependenciaVal;
        
        if (tefVal) {
            const formattedTef = `${tefVal.substring(0, 3)} ${tefVal.substring(3, 6)} ${tefVal.substring(6, 10)}`;
            signatureOutputs.tef.textContent = formattedTef;
            signatureOutputs.mobileWrapper.style.display = 'inline';
        } else {
            signatureOutputs.mobileWrapper.style.display = 'none';
        }
        
    }
    
    function selectText(element) {
        const selection = window.getSelection();
        selection.removeAllRanges();
        const range = document.createRange();
        range.selectNodeContents(element);
        selection.addRange(range);
    }

    function copySignature(buttonElement) {
        let success = false;
        try {
            if (navigator.clipboard && navigator.clipboard.write) {
                const firmaHTML = firmaContainer.innerHTML;
                const blob = new Blob([firmaHTML], { type: 'text/html' });
                const clipboardItem = new ClipboardItem({ 'text/html': blob });

                navigator.clipboard.write([clipboardItem]).then(() => {
                    buttonElement.textContent = '¡Copiado!';
                    buttonElement.classList.add('copied');
                    success = true;
                }).catch(() => {
                    selectText(firmaContainer);
                    success = document.execCommand('copy');
                    if (success) {
                        buttonElement.textContent = '¡Copiado!';
                        buttonElement.classList.add('copied');
                    }
                });
            } else {
                selectText(firmaContainer);
                success = document.execCommand('copy');
                if (success) {
                    buttonElement.textContent = '¡Copiado!';
                    buttonElement.classList.add('copied');
                }
            }
        } catch (err) {
            console.error("Error al copiar:", err);
        }
        return success;
    }
    
    // ========== NUEVAS FUNCIONES PARA COPIAR LA TABLA DEL CORREO ==========
    
    function showCopyMessage() {
        let messageDiv = document.getElementById('copy-message');
        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.id = 'copy-message';
            messageDiv.className = 'copy-message';
            messageDiv.textContent = '✅ Correo copiado al portapapeles';
            document.body.appendChild(messageDiv);
        }
        
        messageDiv.classList.add('show');
        setTimeout(() => {
            messageDiv.classList.remove('show');
        }, 2000);
    }

    function copyEmailTable(buttonElement) {
        const emailTable = document.getElementById('email-content');
        if (!emailTable) {
            console.error('No se encontró la tabla de correo');
            return false;
        }
        
        let success = false;
        
        try {
            // Clonamos la tabla para no modificar la original
            const cloneTable = emailTable.cloneNode(true);
            const tableHtml = cloneTable.outerHTML;
            
            // Creamos estructura completa del correo con estilos
            const fullHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Correo Centrica</title>
    <style>
        .email-table {
            width: 650px;
            max-width: 100%;
            border: 1px solid #e2e2e2;
            border-radius: 24px;
            overflow: hidden;
            background-color: #ffffff;
            margin: 0 auto;
            font-family: Arial, Helvetica, sans-serif;
            color: #222222;
        }
        .e-body {
            padding: 28px 32px 20px 32px;
        }
        .e-body h1 {
            font-size: 22px;
            font-weight: 700;
            color: #163A73;
            margin: 0 0 12px 0;
            line-height: 1.3;
        }
        .e-body h2 {
            font-size: 16px;
            font-weight: 700;
            color: #163A73;
            margin: 20px 0 8px 0;
        }
        .e-body p {
            font-size: 14px;
            color: #444444;
            line-height: 1.7;
            margin: 0 0 14px 0;
        }
        .e-cta {
            display: inline-block;
            background: #0E58A9;
            color: #ffffff;
            font-size: 14px;
            font-weight: 700;
            padding: 12px 28px;
            border-radius: 6px;
            text-decoration: none;
            margin: 8px 0 24px 0;
        }
        .e-card {
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            display: flex;
            overflow: hidden;
            margin-top: 8px;
        }
        .e-card-img {
            width: 110px;
            min-width: 110px;
            background: #e8f0fb;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .e-card-img img {
            width: 110px;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        .e-card-body {
            padding: 14px 16px;
            flex: 1;
        }
        .e-card-title {
            font-size: 14px;
            font-weight: 700;
            color: #163A73;
            margin: 0 0 5px 0;
        }
        .e-card-text {
            font-size: 12px;
            color: #666666;
            line-height: 1.6;
            margin: 0 0 8px 0;
        }
        .e-card-link {
            font-size: 12px;
            color: #0E58A9;
            font-weight: 700;
            text-decoration: none;
        }
        .e-footer {
            border-top: 1px solid #eeeeee;
            padding: 14px 32px;
            font-size: 11px;
            color: #999999;
            text-align: center;
        }
    </style>
</head>
<body style="margin:0; padding:20px; background-color:#f0f2f5;">
    ${tableHtml}
</body>
</html>`;
            
            // Método moderno para copiar HTML
            if (navigator.clipboard && navigator.clipboard.write) {
                const htmlBlob = new Blob([fullHtml], { type: 'text/html' });
                const clipboardItem = new ClipboardItem({
                    'text/html': htmlBlob
                });
                
                navigator.clipboard.write([clipboardItem]).then(() => {
                    if (buttonElement) {
                        const originalText = buttonElement.textContent;
                        buttonElement.textContent = '¡Correo copiado!';
                        buttonElement.classList.add('copied');
                        setTimeout(() => {
                            buttonElement.textContent = originalText;
                            buttonElement.classList.remove('copied');
                        }, 3000);
                    }
                    showCopyMessage();
                    success = true;
                }).catch(() => {
                    // Fallback si falla el método moderno
                    success = fallbackCopyEmail(tableHtml, buttonElement);
                });
            } else {
                // Navegadores antiguos
                success = fallbackCopyEmail(tableHtml, buttonElement);
            }
        } catch (err) {
            console.error("Error al copiar correo:", err);
            success = false;
        }
        
        return success;
    }

    function fallbackCopyEmail(htmlContent, buttonElement) {
        try {
            const tempDiv = document.createElement('div');
            tempDiv.style.position = 'fixed';
            tempDiv.style.left = '-9999px';
            tempDiv.style.top = '-9999px';
            tempDiv.innerHTML = htmlContent;
            document.body.appendChild(tempDiv);
            
            const range = document.createRange();
            range.selectNodeContents(tempDiv);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            
            const success = document.execCommand('copy');
            
            document.body.removeChild(tempDiv);
            selection.removeAllRanges();
            
            if (success && buttonElement) {
                const originalText = buttonElement.textContent;
                buttonElement.textContent = '¡Correo copiado!';
                buttonElement.classList.add('copied');
                setTimeout(() => {
                    buttonElement.textContent = originalText;
                    buttonElement.classList.remove('copied');
                }, 3000);
                showCopyMessage();
            }
            
            return success;
        } catch (err) {
            console.error("Error en fallback:", err);
            return false;
        }
    }
    
    // ========== FIN DE LAS NUEVAS FUNCIONES ==========
    
    // --- Event Listeners existentes ---
    if (generarBtn) {

        if (formInputs.nombre) {
            formInputs.nombre.addEventListener('input', function(e) {
                const start = e.target.selectionStart;
                const end = e.target.selectionEnd;
                e.target.value = toTitleCase(e.target.value);
                e.target.setSelectionRange(start, end);
            });
        }
        
        if (formInputs.cargo) {
            formInputs.cargo.addEventListener('input', function(e) {
                const start = e.target.selectionStart;
                const end = e.target.selectionEnd;
                e.target.value = toTitleCase(e.target.value);
                e.target.setSelectionRange(start, end);
            });
        }

        if (formInputs.tef) {
            formInputs.tef.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }
        
        generarBtn.addEventListener('click', function() {
            if (!formInputs.nombre.value.trim() || !formInputs.cargo.value.trim() || !formInputs.dependencia.value) {
                alert('Por favor, rellena todos los campos obligatorios: Nombre, Cargo y Dependencia.');
                return;
            }

            updateSignature();

            // Mostrar resultado y botón de copiar
            if (resultadoWrapper) resultadoWrapper.style.display = 'block';
            if (copyBtn) copyBtn.disabled = false;
            if (mobileActionBtn) mobileActionBtn.disabled = false;

            generadoSpan.textContent = ' ¡Firma generada!';
            generadoSpan.style.color = 'green';
            generadoSpan.style.fontWeight = 'bold';
            generadoSpan.style.marginLeft = '10px';
        });

        // Al editar cualquier campo, ocultar resultado hasta nuevo clic en Generar
        Object.values(formInputs).forEach(input => {
            if (input) {
                input.addEventListener('input', () => {
                    if (resultadoWrapper) resultadoWrapper.style.display = 'none';
                    if (copyBtn) copyBtn.disabled = true;
                    if (mobileActionBtn) mobileActionBtn.disabled = true;
                    generadoSpan.textContent = '';
                });
            }
        });
    }

    // Lógica para el botón de Copiar (Escritorio/Web)
    if (copyBtn && firmaContainer) {
        copyBtn.addEventListener('click', function() {
            if (copyBtn.disabled) return;
            copySignature(copyBtn);
            setTimeout(() => {
                copyBtn.textContent = 'Copiar Firma';
                copyBtn.classList.remove('copied');
            }, 5000);
        });
    }
    
    // Lógica híbrida para el botón de Móvil
    if (mobileActionBtn && firmaContainer) {
        mobileActionBtn.addEventListener('click', function() {
            if (mobileActionBtn.disabled) return;
            
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

            if (isIOS) {
                copySignature(mobileActionBtn);
            } else {
                selectText(firmaContainer);
                mobileActionBtn.textContent = '¡Texto seleccionado!';
                mobileActionBtn.classList.add('copied');
            }

            setTimeout(() => {
                mobileActionBtn.textContent = 'Copiar / Seleccionar';
                mobileActionBtn.classList.remove('copied');
            }, 5000);
        });
    }
    
    // ========== NUEVO: Evento para el botón de copiar correo ==========
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', function() {
            copyEmailTable(copyEmailBtn);
        });
    }
    
});
