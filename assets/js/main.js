// Función para remover acentos (más util en español)
function removeAccents(str) {
  const accents = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    Á: "A",
    É: "E",
    Í: "I",
    Ó: "O",
    Ú: "U",
    ñ: "n",
    Ñ: "N",
    ö: "o",
    Ö: "Ö",
    ü: "u",
    Ü: "U",
  };
  return str
    .split("")
    .map((char) => accents[char] || char)
    .join("");
}
// Funcion reutilizable para formatear strings
function formatter(string) {
  const strValue = string.toLowerCase().trim();
  return removeAccents(strValue);
}
// Funcion para formatear instrucciones
function splitInstructions(instructions) {
  if (!instructions) return "";
  return instructions
    .split(/\r?\n/)
    .filter((step) => step.trim() !== "")
    .map((step) => `<li>${step.trim()}</li>`)
    .join("");
}
// Funcion para buscar bandera de pais 
function CountryFlag(country, size = 40) {
  const flagsMapping = {
    Algerian: "dz",
    American: "us",
    Argentinian: "ar",
    Australian: "au",
    British: "gb",
    Canadian: "ca",
    Chinese: "cn",
    Croatian: "hr",
    Dutch: "nl",
    Egyptian: "eg",
    Filipino: "ph",
    French: "fr",
    Greek: "gr",
    Indian: "in",
    Irish: "ie",
    Italian: "it",
    Jamaican: "jm",
    Japanese: "jp",
    Kenyan: "ke",
    Malaysian: "my",
    Mexican: "mx",
    Moroccan: "ma",
    Norwegian: "no",
    Polish: "pl",
    Portuguese: "pt",
    Russian: "ru",
    "Saudi Arabian": "sa",
    Slovakian: "sk",
    Spanish: "es",
    Syrian: "sy",
    Thai: "th",
    Tunisian: "tn",
    Turkish: "tr",
    Ukrainian: "ua",
    Uruguayan: "uy",
    Venezulan: "ve",
    Vietnamese: "vn",
  };

  const code = flagsMapping[country];
  return code ? `https://flagcdn.com/w${size}/${code}.png` : "🏁";
}

// Funcion para buscar emoji de categoria
function CategoryEmoji(category) {
  switch (category) {
    case "Beef":
      return "🥩";
    case "Chicken":
      return "🍗";
    case "Dessert":
      return "🍰";
    case "Lamb":
      return "🍖";
    case "Miscellaneous":
      return "🍱";
    case "Pasta":
      return "🍝";
    case "Pork":
      return "🐖";
    case "Seafood":
      return "🐟";
    case "Side":
      return "🥗";
    case "Starter":
      return "🥣";
    case "Vegan":
      return "🌱";
    case "Vegetarian":
      return "🥦";
    case "Breakfast":
      return "🍳";
      return "🐐";
    default:
      return "🍽️";
  }
}

// Funcion para buscar icono de ingrediente (Híbrido: Emoji + Imagen API)
function IngredientIcon(ingredient) {
  const commonIngredients = {
    Onion: "🧅",
    Garlic: "🧄",
    Chicken: "🍗",
    Beef: "🥩",
    Tomato: "🍅",
    Potato: "🥔",
    Egg: "🥚",
    Milk: "🥛",
    Butter: "🧈",
    Salt: "🧂",
    Pepper: "🌶️",
    Sugar: "🍯",
    Flour: "🌾",
    Rice: "🍚",
    Bread: "🍞",
    Cheese: "🧀",
    Carrot: "🥕",
    Apple: "🍎",
    Lemon: "🍋",
    Lime: "🍈",
    Banana: "🍌",
    Strawberry: "🍓",
    Spinach: "🍃",
    Broccoli: "🥦",
    Mushroom: "🍄",
    Ginger: "🫚",
    Salmon: "🐟",
    Tuna: "🍣",
    Oil: "💧",
    Water: "💧",
  };

  // Normalizamos el nombre para búsqueda en el diccionario (Capitalizado)
  const capitalized = ingredient.charAt(0).toUpperCase() + ingredient.slice(1).toLowerCase();
  const emoji = commonIngredients[capitalized];

  if (emoji) {
    return `<span class="tab-icon">${emoji}</span>`;
  }

  // Fallback: Imagen de la API (Small) para mayor cobertura
  return `<img src="https://www.themealdb.com/images/ingredients/${capitalized}-Small.png" 
          alt="${ingredient}" class="tab-icon-img" loading="lazy">`;
}
// Estructura oficial de historial por categorías
const defaultHistory = {
  ingredients: ["onion", "chicken", "garlic", "beef", "tomato", "potatoes"],
  areas: ["American", "British", "Canadian", "Chinese", "French", "Greek"],
  categories: ["Beef", "Chicken", "Dessert", "Lamb", "Pasta", "Pork"],
};

