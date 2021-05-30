'Use strict';

//Global Variables
let allProducts = [];
let clicks = 0;
let clicksAllowed = 25;

let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:last-child');

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `assets/assets/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}

new Product('boots');
new Product('sweep', 'png');
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

function selectRandomProductIndex() {
  return Math.floor(Math.random() * allProducts.length);
}
function renderProducts() {
  let productOne = selectRandomProductIndex();
  let productTwo = selectRandomProductIndex();
  let productThree = selectRandomProductIndex();
  while (productOne === productTwo) {
    productTwo = selectRandomProductIndex();
  }
  while (productTwo === productThree) {
    productThree = selectRandomProductIndex();
  }
  while (productThree === productOne) {
    productOne = selectRandomProductIndex();
  }

  imageOne.src = allProducts[productOne].src;
  imageOne.alt = allProducts[productOne].name;
  allProducts[productOne].views++;

  imageTwo.src = allProducts[productTwo].src;
  imageTwo.alt = allProducts[productTwo].name;
  allProducts[productTwo].views++;

  imageThree.src = allProducts[productThree].src;
  imageThree.alt = allProducts[productThree].name;
  allProducts[productThree].views++;
}
function handleProductRender(event) {
  if (event.target === myContainer) {
    alert('Please click on an Image');
  }

  clicks++;
  let clickedProduct = event.target.alt;
  for (let i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }
  renderProducts();
  if (clicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleProductRender);

  }
}
function renderResults() {
  let ul = document.querySelector('ul');
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].views} views and was clicked ${allProducts[i].clicks} times.`;
    ul.appendChild(li);
  }
}

function handleButtonClick(event) {//eslint-disable-line
  if (clicks === clicksAllowed) {
    renderResults();
  }
}
renderProducts();

myContainer.addEventListener('click', handleProductRender);
myButton.addEventListener('click', handleButtonClick);
