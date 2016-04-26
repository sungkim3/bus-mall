var imagesArray = [];
var mainImgDiv = document.getElementById('image-div');
var ClickCounter = {};

//Image object constructor, pushes each created object into an array
function CreateImageObject(imageName, type, shown, clicked, id) {
  this.imageName = imageName;
  this.type = type;
  this.shown = shown;
  this.clicked = clicked;
  this.id = id;
  this.imageNode = document.createElement('img');
  this.imageNode.src = 'img/' + this.imageName + '.' + this.type;
  imagesArray.push(this);
}

var newBag = new CreateImageObject('bag', 'jpg', 0, 0, 'newBag');
var newBanana = new CreateImageObject('banana', 'jpg', 0, 0, 'newBanana');
var newBathroom = new CreateImageObject('bathroom', 'jpg', 0, 0, 'newBathroom');
var newBoots = new CreateImageObject('boots', 'jpg', 0, 0, 'newBoots');
var newBreakfast = new CreateImageObject('breakfast', 'jpg', 0, 0, 'newBreakfast');
var newBubbleGum = new CreateImageObject('bubblegum', 'jpg', 0, 0, 'newBubbleGum');
var newChair = new CreateImageObject('chair', 'jpg', 0, 0, 'newChair');
var newCthulhu = new CreateImageObject('cthulhu', 'jpg', 0, 0, 'newCthulhu');
var newDogDuck = new CreateImageObject('dog-duck', 'jpg', 0, 0, 'newDogDuck');
var newDragon = new CreateImageObject('dragon', 'jpg', 0, 0, 'newDragon');
var newPen = new CreateImageObject('pen', 'jpg', 0, 0, 'newPen');
var newPetSweep = new CreateImageObject('pet-sweep', 'jpg', 0, 0, 'newPetSweep');
var newScissors = new CreateImageObject('scissors', 'jpg', 0, 0, 'newScissors');
var newShark = new CreateImageObject('shark', 'jpg', 0, 0, 'newShark');
var newSweep = new CreateImageObject('sweep', 'png', 0, 0, 'newSweep');
var newTauntaun = new CreateImageObject('tauntaun', 'jpg', 0, 0, 'newTauntaun');
var newUnicorn = new CreateImageObject('unicorn', 'jpg', 0, 0, 'newUnicorn');
var newUsb = new CreateImageObject('usb', 'gif', 0, 0, 'newUsb');
var newWaterCan = new CreateImageObject('water-can', 'jpg', 0, 0, 'newWaterCan');
var newWineGlass = new CreateImageObject('wine-glass', 'jpg', 0, 0, 'newWineGlass');
// console.log(imagesArray);

ClickCounter['newBag'] = newBag.clicked;
ClickCounter['newBanana'] = newBanana.clicked;
ClickCounter['newBathroom'] = newBathroom.clicked;
ClickCounter['newBoots'] = newBoots.clicked;
ClickCounter['newBreakfast'] = newBreakfast.clicked;
ClickCounter['newBubbleGum'] = newBubbleGum.clicked;
ClickCounter['newChair'] = newChair.clicked;
ClickCounter['newCthulhu'] = newCthulhu.clicked;
ClickCounter['newDogDuck'] = newDogDuck.clicked;
ClickCounter['newDragon'] = newDragon.clicked;
ClickCounter['newPen'] = newPen.clicked;
ClickCounter['newPetSweep'] = newPetSweep.clicked;
ClickCounter['newScissors'] = newScissors.clicked;
ClickCounter['newShark'] = newShark.clicked;
ClickCounter['newSweep'] = newSweep.clicked;
ClickCounter['newTauntaun'] = newTauntaun.clicked;
ClickCounter['newUnicorn'] = newUnicorn.clicked;
ClickCounter['newUsb'] = newUsb.clicked;
ClickCounter['newWaterCan'] = newWaterCan.clicked;
ClickCounter['newWineGlass'] = newWineGlass.clicked;
console.log(ClickCounter);

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
  var foundImageObject = imagesArray[arrayIndexNumber].imageNode;
  imagesArray[arrayIndexNumber].shown += 1;
  foundImageObject.setAttribute('id', imagesArray[arrayIndexNumber].id);
  setOfImagesArray.push(foundImageObject);
}
//  Takes the numberArray and looks for duplicate values, eliminates duplicate values
//  and replaces them with new ones. Creates an updated setOfImagesArray to then be
//  used to append to div elements for user view
function appendImagesToDiv() {
  for (var i = 0; i < 3; i++) {
    findRandomImage();
    if (i > 0) {
      while (numberArray[i] === numberArray[i - 1] || numberArray[i] === numberArray[i - 2]) {
        // console.log('I found a duplicate');
        // console.log('The duplicate was number ' + numberArray[i]);
        imagesArray[numberArray[i]].shown -= 1;
        numberArray.pop();
        var newNumber = findRandomNumber();
        var foundNewImageObject = imagesArray[newNumber].imageNode;
        imagesArray[newNumber].shown += 1;
        foundNewImageObject.setAttribute('id', imagesArray[newNumber].id);
        setOfImagesArray[i] = foundNewImageObject;
      }
    }
    var imageObject = setOfImagesArray[i];
    imageObject.width = 200;
    imageObject.height = 200;
    var divImg = document.getElementById('image-' + i);
    divImg.appendChild(imageObject);
  }
  numberArray = [];
  setOfImagesArray = [];
}
appendImagesToDiv();

// handles the click event to reset images and increments the clicked counter for image clicked
function handleClick(event) {
  event.preventDefault();
  var target = event.target.id;
  ClickCounter[target] = ClickCounter[target] + 1;
  for (var i = 0; i < 3; i++) {
    var divImg = document.getElementById('image-' + i);
    mainImgDiv.removeChild(divImg);
    var newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'image-' + i);
    mainImgDiv.appendChild(newDiv);
  }
  appendImagesToDiv();
}

mainImgDiv.addEventListener('click', handleClick);
