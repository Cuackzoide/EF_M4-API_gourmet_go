# 🍽️ Gourmet GO! - Buscador de Recetas

## 📋 Descripción

Proyecto integrador del **Módulo 4: JavaScript Avanzado** - Sprint 2. Una aplicación web funcional que permite buscar recetas por ingrediente utilizando la API de TheMealDB. Transforma una maqueta estática en una experiencia interactiva con llamadas asíncronas y renderizado dinámico.

## ✨ Características

- 🔍 **Búsqueda por ingrediente**: Encuentra recetas basadas en un ingrediente específico
- ⚡ **Renderizado dinámico**: Resultados actualizados sin recargar la página
- 🚫 **Manejo de errores**: Mensajes informativos cuando no hay resultados
- 📱 **Responsive**: Diseño adaptativo con Bootstrap 5

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework CSS**: Bootstrap 5.3.8
- **API**: [TheMealDB](https://www.themealdb.com/api.php)
- **Herramientas**: Fetch API, Async/Await, Template Literals, Destructuring

## 🚀 Instalación y Uso

### Prerrequisitos

- Navegador web moderno
- Conexión a internet (para las llamadas a la API)

### Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/EF_M4-API_gourmet_go.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd EF_M4-API_gourmet_go
   ```

3. Abre `index.html` en tu navegador preferido.

### Uso

1. Ingresa un ingrediente en la barra de búsqueda (ej: "chicken", "beef", "tomato")
2. Presiona el botón "Buscar" o la tecla Enter
3. Explora las recetas que aparecen en la galería

## 📚 API de TheMealDB

### Endpoints utilizados:

- **Lista de ingredientes**: `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
- **Búsqueda por ingrediente**: `https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}`

### Estructura de respuesta:

```json
{
  "meals": [
    {
      "idMeal": "52772",
      "strMeal": "Teriyaki Chicken Casserole",
      "strDrinkAlternate": null,
      "strCategory": "Chicken",
      "strArea": "Japanese",
      "strInstructions": "...",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
      "strTags": "Meat,Casserole",
      "strYoutube": "https://www.youtube.com/watch?v=4aZr5hZXP_s"
      // ... más propiedades
    }
  ]
}
```

## 📖 Historias de Usuario

### HU-04: Búsqueda Funcional de Recetas

**Como usuario**, quiero poder escribir un ingrediente en la barra de búsqueda y presionar "Buscar", para obtener una lista de recetas que contengan ese ingrediente.

**Criterios de Aceptación:**

- ✅ Prevención del comportamiento por defecto del formulario
- ✅ Captura del texto del input
- ✅ Llamada asíncrona a la API usando `fetch` con `async/await`
- ✅ Endpoint: `https://www.themealdb.com/api/json/v1/1/filter.php?i=[ingrediente]`

### HU-05: Renderizado Dinámico de Resultados

**Como usuario**, quiero que los resultados de mi búsqueda aparezcan en la galería sin que la página se recargue.

**Criterios de Aceptación:**

- ✅ Eliminación de tarjetas hard-codeadas del HTML
- ✅ Generación dinámica de tarjetas usando template literals
- ✅ Uso de desestructuración para extraer datos
- ✅ Limpieza del contenedor antes de nuevas búsquedas

### HU-06: Manejo de Búsquedas sin Resultados

**Como usuario**, quiero recibir un mensaje claro si mi búsqueda no encuentra ninguna receta.

**Criterios de Aceptación:**

- ✅ Mensaje informativo cuando `meals` es `null`

## ⚙️ Requisitos Técnicos

- **Archivo principal**: `assets/js/main.js`
- **Sintaxis**: ES6+ obligatoria (`let/const`, arrow functions, template literals, destructuring)
- **Asincronía**: `fetch` + `async/await`
- **DOM**: Manipulación nativa del DOM
- **Buenas prácticas**: Programación Orientada a Objetos recomendada (clase `Receta`)

## 📁 Estructura del Proyecto

EF_M4-API_gourmet_go/
├── index.html # Página principal
├── README.md # Este archivo
├── assets/
│ ├── css/
│ │ └── styles.css # Estilos personalizados
│ ├── img/ # Imágenes del proyecto
│ └── js/
│ └── main.js # Lógica JavaScript

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras un bug o tienes una mejora:

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte de un curso educativo y está disponible bajo la Licencia MIT.

## 👨‍💻 Autor

Proyecto desarrollado como parte del curso de JavaScript Avanzado.

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
