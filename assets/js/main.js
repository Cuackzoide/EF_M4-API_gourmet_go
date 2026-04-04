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
    .filter(step => step.trim() !== "")
    .map(step => `<li>${step.trim()}</li>`)
    .join("");
}

// Array de ingredientes buscados, con valores por defecto para inicio rapido
let searchHistory = [
  "onion",
  "chicken",
  "garlic",
  "beef",
  "tomato",
  "potatoes",
];
// Función para actualizar el historial con nuevas busquedas
function updateHistory(string) {
  if (searchHistory.includes(string)) {
    let position = searchHistory.indexOf(string);
    searchHistory.splice(position, 1);
  }
  searchHistory.unshift(string);
  if (searchHistory.length > 6) {
    searchHistory.pop();
  }
}
// Funcion para renderizar las recetas
function showRecipes(recipesArray, elementHTML) {
  elementHTML.innerHTML = "";
  if (!recipesArray || recipesArray.length === 0) {
    elementHTML.innerHTML = `<p class="text-center w-100 lead">No recipes found.</p>`;
    return;
  }
  recipesArray.forEach((product) => {
    elementHTML.innerHTML += `<article class="col">
        <div class="card h-100">
        <img
    src="${product.strMealThumb}"
    class="card-img-top img-fit"
          alt="${product.strMeal}"
          loading="lazy"
          />
          <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.strMeal}</h5>
          <p class="card-text">${product.idMeal}</p>
          <button type="button" class="btn btn-primary recipe-btn" data-bs-toggle="modal" data-bs-target="#recipeModal" data-id="${product.idMeal}">
            GO to Recipe
          </button>
          </div>
          </div>
          </article>`;
  });
}
// Funcion para renderizar las pestañas de categorías
function showTabs(categoriesArray, TabsBar) {
  TabsBar.innerHTML = "";
  categoriesArray.forEach((category) => {
    TabsBar.innerHTML += `
    <li class="nav-item"
    role="presentation">
    <a class="nav-link" 
    href="#" 
    data-target="${category}">
    ${category}</a>
    </li>`;
  });
}

// Funcion para renderizar una receta completa
function fullRecipe(recipe, elementHTML) {
  elementHTML.innerHTML = "";
  if (!recipe || recipe.length === 0) {
    elementHTML.innerHTML = `<p class="text-center w-100 lead">No recipes found.</p>`;
    return;
  }
  let ingredientsHTML = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe["strIngredient" + i];
    const measure = recipe["strMeasure" + i];
    if (ingredient && ingredient.trim() !== "") {
      ingredientsHTML += `<li>${ingredient} - ${measure}</li>`;
    }
  }

  elementHTML.innerHTML += `
      <div class="modal-header">
        <h1 class="modal-title text-center fs-5" id="recipeModalLabel">
        ${recipe.strMeal}
        </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="img-thumbnail mb-3">
        <div class="border rounded p-2 mb-2">
        <h2>Ingredients</h2>
        <ul>
          ${ingredientsHTML}
        </ul>
        </div>
        <div class="border rounded p-2 mb-2">
        <h2>Instructions</h2>
        <ul class="list-unstyled">${splitInstructions(recipe.strInstructions)}</ul>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
  const ingredientList = await searchIngredient();
  const match = ingredientList.some(
    (ingredient) => formatter(ingredient) === searchTerm
  );
  if (match) {
    const recipes = await searchMeals(searchTerm);
    showRecipes(recipes, recipeContainer);
    updateHistory(searchTerm);
    showTabs(searchHistory, navTabs);
    const links = document.querySelectorAll(".nav-link");
    links.forEach((el) => el.classList.remove("active"));
    links[0].classList.add("active"); // siempre queda en primera pestaña
  } else {
    recipeContainer.innerHTML = `<p class="text-center w-100 lead">There are no recipes for "${searchTerm}" or It's not a valid search.</p>`;
    const links = document.querySelectorAll(".nav-link");
    links.forEach((el) => el.classList.remove("active"));
  }
  searchInput.value = "";
  searchInput.focus();
});

// Manejo del clic en las pestañas de navegación
navTabs.addEventListener("click", async (e) => {
  e.preventDefault();
  const link = e.target.closest(".nav-link"); //evita errores al presionar
  if (!link) return;
  const links = document.querySelectorAll(".nav-link");
  links.forEach((el) => el.classList.remove("active"));
  link.classList.add("active");
  const ingredient = e.target.textContent.trim();
  const recipes = await searchMeals(ingredient);
  showRecipes(recipes, recipeContainer);
});

// Manejo del clic en la "Brand" de la barra de navegación
navBrand.addEventListener("click", async (e) => {
  e.preventDefault();
  showTabs(searchHistory, navTabs);
  showRecipes(await searchMeals(searchHistory[0]), recipeContainer);
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
  const recipeId = recipeBtn.dataset.id;
  const recipe = await searchRecipeById(recipeId);
  fullRecipe(recipe.meals[0], modalContent);
  modal.show();
});

// Carga inicial de la página
document.addEventListener("DOMContentLoaded", async (e) => {
  showTabs(searchHistory, navTabs);
  showRecipes(await searchMeals(searchHistory[0]), recipeContainer);
  const links = document.querySelectorAll(".nav-link");
  links.forEach((el) => el.classList.remove("active"));
  if (links[0]) links[0].classList.add("active");
});