// Cargar historial desde LocalStorage o usar valores por defecto
let searchHistory = JSON.parse(localStorage.getItem("gourmetGoHistory")) || defaultHistory;
let activeMode = "ingredients"; // Modo de búsqueda activo por defecto

// Función para guardar historial en LocalStorage
function saveHistory() {
  localStorage.setItem("gourmetGoHistory", JSON.stringify(searchHistory));
}

// Función para mostrar esqueletos de carga (Skeleton)
function renderSkeleton(elementHTML) {
  elementHTML.innerHTML = "";
  // Generamos 6 tarjetas de precarga
  for (let i = 0; i < 6; i++) {
    elementHTML.innerHTML += /* html */ `
      <div class="col">
        <div class="card bg-warning-subtle h-100" aria-hidden="true">
          <div class="placeholder-glow">
            <div class="placeholder col-12 rounded" style="height: 14.5rem;"></div>
          </div>
          <div class="card-body">
            <h5 class="card-title placeholder-glow">
              <span class="placeholder col-10 rounded-pill"></span>
            </h5>
            <!-- <p class="card-text placeholder-glow">
              <span class="placeholder col-6 rounded-pill"></span>
            </p> -->
            <a tabindex="-1" class="btn btn-warning col-12 disabled placeholder rounded mt-auto">Loading...</a>
          </div>
        </div>
      </div>`;
  }
}

// Función para mostrar un spinner (ideal para modales o cargas rápidas)
function renderSpinner(elementHTML) {
  elementHTML.innerHTML = /* html */ `
    <div class="d-flex justify-content-center align-items-center w-100 my-5 py-5">
      <div class="spinner-border text-warning-subtle" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>`;
}

// Función para actualizar el historial con nuevas busquedas según el modo activo
function updateHistory(string) {
  const currentArray = searchHistory[activeMode];
  if (currentArray.includes(string)) {
    let position = currentArray.indexOf(string);
    currentArray.splice(position, 1);
  }
  currentArray.unshift(string);
  if (currentArray.length > 6) {
    currentArray.pop();
  }
  saveHistory();
}

// Funcion para renderizar las recetas
function showRecipes(recipesArray, elementHTML) {
  elementHTML.innerHTML = "";
  if (!recipesArray || recipesArray.length === 0) {
    elementHTML.innerHTML = /* html */ `<p class="text-center w-100 lead">No recipes found.</p>`;
    return;
  }
  recipesArray.forEach((product) => {
    elementHTML.innerHTML += /* html */ `
    <article class="col">
      <div class="card bg-warning-subtle h-100">
        <img
          src="${product.strMealThumb}"
          class="card-img-top img-fit rounded"
          alt="${product.strMeal}"
          loading="lazy"
        />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title pb-2">${product.strMeal}</h5>
          <button type="button" 
          class="btn btn-warning text-secondary fw-semibold mt-auto recipe-btn" 
          data-bs-toggle="modal" 
          data-bs-target="#recipeModal" 
          data-id="${product.idMeal}">
            GO to Recipe
          </button>
          </div>
          </div>
          </article>`;
  });
}

