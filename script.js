let searchBtn = document.getElementById('searchbtn');
let mealsList = document.getElementById('meals');
let mealinfo=document.querySelector('.meal-info-content');
let closeBtn=document.getElementById('closeBtn');

searchBtn.addEventListener('click',getMealList);
mealsList.addEventListener('click',getRecipe);
closeBtn.addEventListener('click',()=>{
    mealinfo.parentElement.classList.remove('showMe')
})
    
async function getMealList(){
    let searchValue = document.getElementById('search-content').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then(response => response.json())
    .then(data =>{
        let html = '';
        if(data.meals){
            data.meals.forEach((recipe) => {
                html += `
                <div class="meals-item" data-id="${recipe.idMeal}">
                    <div class="meal-img">
                        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                    </div>
                    <div class="meal-details">
                        <h3>${recipe.strMeal}</h3>
                        <a href="#" class="mealbtn btn" target="_blank">Get Recipe</a>
                    </div>
                </div>
                `;
            });
        }
        else{
            html = "Sorry, We didn't find any meal!";
            
        }
        mealsList.innerHTML = html;  
        
    });
}
function getRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('mealbtn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipe(data.meals))
    }
}
function mealRecipe(meal){
    console.log(meal)
    meal=meal[0];
    let html =`  
            <h3>${meal.strMeal}</h3>
            <p class="cate">${meal.strCategory}</p>
            <p class="intr">Instructions:</p>
            <p>${meal.strInstructions}</p>
            <img src="${meal.strMealThumb}">
            <a href=${meal.strYoutube} id="watchbtn" class="btn" target="_blank">Watch Video</a>
       
    `;
    mealinfo.innerHTML=html;
    mealinfo.parentElement.classList.add('showMe')
}