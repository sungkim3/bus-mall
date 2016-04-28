var imagesArray = [];
var mainImgDiv = document.getElementById('image-div');
var listContainer = document.getElementById('contains-list');
var ulEl = document.getElementById('data-list');

var buttonResults = document.getElementById('result-button');
var moreTrials = document.getElementById('trials-button');
var displayButtons = document.getElementById('contain-buttons');
var resetPage = document.getElementById('reset-button');
var tryMore = document.getElementById('try-more-button');

var chartContainer = document.getElementById('contains-chart');
var canvasChart = document.getElementById('data-chart');

var ClickCounter = {};
var globalCounter = 0;

//Image object constructor, pushes each created object into an array
function CreateImageObject(imageName, type, shown, clicked, id) {
  this.imageName = imageName;
  this.type = type;
  this.shown = shown;
  this.clicked = clicked;
  this.id = id;
  imagesArray.push(this);

}

var newBag = new CreateImageObject('bag', 'jpg', 0, 0, 'Bag');
var newBanana = new CreateImageObject('banana', 'jpg', 0, 0, 'Banana');
var newBathroom = new CreateImageObject('bathroom', 'jpg', 0, 0, 'Bathroom');
var newBoots = new CreateImageObject('boots', 'jpg', 0, 0, 'Boots');
var newBreakfast = new CreateImageObject('breakfast', 'jpg', 0, 0, 'Breakfast');
var newBubbleGum = new CreateImageObject('bubblegum', 'jpg', 0, 0, 'BubbleGum');
var newChair = new CreateImageObject('chair', 'jpg', 0, 0, 'Chair');
var newCthulhu = new CreateImageObject('cthulhu', 'jpg', 0, 0, 'Cthulhu');
var newDogDuck = new CreateImageObject('dog-duck', 'jpg', 0, 0, 'DogDuck');
var newDragon = new CreateImageObject('dragon', 'jpg', 0, 0, 'Dragon');
var newPen = new CreateImageObject('pen', 'jpg', 0, 0, 'Pen');
var newPetSweep = new CreateImageObject('pet-sweep', 'jpg', 0, 0, 'PetSweep');
var newScissors = new CreateImageObject('scissors', 'jpg', 0, 0, 'Scissors');
var newShark = new CreateImageObject('shark', 'jpg', 0, 0, 'Shark');
var newSweep = new CreateImageObject('sweep', 'png', 0, 0, 'Sweep');
var newTauntaun = new CreateImageObject('tauntaun', 'jpg', 0, 0, 'Tauntaun');
var newUnicorn = new CreateImageObject('unicorn', 'jpg', 0, 0, 'Unicorn');
var newUsb = new CreateImageObject('usb', 'gif', 0, 0, 'Usb');
var newWaterCan = new CreateImageObject('water-can', 'jpg', 0, 0, 'WaterCan');
var newWineGlass = new CreateImageObject('wine-glass', 'jpg', 0, 0, 'WineGlass');
// console.log(imagesArray);

ClickCounter['Bag'] = newBag.clicked;
ClickCounter['Banana'] = newBanana.clicked;
ClickCounter['Bathroom'] = newBathroom.clicked;
ClickCounter['Boots'] = newBoots.clicked;
ClickCounter['Breakfast'] = newBreakfast.clicked;
ClickCounter['BubbleGum'] = newBubbleGum.clicked;
ClickCounter['Chair'] = newChair.clicked;
ClickCounter['Cthulhu'] = newCthulhu.clicked;
ClickCounter['DogDuck'] = newDogDuck.clicked;
ClickCounter['Dragon'] = newDragon.clicked;
ClickCounter['Pen'] = newPen.clicked;
ClickCounter['PetSweep'] = newPetSweep.clicked;
ClickCounter['Scissors'] = newScissors.clicked;
ClickCounter['Shark'] = newShark.clicked;
ClickCounter['Sweep'] = newSweep.clicked;
ClickCounter['Tauntaun'] = newTauntaun.clicked;
ClickCounter['Unicorn'] = newUnicorn.clicked;
ClickCounter['Usb'] = newUsb.clicked;
ClickCounter['WaterCan'] = newWaterCan.clicked;
ClickCounter['WineGlass'] = newWineGlass.clicked;
// console.log(ClickCounter);

var numberArray = [];
var setOfImagesArray = [];
// Finds a random number and passes that found random number in a number array
function findRandomNumber() {
  var randomIndexNumber = Math.floor(Math.random() * (19 - 0 + 1)) + 0;
  numberArray.push(randomIndexNumber);
  return randomIndexNumber;
}
// Finds a random image from the images array using the random number function. Pushes
// the found random image into its own separate array
function findRandomImage() {
  var arrayIndexNumber = findRandomNumber();
  var foundImageObject = imagesArray[arrayIndexNumber];
  imagesArray[arrayIndexNumber].shown += 1;
  setOfImagesArray.push(foundImageObject);
}
//  Takes the numberArray and looks for duplicate values, eliminates duplicate values
//  and replaces them with new ones. Creates an updated setOfImagesArray to then be
//  used to append to div elements for user view
function appendImagesToDiv() {
  for (var i = 0; i < 3; i++) {
    findRandomImage();
    var imageNode = document.createElement('img');
    console.log(imagesArray[i]);
    imageNode.src = 'img/' + setOfImagesArray[i].imageName + '.' + setOfImagesArray[i].type;
    imageNode.setAttribute('id', setOfImagesArray[i].id);
    if (i > 0) {
      while (numberArray[i] === numberArray[i - 1] || numberArray[i] === numberArray[i - 2]) {
        // console.log('I found a duplicate');
        // console.log('The duplicate was number ' + numberArray[i]);
        imagesArray[numberArray[i]].shown -= 1;
        numberArray.pop();
        var newNumber = findRandomNumber();
        var foundNewImageObject = imagesArray[newNumber];
        imagesArray[newNumber].shown += 1;
        var newImageNode = document.createElement('img');
        newImageNode.src = 'img/' + imagesArray[newNumber].imageName + '.' + imagesArray[newNumber].type;
        newImageNode.setAttribute('id', imagesArray[newNumber].id);
        setOfImagesArray[i] = foundNewImageObject;
        imageNode = newImageNode;
      }
    }
    imageNode.width = 200;
    imageNode.height = 200;
    var divImg = document.getElementById('image-' + i);
    divImg.appendChild(imageNode);
  }
  numberArray = [];
  setOfImagesArray = [];
}