// Funcion para renderizar las pestañas de categorías (historial)
function showTabs(categoriesArray, TabsBar) {
  TabsBar.innerHTML = "";
  categoriesArray.forEach((item) => {
    let displayContent = item;
    
    // Condicional para agregar banderas o emojis según el modo
    if (activeMode === "areas") {
      displayContent = `<img src="${CountryFlag(item, 20)}" alt="${item}" class="me-1"> ${item}`;
    } else if (activeMode === "categories") {
      displayContent = `${CategoryEmoji(item)} ${item}`;
    } else if (activeMode === "ingredients") {
      displayContent = `${IngredientIcon(item)} ${item}`;
    }

    TabsBar.innerHTML += /* html */ `
    <li class="nav-item" role="presentation">
      <a class="nav-link text-black" href="#" data-target="${item}">
        ${displayContent}
      </a>
    </li>`;
  });
}

// Funcion para renderizar una receta completa
function fullRecipe(recipe, elementHTML) {
  elementHTML.innerHTML = "";
  if (!recipe || recipe.length === 0) {
    elementHTML.innerHTML = /* html */ `<p class="text-center w-100 lead">No recipes found.</p>`;
    return;
  }
  // accion intermedia para obtener los ingredientes
  let ingredientsHTML = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe["strIngredient" + i];
    const measure = recipe["strMeasure" + i];
    if (ingredient && ingredient.trim() !== "") {
      ingredientsHTML += /* html */ `<li>${ingredient} - ${measure}</li>`;
    }
  }
  // renderizado de la receta completa
  elementHTML.innerHTML += /* html */ `
      <div class="modal-header bg-warning text-center">
        <h1 class="modal-title fs-5" id="recipeModalLabel">
        ${recipe.strMeal}
        </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="img-thumbnail mb-3">
        <div class="border rounded bg-warning-subtle p-2 mb-2">
        <h2>Ingredients</h2>
        <ul>
          ${ingredientsHTML}
        </ul>
        </div>
        <div class="border rounded bg-warning-subtle p-2 mb-2">
        <h2>Instructions</h2>
        <ul class="list-unstyled">${splitInstructions(recipe.strInstructions)}</ul>
        </div>
      </div>
      <div class="modal-footer bg-warning-subtle">
      <button class="btn btn-warning text-dark" id="area-btn" data-target="${recipe.strArea}">
      <img src="${CountryFlag(recipe.strArea, 20)}" alt="${recipe.strArea}">
      ${recipe.strArea}
      </button>
      <button class="btn btn-warning text-dark" id="category-btn" data-target="${recipe.strCategory}">
      ${CategoryEmoji(recipe.strCategory)}
      ${recipe.strCategory}
      </button>
      ${recipe.strYoutube ? 
        `<a class="btn btn-warning text-dark" href="${recipe.strYoutube}" target="_blank">🎦 On video</a>` : 
        ""}
        <button type="button" class="btn btn-warning text-dark" data-bs-dismiss="modal">Close</button>
      </div>`;
}

// Función para buscar ingredientes válidos desde la API
async function searchIngredient() {
  const url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
  try {
    const response = await fetch(url);
    const { meals } = await response.json();
    return meals.map((ingredient) => ingredient.strIngredient);
  } catch (error) {
    console.error("Error retrieving ingredients:", error);
    return [];
  }
}

// Función para buscar todas las áreas (países) desde la API
async function searchAreas() {
  const url = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
  try {
    const response = await fetch(url);
    const { meals } = await response.json();
    return meals.map((area) => area.strArea);
  } catch (error) {
    console.error("Error retrieving areas:", error);
    return [];
  }
}

// Función para buscar todas las categorías desde la API
async function searchCategories() {
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
  try {
    const response = await fetch(url);
    const { categories } = await response.json();
    return categories.map((cat) => cat.strCategory);
  } catch (error) {
    console.error("Error retrieving categories:", error);
    return [];
  }
}

