
'use strict';

/*Assignment Goals

As a user, I would like to display three unique products by chance so that the viewers can pick a favorite.

Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.
  For each of the three images, increment its property of times it has been shown by one.
  Attach an event listener to the section of the HTML page where the images are going to be displayed.

Once the users ‘clicks’ a product, generate three new products for the user to pick from.
As a user, I would like to track the selections made by viewers so that I can determine which products to begin production on.
  In the constructor function define a property to hold the number of times a product has been clicked.

After every selection by the viewer, update the newly added property to reflect if it was clicked.

Add a form that allows the user to control the number of voting rounds. (Separate page?)
  Keep the number of rounds in a variable to allow the number to be easily changed for debugging and testing purposes.
Add a report of results after all rounds of voting have concluded so that I can evaluate which products were the most popular.
Create a property attached to the constructor function itself that keeps track of all the products that are currently being considered.

After voting rounds have been completed, remove the event listeners on the product.

Add a button with the text View Results, which when clicked displays the list of all the products followed by the votes received, and number of times seen for each. Example: banana had 3 votes, and was seen 5 times.

NOTE: Displayed product names should match the file name for the product. Example: the product represented with dog-duck.jpg should be displayed to the user as exactly “dog-duck” when the results are shown.

Stretch Goals
Handle the display and voting for an arbitrary number of images
Using a variable, declare in your JS how many images to show.
Based on that value, dynamically create that many <img> tags
Also based on that value, ensure that your randomizer is properly handling the specified number of images for display and repeat tracking.
*/


//construct object for images:
//properties 1.Name of the product 2.File path of image 3.Times the image has been shown


let productContainer = document.querySelector('section');
let voteButton = document.querySelector('section + div');

let clicks = 0;
let clickAllowed = 3; // TODO: CHANGE ME BACK TO USER DEFINED INPUT
let render = true;

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');


function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `images/${this.name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
}

let productList = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep'];
let productObjectList = [];


for (let i=0; i<productList.length; i++) {
  let product = new Product(productList[i]);
  productObjectList.push(product);
}

function getRandomProduct() {

  return Math.floor(Math.random() * productObjectList.length);
}

function renderProductList() {

  let displayProduct1 = getRandomProduct();
  let displayProduct2 = getRandomProduct();
  while(displayProduct2 === displayProduct1){
    displayProduct2 = getRandomProduct();
  }
  let displayProduct3 = getRandomProduct();
  while(displayProduct3 === displayProduct1 || displayProduct3 === displayProduct2){
    displayProduct3 = getRandomProduct();
  }

  let displayObjects = [displayProduct1,displayProduct2,displayProduct3];

  image1.src = productObjectList[displayObjects[0]].src;
  image1.alt = productObjectList[displayObjects[0]].name;
  productObjectList[displayObjects[0]].views++;
  image2.src = productObjectList[displayObjects[1]].src;
  image2.alt = productObjectList[displayObjects[1]].name;
  productObjectList[displayObjects[1]].views++;
  image3.src = productObjectList[displayObjects[2]].src;
  image3.alt = productObjectList[displayObjects[2]].name;
  productObjectList[displayObjects[2]].views++;
}

renderProductList();

function handleProductVoteClick(event) {

  if(event.target === productContainer) {

    alert('Please click a product image.');
  }
  clicks++;
  let clickedObjectName = event.target.alt;
  console.log(clickedObjectName);
  for (let i=0; i<productObjectList.length; i++) {
    if(clickedObjectName === productObjectList[i].name) {
      productObjectList[i].clicks++;
      console.log(productObjectList[i]);
      break;
    }
  }
  renderProductList();
  if (clicks === clickAllowed) {
    voteButton.className = 'clicks-allowed';
    productContainer.removeEventListener('click', handleProductVoteClick);
    voteButton.addEventListener('click', handleVoteButtonClick);
  }
}

function handleVoteButtonClick() {
  renderResults();
}

function renderResults() {

  // for each  goat in my array, generate a LI
  // ex: name had X views and was clicked on X times
  if (render) {
    for (let i = 0; i < productObjectList.length; i++) {
      let ul = document.querySelector('#results');
      let li = document.createElement('li');
      li.textContent = `${productObjectList[i].name} had ${productObjectList[i].views} views and was clicked on ${productObjectList[i].clicks} times`;
      ul.appendChild(li);
    }
    render = false;
  }
}

productContainer.addEventListener('click', handleProductVoteClick);





//chart stuff

// const myChart = new Chart(
//   document.getElementById('myChart'),
//   config
// );




/* In Class Demo Code

Goat Picker

  - I have collection of goat photos
  - user is presented the photos in 2s (2 goat photos at a time) — should be 2 different photos
  - user votes on their favorite by clicking on the photo
  - 15 match ups per round of voting (so 15 total votes)
  - at end of round display the results
  - in results I want to see
    - how many votes each goat got
    - how many times each goat photo was render


  PLAN

  Constructor — goat
    - name
    - image source
    - votes
    - views
  Global variables
    - all goat array
    - counter for the votes (number of matchups)
  method function
    render the goat image in the dom
      - can't have 2 of the same goat
    random number to use to get a goat
    display the results
  event lister
    goat clicks
      increment the vote
      triger a new set of goats



console.log('hi');

// GLOBAL VARIABLES
let myContainer = document.querySelector('section');
let myButton = document.querySelector('section + div');
let ul = document.querySelector('ul');

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');

let allGoats = [];
let clicks = 0;

let clickAllowed = 3;


// CONSTRUCTOR

function Goat(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `images/${this.name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
}

