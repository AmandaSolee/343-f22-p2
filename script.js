const queryInputElem = document.getElementById('query');
const resultsElem = document.getElementById("results");
const form = document.getElementById('form');

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
})

queryInputElem.addEventListener('keyup', async function(ev) {
    ev.preventDefault();
    if (ev.key == 'Enter') {
      const searchResults = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${queryInputElem.value}`);
      const searchResultsJson = await searchResults.json();

      for (let i = 0; i < 10; i++) {
        let drinkElem = await createDrinkElem(searchResultsJson.drinks[i]);
        resultsElem.append(drinkElem);
      }
    }
});

async function createDrinkElem(drink) {
  let drinkElem = document.createElement('div');
  let instructions = document.createElement('h3');
  let drinkName = document.createElement('h2');
  let ingredientList = document.createElement('ol');
  let ingredient1 = document.createElement('li');
  let ingredient2 = document.createElement('li');
  let ingredient3 = document.createElement('li');
  let ingredient4 = document.createElement('li');
  let ingredient5 = document.createElement('li');
  let recipe = document.createElement('div')

  drinkElem.classList.add('result');
  drinkElem.appendChild(instructions);
  drinkElem.appendChild(drinkName);
  drinkElem.appendChild(ingredientList);
  drinkElem.appendChild(recipe);

  instructions.append('Click on ingredient to view nutrition facts');
  drinkName.append(drink.strDrink);
  ingredient1.append(drink.strIngredient1);
  ingredient2.append(drink.strIngredient2);
  ingredient3.append(drink.strIngredient3);
  ingredient4.append(drink.strIngredient4);
  ingredient5.append(drink.strIngredient5);
  recipe.append(drink.strInstructions);

  ingredientList.appendChild(ingredient1);
  ingredientList.appendChild(ingredient2);
  ingredientList.appendChild(ingredient3);
  ingredientList.appendChild(ingredient4);
  ingredientList.appendChild(ingredient5);

  createIngredientFacts(drink, ingredient1, drink.strIngredient1);
  createIngredientFacts(drink, ingredient2, drink.strIngredient2);
  createIngredientFacts(drink, ingredient3, drink.strIngredient3);
  createIngredientFacts(drink, ingredient4, drink.strIngredient4);
  createIngredientFacts(drink, ingredient5, drink.strIngredient5);

  return drinkElem;
}

async function createIngredientFacts(drink, ingredient, query) {
    ingredient.addEventListener('click', async function(ev) {
    ev.preventDefault();
    const searchResults = await fetch( `https://api.api-ninjas.com/v1/nutrition?query=${query}`, {
      headers: { 'X-Api-Key': 'Rg1XBHQzobg1UdIvggDOdg==qariUu4zTlLnqmBN'},
      contentType: 'application/json'
    });
    const searchResultsJson = await searchResults.json();

    let facts = document.createElement('ul');
    let serving = document.createElement('li');
    let calories = document.createElement('li');
    let carbs = document.createElement('li');
    let fat = document.createElement('li');
    let protein = document.createElement('li');
    let sugar = document.createElement('li');

    facts.appendChild(serving);
    facts.appendChild(calories);
    facts.appendChild(carbs);
    facts.appendChild(fat);
    facts.appendChild(protein);
    facts.appendChild(sugar);
    
    serving.append(`Serving size: ${searchResultsJson[0].serving_size_g} grams`);
    calories.append(`Calories: ${searchResultsJson[0].calories}`);
    carbs.append(`Carbohydrates: ${searchResultsJson[0].carbohydrates_total_g} grams`);
    fat.append(`Fats: ${searchResultsJson[0].fat_total_g} grams`);
    protein.append(`Protein: ${searchResultsJson[0].protein_g} grams`);
    sugar.append(`Sugar: ${searchResultsJson[0].sugar_g} grams`);

    ingredient.appendChild(facts);
  });
}