// Función para buscar recetas por ingrediente desde la API
async function searchMeals(ingredient) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  try {
    const response = await fetch(url);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Función para buscar recetas por área (país) desde la API
async function searchMealsByArea(area) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  try {
    const response = await fetch(url);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.error("Error retrieving meals by area:", error);
    return [];
  }
}

// Función para buscar recetas por categoría desde la API
async function searchMealsByCategory(category) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  try {
    const response = await fetch(url);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.error("Error retrieving meals by category:", error);
    return [];
  }
}

// Funcion para buscar una receta por id desde la API
async function searchRecipeById(id) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  try {
    const response = await fetch(url);
    const recipe = await response.json();
    return recipe;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Selección de elementos del DOM
const searchForm = document.querySelector('form[role="search"]');
const searchInput = document.getElementById("searchInput");
const recipeContainer = document.querySelector("#recipe-container");
const navTabs = document.querySelector(".nav-tabs");
const navBrand = document.querySelector(".navbar-brand");
const modalContent = document.querySelector("#modal-content");
const modalElement = document.getElementById("recipeModal");
const modal = new bootstrap.Modal(modalElement);

// Manejo del envío de la busqueda
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchTerm = formatter(searchInput.value);
  if (!searchTerm) return;

  renderSkeleton(recipeContainer);
  
  let recipes = [];
  let isValid = false;

  // Lógica de búsqueda según el modo activo
  let matchedItem = "";

  if (activeMode === "ingredients") {
    const list = await searchIngredient();
    matchedItem = list.find(item => formatter(item) === searchTerm);
    if (matchedItem) {
      isValid = true;
      recipes = await searchMeals(searchTerm);
    }
  } else if (activeMode === "areas") {
    const list = await searchAreas();
    matchedItem = list.find(item => formatter(item) === searchTerm);
    if (matchedItem) {
      isValid = true;
      recipes = await searchMealsByArea(searchTerm);
    }
  } else if (activeMode === "categories") {
    const list = await searchCategories();
    matchedItem = list.find(item => formatter(item) === searchTerm);
    if (matchedItem) {
      isValid = true;
      recipes = await searchMealsByCategory(searchTerm);
    }
  }

  if (isValid && recipes.length > 0) {
    showRecipes(recipes, recipeContainer);
    // Guardamos el nombre original (con mayúsculas) en el historial
    updateHistory(matchedItem);
    showTabs(searchHistory[activeMode], navTabs);
    const links = document.querySelectorAll(".nav-link");
    links.forEach((el) => el.classList.remove("active"));
    if (links[0]) links[0].classList.add("active");
  } else {
    recipeContainer.innerHTML = /* html */ `<p class="text-center w-100 lead">No results for "${searchTerm}" in ${activeMode}.</p>`;
  }
  searchInput.value = "";
  searchInput.focus();
});

// Manejo del cambio de modo (Ingredient, Area, Category)
document.querySelectorAll('input[name="searchMode"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    activeMode = e.target.value;
    
    // Actualizar placeholder del input
    const placeholders = {
      ingredients: "Search by ingredient (e.g. Chicken)",
      areas: "Search by origin (e.g. Mexican)",
      categories: "Search by category (e.g. Seafood)"
    };
    searchInput.placeholder = placeholders[activeMode];
    
    // Actualizar historial visualmente
    showTabs(searchHistory[activeMode], navTabs);
    const links = document.querySelectorAll(".nav-link");
    links.forEach((el) => el.classList.remove("active"));
    if (links[0]) links[0].classList.add("active");
  });
});

