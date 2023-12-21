/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let game of games){
        
        let game_info = document.createElement('div')
        game_info.classList.add('game-card')
        game_info.innerHTML = `<img class ="game-img" src=${game["img"]}> <br> <p> Name:${game.name}, Goal:${game.goal}</p>`
        gamesContainer.appendChild(game_info)
    }

        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

// addGamesToPage(GAMES_JSON)

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

contributionsCard.innerHTML = `${GAMES_JSON.reduce((acc,game) =>{
return acc+game["backers"]
},0).toLocaleString('en-US')}`


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal

raisedCard.innerHTML = `$${GAMES_JSON.reduce((sum, game) =>{return sum+game["pledged"]},0)}`
// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerText= GAMES_JSON.length
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal

    let unfundedGames = GAMES_JSON.filter((game) => {
        return (game['pledged'] < game['goal'])
    })

    console.log(unfundedGames.length)

    addGamesToPage(unfundedGames)

    // use the function we previously created to add the unfunded games to the DOM

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter((game) => {
        return (game['pledged'] >= game['goal'])
    })

    console.log(fundedGames.length)
    addGamesToPage(fundedGames)
    

    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)

}

showAllGames() //Default it will show all the games  
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

allBtn.addEventListener("click", showAllGames)
fundedBtn.addEventListener("click",filterFundedOnly)
unfundedBtn.addEventListener("click", filterUnfundedOnly)


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let numberOfUnfundedGames = GAMES_JSON.filter((game) => {
    return (game['pledged'] < game['goal'])
}).length
console.log(numberOfUnfundedGames);
let totalMoneyRaised = GAMES_JSON.reduce((money,game) =>{
    return money+game["pledged"]},0).toLocaleString('en-US')
// create a string that explains the number of unfunded games using the ternary operator
 let fundingInfo = `We have currently obtained funding of $${totalMoneyRaised} for ${GAMES_JSON.length} ${GAMES_JSON.length >1 ? ' games.' : ' game.'}  Currently ${numberOfUnfundedGames>0 ? numberOfUnfundedGames>1 ? (numberOfUnfundedGames + ' games'): (numberOfUnfundedGames + ' game'  ): 'no games'} remain unfunded. ${numberOfUnfundedGames>0 ? ' We need your help in funding.' : ''}` 

// create a new DOM element containing the template string and append it to the description container
let new_para =document.createElement('p')
new_para.innerHTML = fundingInfo

descriptionContainer.appendChild(new_para)
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

let [first, second, ...others] = sortedGames


// create a new element to hold the name of the top pledge game, then append it to the correct element

let first_game = document.createElement('p')
first_game.innerHTML = first.name

let second_game = document.createElement("p")
second_game.innerHTML= second.name

firstGameContainer.appendChild(first_game)
secondGameContainer.appendChild(second_game)

// do the same for the runner up item