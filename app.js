'Use strict';

//Global Variables
let allProducts = [];
let clicks = 0;
let clicksAllowed = 25;
let renderUniqueQueue = [];

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
  while (renderUniqueQueue.length < 6) {
    let newIndex = selectRandomProductIndex();
    if (!renderUniqueQueue.includes(newIndex)) {
      renderUniqueQueue.push(newIndex);
    }
  }

  let productThree = renderUniqueQueue.shift();
  let productTwo = renderUniqueQueue.shift();
  let productOne = renderUniqueQueue.shift();


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
    document.querySelector('#chart').style.display = 'block';
    renderChart();

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

function renderChart() {
  let clicksArray = [];
  let viewsArray = [];
  let namesArray = [];

  for (let i = 0; i < allProducts.length; i++) {
    clicksArray.push(allProducts[i].clicks);
    viewsArray.push(allProducts[i].views);
    namesArray.push(allProducts[i].name);
  }
  console.log(`${clicksArray}
  ${viewsArray}
  ${namesArray}`);

  let chartNew = {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [{
        label: '# of Clicks',
        data: clicksArray,
        backgroundColor: 'orange',
        borderColor: 'orange',
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: viewsArray,
        backgroundColor: 'blue',
        borderColor: 'Orange',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, chartNew); //eslint-disable-line

}

myContainer.addEventListener('click', handleProductRender);
myButton.addEventListener('click', handleButtonClick);