// Manejo del clic en las pestañas de navegación (historial)
navTabs.addEventListener("click", async (e) => {
  e.preventDefault();
  const link = e.target.closest(".nav-link");
  if (!link) return;

  renderSkeleton(recipeContainer);
  const links = document.querySelectorAll(".nav-link");
  links.forEach((el) => el.classList.remove("active"));
  link.classList.add("active");

  const target = link.dataset.target;
  let recipes = [];

  if (activeMode === "ingredients") recipes = await searchMeals(target);
  else if (activeMode === "areas") recipes = await searchMealsByArea(target);
  else if (activeMode === "categories") recipes = await searchMealsByCategory(target);

  showRecipes(recipes, recipeContainer);
});

// Manejo del clic en la "Brand" de la barra de navegación
navBrand.addEventListener("click", async (e) => {
  e.preventDefault();
  showTabs(searchHistory[activeMode], navTabs);
  
  let recipes = [];
  const initial = searchHistory[activeMode][0];
  if (activeMode === "ingredients") recipes = await searchMeals(initial);
  else if (activeMode === "areas") recipes = await searchMealsByArea(initial);
  else if (activeMode === "categories") recipes = await searchMealsByCategory(initial);

  showRecipes(recipes, recipeContainer);
  const links = document.querySelectorAll(".nav-link");
  links.forEach((el) => el.classList.remove("active"));
  if (links[0]) links[0].classList.add("active");
});

// Manejo del clic en el botón de la receta
// Seleccionamos recipeContainer para usar event delegation
recipeContainer.addEventListener("click", async (e) => {
  e.preventDefault();
  const recipeBtn = e.target.closest(".recipe-btn");
  if (!recipeBtn) return;
  // Limpiamos y mostramos spinner en el contenido del modal
  renderSpinner(modalContent);
  modal.show();
  const recipeId = recipeBtn.dataset.id;
  const recipe = await searchRecipeById(recipeId);
  fullRecipe(recipe.meals[0], modalContent);
});

// Busqueda por pais o categoria (modal)
modalContent.addEventListener("click", async (e) => {
  const areaBtn = e.target.closest("#area-btn");
  const categoryBtn = e.target.closest("#category-btn");
  if (!areaBtn && !categoryBtn) return;
  e.preventDefault(); // solo bloquea clicks de area category btn

  modal.hide();
  renderSkeleton(recipeContainer);

  let recipes = [];
  let searchedItem = "";

  if (areaBtn) {
    searchedItem = areaBtn.dataset.target;
    activeMode = "areas";
    document.getElementById("modeAreas").checked = true;
    recipes = await searchMealsByArea(searchedItem);
  } else if (categoryBtn) {
    searchedItem = categoryBtn.dataset.target;
    activeMode = "categories";
    document.getElementById("modeCategories").checked = true;
    recipes = await searchMealsByCategory(searchedItem);
  }

  showRecipes(recipes, recipeContainer);
  updateHistory(searchedItem);

  // Sincronizar placeholder
  const placeholders = {
    ingredients: "Search by ingredient (e.g. Chicken)",
    areas: "Search by origin (e.g. Mexican)",
    categories: "Search by category (e.g. Seafood)"
  };
  searchInput.placeholder = placeholders[activeMode];
  showTabs(searchHistory[activeMode], navTabs);
  const links = document.querySelectorAll(".nav-link");
  links.forEach((el) => el.classList.remove("active"));
  if (links[0]) links[0].classList.add("active");
});

// Carga inicial de la página
document.addEventListener("DOMContentLoaded", async (e) => {
  showTabs(searchHistory[activeMode], navTabs);
  renderSkeleton(recipeContainer);
  
  let initialRecipes = [];
  const initial = searchHistory[activeMode][0];
  if (activeMode === "ingredients") initialRecipes = await searchMeals(initial);
  else if (activeMode === "areas") initialRecipes = await searchMealsByArea(initial);
  else if (activeMode === "categories") initialRecipes = await searchMealsByCategory(initial);

  showRecipes(initialRecipes, recipeContainer);
  const links = document.querySelectorAll(".nav-link");
  links.forEach((el) => el.classList.remove("active"));
  if (links[0]) links[0].classList.add("active");
});
