# Generador de Firmas Corporativas

➡️ Accede a la aplicación aquí: https://centricasolucionesdiseno-ux.github.io/Firma-CentricaSoluciones
---

Este proyecto es una herramienta web interna diseñada para que los empleados de la compañía puedan generar sus firmas de correo electrónico corporativas de forma estandarizada, rápida y sin errores.

## Características Principales
- **Dos Versiones Optimizadas:**
  - **Escritorio/Web:** Ofrece una firma completa con todos los elementos gráficos, incluyendo logo y banners promocionales. Dispone de un botón *"Copiar Firma"* con lógica avanzada para copiar directamente al portapapeles.
  - **Móvil:** Presenta una firma ligera y adaptada, sin banners, para una carga rápida en dispositivos móviles.

- **Botón de Acción Híbrido (Solo en Versión Móvil):**
  - Para ofrecer la mejor experiencia en cada sistema, el botón *"Copiar / Seleccionar"* detecta el dispositivo:
    - **En iPhone:** El botón copia la firma directamente al portapapeles.
    - **En Android:** El botón selecciona todo el texto de la firma, permitiendo al usuario usar la función nativa de su teléfono para copiar de forma fiable.

- **Capitalización Automática:** Los campos *"Nombre y apellidos"* y *"Cargo"* formatean el texto en tiempo real mientras el usuario escribe, asegurando que cada palabra empiece siempre con mayúscula.

- **Formulario Intuitivo:** Los usuarios solo tienen que rellenar sus datos para generar la firma de manera instantánea.

---

## Estructura del Proyecto
- `index.html`: Página de inicio donde el usuario elige el tipo de firma.
- `outlook_app_web.html`: Generador para la versión de Escritorio/Web.
- `outlook_mobile.html`: Generador para la versión de Móvil.
- `style.css`: Hoja de estilos común para todas las páginas.
- `script.js`: Fichero principal con toda la lógica de la aplicación.
- `datos_banners.js`: Fichero de configuración con los enlaces de los banners.

---
## Despliegue
Este proyecto está desplegado usando GitHub Pages.