// FUNCTIONS

function getRandomGoat() {
  return Math.floor(Math.random() * allGoats.length);
}

function renderGoats() {
  let goat1 = getRandomGoat();
  let goat2 = getRandomGoat();
  console.log(goat1, goat2);
  // seriously consider using an array here
  // remember how do you know if an array includes something?
  // Google it and find out
  while (goat1 === goat2) {
    goat2 = getRandomGoat();
    console.log(goat1, goat2);
  }

  image1.src = allGoats[goat1].src;
  image1.alt = allGoats[goat1].name;
  allGoats[goat1].views++;
  image2.src = allGoats[goat2].src;
  image2.alt = allGoats[goat2].name;
  allGoats[goat2].views++;
  console.log(allGoats);
}

function handleGoatClick(event) {
  if (event.target === myContainer) {
    alert('Please click on an image');
  }
  clicks++;
  let clickedGoat = event.target.alt;
  console.log(clickedGoat);

  for (let i = 0; i< allGoats.length; i++) {
    if (clickedGoat === allGoats[i].name) {
      allGoats[i].clicks++;
      break;
    }
  }
  renderGoats();
  if (clicks === clickAllowed) {
    myButton.className = 'clicks-allowed';
    myContainer.removeEventListener('click', handleGoatClick);
    myButton.addEventListener('click', handleButtonClick);
  }
}

function handleButtonClick() {
  // if (clicks === clickAllowed) {
    renderResults();
  // }
}

function renderResults() {

  // for each  goat in my array, generate a LI
  // ex: name had X views and was clicked on X times
  for (let i = 0; i < allGoats.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allGoats[i].name} had ${allGoats[i].views} views and was clicked on ${allGoats[i].clicks} times`;
    ul.appendChild(li);
  }
}

// EXCUTABLE CODE


let cruisin = new Goat('cruisin-goat', 'png');
let float = new Goat('float-your-goat');
let hand = new Goat('goat-out-of-hand');
let kissing = new Goat('kissing-goat');
let sassy = new Goat('sassy-goat');
let smile = new Goat('smiling-goat');
let sweater = new Goat('sweater-goat');

allGoats.push(cruisin, float, hand, kissing, sassy, smile, sweater);

// console.log(allGoats);
renderGoats();

myContainer.addEventListener('click', handleGoatClick);

*/
