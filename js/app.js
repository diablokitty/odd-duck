
'use strict';

//ACKNOWLEDGEMENTS - I did make pretty extensive use of the class code, although in most cases I re-typed it and renamed the variables.
//I also had help from a tutor, so there is some logic that he suggested would handle things more efficiently.
//We did discuss things extensively when that occurred, so I would understand it.
//And I ported code from cookie-sales for a couple of things.
//I looked at Rhea's code from the class review to figure out how to fix the product that had the png.

/*Remaining Assignment Goals for Lab 12


Add chart



Stretch Goals
Handle the display and voting for an arbitrary number of images
Using a variable, declare in your JS how many images to show.
Based on that value, dynamically create that many <img> tags
Also based on that value, ensure that your randomizer is properly handling the specified number of images for display and repeat tracking.
*/



//construct object for images:
//properties 1.Name of the product 2.File path of image 3.Times the image has been shown

let form = document.getElementById('votingRoundsForm');

function handleSubmit(event) {
  event.preventDefault();
  clickAllowed = parseInt(event.target.rounds.value);
  form.reset();
}

form.addEventListener('submit', handleSubmit);


//connect this code to the DOM
let productContainer = document.querySelector('section');
let voteButton = document.querySelector('section + div');
let clicks = 0;
//let productsShown = 3;
let clickAllowed = 25;
let render = true;
let displayObjects = [];
let productObjectList = [];


//connect images to the dom

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');


//call the function for creating the image objects
buildCurrentProducts();


//constructor for the image objects
function Product(name, fileExtension = 'jpg', views = 0, clicks = 0) {
  this.name = name;
  this.fileExtension = fileExtension;
  this.src = `images/${this.name}.${fileExtension}`;
  this.views = views;
  this.clicks = clicks;
}

//helper function for instantiating the object instances
function makeProduct(name, fileExtension, views, clicks) {

  let newProduct = new Product(name, fileExtension, views, clicks);
  productObjectList.push(newProduct);
}

//checks for information stored in local memory and translates that to image objects
function buildCurrentProducts() {
  ////check to see if there are products in memory
  let potentialVotes = localStorage.getItem('products');
  if (potentialVotes) {
    // turn the potential orders back into Plain old JavaScript objects
    let parsedVotes = JSON.parse(potentialVotes);
    // turn them back into instances of products
    // run the data back througgh the constructor again - REINSTANTIATE

    for (let product of parsedVotes) {
      console.log(product);
      // extract values from the POJOs
      let name = product.name;
      let fileExtension = product.fileExtension;
      let savedViews = product.views;
      let savedClicks = product.clicks;
      makeProduct(name, fileExtension, savedViews, savedClicks);
    }
  }
  else {
    //build array of objects if there's nothing in local memory
    let productList = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
    for (let i = 0; i < (productList.length); i++) {

      let product = new Product(productList[i]);
      productObjectList.push(product);
      console.log(productObjectList);
    }
  }

}

//randomizes products that are shown by choosing numbers and then showing the object in that array index
function getRandomProduct() {

  return Math.floor(Math.random() * productObjectList.length);
}
console.log(productObjectList);

//builds intial array to ensure that the first three products are not repeats at each showing by checking the randomly generated numbers
function renderProductList() {

  let displayProduct1 = getRandomProduct();
  let displayProduct2 = getRandomProduct();
  while (displayProduct2 === displayProduct1) {
    displayProduct2 = getRandomProduct();
  }
  let displayProduct3 = getRandomProduct();
  while (displayProduct3 === displayProduct1 || displayProduct3 === displayProduct2) {
    displayProduct3 = getRandomProduct();
  }

  [displayProduct1, displayProduct2, displayProduct3];
  buildRandomArray();

  //TODO: (stretch goal) refactor this code to display the number of objects chosen by a user form
  //shows images chosen by randomizer
  image1.src = productObjectList[displayObjects[0]].src;
  image1.alt = productObjectList[displayObjects[0]].name;
  productObjectList[displayObjects[0]].views++;
  image2.src = productObjectList[displayObjects[1]].src;
  image2.alt = productObjectList[displayObjects[1]].name;
  productObjectList[displayObjects[1]].views++;
  image3.src = productObjectList[displayObjects[2]].src;
  image3.alt = productObjectList[displayObjects[2]].name;
  productObjectList[displayObjects[2]].views++;
  displayObjects.shift();
  displayObjects.shift();
  displayObjects.shift();

}
// expands array of random products that ensures that no product will be shown more than once in three iterations
function buildRandomArray() {
  while (displayObjects.length < 7) {
    let displayProduct = getRandomProduct();
    if (!displayObjects.includes(displayProduct)) {
      displayObjects.push(displayProduct);
    }
  }
}
renderProductList();

function handleProductVoteClick(event) {

  if (event.target === productContainer) {

    alert('Please click a product image.');
  }
  clicks++;
  let clickedObjectName = event.target.alt;
  console.log(clickedObjectName);
  for (let i = 0; i < productObjectList.length; i++) {
    if (clickedObjectName === productObjectList[i].name) {
      productObjectList[i].clicks++;
      console.log(productObjectList[i]);
      storeVotes();
      break;
    }
  }
}

//KEEP PRODUCT INFO IN LOCAL STORAGE

function storeVotes() {

  console.log(productObjectList);
  let stringifiedProducts = JSON.stringify(productObjectList);
  console.log(stringifiedProducts);
  localStorage.setItem('products', stringifiedProducts);

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


const data = {
  labels:  ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'],
  datasets: [{
    label: 'Views',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

// const myChart = new Chart(
//   document.getElementById('myChart').getContext('2d'),
//   config
// );

// const config = {
//   type: 'pie',
//   data: data,
// };