function replaceImages() {
  for (var i = 0; i < 3; i++) {
    var divImg = document.getElementById('image-' + i);
    var newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'image-' + i);
    divImg.parentNode.replaceChild(newDiv, divImg);
    divImg = newDiv;
  }
}
// handles the click event to reset images and increments the clicked counter for image clicked
function handleClick(event) {
  // event.preventDefault();
  if (globalCounter === 20) {
    mainImgDiv.removeEventListener('click', handleClick);
    resetPage.style.visibility = 'hidden';
    buttonResults.style.visibility = 'visible';
    moreTrials.style.visibility = 'visible';
    tryMore.style.visibility = 'hidden';
  } else {
    globalCounter++;
    console.log(globalCounter);
    var target = event.target.id;
    console.log(target);
    ClickCounter[target] = ClickCounter[target] + 1;
    // Send to Local Storage
    localStorage.setItem('stringedImage', JSON.stringify(imagesArray));
    localStorage.setItem('stringedCounts', JSON.stringify(ClickCounter));
    replaceImages();
    appendImagesToDiv();
  }
}
// Handles click event on Results button
function handleResultClick(event) {
  var dataChart = document.getElementById('data-chart').getContext('2d');
  tryMore.style.visibility = 'visible';
  buttonResults.style.visibility = 'hidden';
  moreTrials.style.visibility = 'hidden';
  resetPage.style.visibility = 'visible';

  var labels = [];
  var dataClicked = [];
  var dataShown = [];
  for (i = 0; i < imagesArray.length; i++) {
    labels.push(imagesArray[i].imageName.toUpperCase());
    dataClicked.push(ClickCounter[imagesArray[i].id]);
    dataShown.push(imagesArray[i].shown);
  }
  var data = {
    labels: labels,
    datasets: [
      {
        label: 'Merchandise Clicked',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: dataClicked,
      },
      {
        label: 'Merchandise Shown',
        backgroundColor: 'rgba(51, 51, 204, 0.2)',
        borderColor: 'rgba(51, 51, 204, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(51, 51, 204, 0.4)',
        hoverBorderColor: 'rgba(51, 51, 204, 1)',
        data: dataShown,
      }
    ]
  };
  var myBarChart = new Chart(dataChart, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
    }
  });
}
// Handles click event on 10 more clicks button
function handleMoreClick(event) {
  buttonResults.style.visibility = 'hidden';
  moreTrials.style.visibility = 'hidden';
  resetPage.style.visibility = 'hidden';
  tryMore.style.visibility = 'hidden';
  globalCounter -= 10;
}
// Handles click event on reset button, clears local storage
function handleResetClick(event) {
  resetScreen();
  localStorage.clear();
  for (var i = 0; i < imagesArray.length; i++) {
    imagesArray[i].shown = 0;
    ClickCounter[imagesArray[i].id] = 0;
  }
}
// Reset function
function resetScreen() {
  buttonResults.style.visibility = 'hidden';
  moreTrials.style.visibility = 'hidden';
  resetPage.style.visibility = 'hidden';
  tryMore.style.visibility = 'hidden';

  globalCounter = 0;

  var newCanvas = document.createElement('canvas');
  newCanvas.setAttribute('id', 'data-chart');
  newCanvas.setAttribute('width', '600');
  newCanvas.setAttribute('height', '400');
  canvasChart.parentNode.replaceChild(newCanvas, canvasChart);
  canvasChart = newCanvas;

  replaceImages();
  appendImagesToDiv();
}
//Does not reset local storage
function handleTryMoreClick() {
  mainImgDiv.addEventListener('click', handleClick);
  resetScreen();
}
// Checking to see if there is local storage
(function checkLocalStore() {
  if (localStorage.stringedImage) {
    console.log('local storage exists');
    var parsedImagesArray = JSON.parse(localStorage.stringedImage);
    var parsedClickCounter = JSON.parse(localStorage.stringedCounts);
    for (i = 0; i < parsedImagesArray.length; i++) {
      parsedImagesArray[i].prototype = CreateImageObject;
      // console.log(parsedImagesArray[i]);
    }
    imagesArray = parsedImagesArray;
    ClickCounter = parsedClickCounter;
  } else {
    console.log('local storage does not exist');
  }
})();

appendImagesToDiv();
mainImgDiv.addEventListener('click', handleClick);
buttonResults.addEventListener('click', handleResultClick);
moreTrials.addEventListener('click', handleMoreClick);
resetPage.addEventListener('click', handleResetClick);
tryMore.addEventListener('click', handleTryMoreClick);
