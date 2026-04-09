# 🍽️ Gourmet GO! - De Prototipo a Recetario Profesional

### 🔗 DEMO: https://cuackzoide.github.io/EF_M4-API_gourmet_go/

### 🔗 REPO: https://github.com/Cuackzoide/EF_M4-API_gourmet_go

## 🚀 La Evolución del Proyecto

Este proyecto nació originalmente como el desafío integrador del **Módulo 4: JavaScript Avanzado** del bootcamp **Desarrollo Full Stack Javascript** de **MindHub**. El objetivo principal era transformar una maqueta estática en **una aplicación interactiva** que permitiera buscar recetas por ingrediente **utilizando la API de _TheMealDB_**.

Sin embargo, su **utilidad real era limitada**. Al explorar mejor la API noté que contiene múltiples endpoints que no estaban siendo aprovechados, por lo que decidí ir más allá y transformé lo que era un simple ejercicio de clase en un **recetario dinámico, profesional y realmente útil**, impulsado por mi deseo de ofrecer una **experiencia de usuario superior**.

![Gourmet GO! Demo](./assets/img/demo.gif)

---

## 🛠️ El Núcleo: El Prototipo Inicial

Cumpliendo con los estándares del curso, la base del proyecto incluye:

- 🔍 **Búsqueda por ingrediente**: Conexión con `filter.php?i={ingrediente}`.
- ⚡ **Asincronía Real**: Implementación fundamentada en `Fetch API` con `Async/Await`.
- 📱 **Diseño Adaptativo**: Estructura sólida utilizando Bootstrap 5.
- 🚫 **Validación**: Control de búsquedas sin resultados y prevención de errores en el DOM.

---

## ✨ La Evolución: Desarrollo Profesional

Para elevar el proyecto a un nivel de software real, implementé las siguientes mejoras críticas:

### 1. Sistema de Búsqueda de Tres Ejes

Ya no se limita a ingredientes. El usuario puede alternar instantáneamente entre:

- **Por Ingrediente**: Buscador clásico con sugerencias visuales.
- **Por Origen (Area)**: Exploración culinaria por países con integración de banderas.
- **Por Categoría**: Filtro rápido por tipo de plato (Postres, Vegano, Mariscos, etc.).

### 2. UX Premium e Integración Visual

- 💀 **Skeleton Loading**: Implementación de pantallas de carga "esqueleto" para evitar cambios bruscos de diseño (_layout shifts_) y spinners mientras se obtienen los datos.
- 🏳️ **Identidad Visual Dinámica**:
  - Uso de **FlagCDN** para mostrar banderas de países en tiempo real.
  - Diccionario de emojis para categorías.
  - Sistema híbrido de iconos para ingredientes (Emoji local + Imagen de API como fallback).
- 🃏 **Modales Interactivos**: Detalle completo de la receta con lista de ingredientes exacta, instrucciones formateadas y acceso directo al video en YouTube.

### 3. Persistencia y Contexto (Smart History)

- ▶️ **Navegación Fluida**: El historial no es solo texto; son botones interactivos que permiten repetir búsquedas con un solo clic.
- 🗃️ **Historial Categorizado**: El sistema recuerda de forma independiente las últimas 6 búsquedas de cada modo (Ingredientes, Áreas y Categorías) usando `LocalStorage`.
- 🔄 **Coherencia de Contexto**: Sincronización global del modo de búsqueda. Sin importar si la acción se inicia desde la barra principal o mediante botones del modal, la aplicación actualiza automáticamente el input, el historial y los resultados, manteniendo una UX coherente en todo momento.

![Historial de busquedas](./assets/img/historial.gif)

## ⚙️ Especificaciones Técnicas

- **Lenguaje**: JavaScript (ES6+) bajo estándares de limpieza y modularidad.
- **Estilos**: Bootstrap 5.3.3 + CSS Personalizado para efectos y dimensiones.
- **APIs & Recursos**:
  - [TheMealDB](https://www.themealdb.com/api.php) (Motor de datos)
  - [FlagCDN](https://flagcdn.com/) (Banderas del mundo)
  - JavaScript nativo para manipulación del DOM y lógica de filtrado.

---

## 📖 Historias de Usuario (Ampliadas)

| Historia   | Objetivo                                                | Estado |
| :--------- | :------------------------------------------------------ | :----- |
| **HU-04**  | Búsqueda funcional por ingrediente base.                | ✅     |
| **HU-05**  | Renderizado dinámico de tarjetas sin recarga de página. | ✅     |
| **HU-06**  | Manejo de estados vacíos y errores.                     | ✅     |
| **PRO-00** | NavBar con historial de busquedas por ingredientes.     | ✅     |
|            |                                                         |         |
| **PRO-01** | Renderizado de receta completa en modal dinamico.       | ✅     |
| **PRO-02** | Feedback visual avanzado (Skeletons/Spinners).          | ✅     |
| **PRO-03** | Identidad visual dinamica (Banderas, Emojis, etc).      | ✅     |
| **PRO-04** | Búsqueda por Origen y Categoría con cambio de modo.     | ✅     |
| **PRO-05** | NavBar con historial de busquedas dinamico por modo.    | ✅     |
| **PRO-06** | Persistencia de historial por modo en LocalStorage.     | ✅     |

---

## 📁 Estructura del Repositorio

```
EF_M4-API_gourmet_go/
├── index.html          # Interfaz principal (Modos de búsqueda + Contenedor)
├── README.md           # Documentación del proyecto
├── assets/
│   ├── css/
│   │   └── styles.css  # Refinamiento estético y Skeletons
│   ├── js/
│   │   └── main.js    # Lógica de negocio, LocalStorage y API Fetch
```

---

## 👨‍💻 Autor

**Gourmet GO!** es el resultado de mi pasion por la cocina 👨‍🍳 y la tecnologia 🧑‍💻,
sumado a el deseo de crear una herramienta realmente útil para los usuarios 🫶.
con el conocimiento adquirido en el curso de **JavaScript Avanzado**.

**[GitHub - Cuackzoide](https://github.com/Cuackzoide)**
**[LinkedIn - Oliver Barra](https://linkedin.com/in/oliver-barra-cuackzoide/)**

---

⭐ Si encuentras útil este proyecto o te gusta su implementación, ¡considera darle una estrella en GitHub!
