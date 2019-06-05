// Declaring variables to reference the HTMl elements.
var homeSign = document.getElementById("homeImgDiv");
var txtMiddle = document.getElementById("txtMiddle");
var profileSign = document.getElementById("profileImgDiv");


// Click functions to the header elements to go into the other sites
homeSign.addEventListener("click", function(){

    setTimeout(function () {
        window.location.href = "index.html"; //will redirect to your blog page (an ex: blog.html)
     }, 1000);
});
txtMiddle.addEventListener("click", function(){

    setTimeout(function () {
        window.location.href = "CreateTable.html"; //will redirect to your blog page (an ex: blog.html)
     }, 1000);
});
profileSign.addEventListener("click", function(){

    setTimeout(function () {
        window.location.href = "TablePage.html"; //will redirect to your blog page (an ex: blog.html)
     }, 1000);
});

// init
let cardI = 0;
let orderI = 0;
let orderDrag;
let cardId;

// main container
const table = document.getElementById("container");
const body = document.body;

// newCardButton
const newCardButton = document.getElementById("newCardButtonContainer");
newCardButton.addEventListener("click", newCardPopUp);
const newCardPopContainer = document.getElementById("newCardPopContainer");
const popClose = document.getElementsByClassName("close")[0];
popClose.addEventListener("click", popDown);
const getCardName = document.getElementById("getCardName");
getCardName.addEventListener("keyup", function(){
    if(event.keyCode == 13){
        cardGenerator();
        popDown();
    }
});
const popCardEnter = document.getElementById("cardEnter");
popCardEnter.addEventListener("click", createNewCard);

// open popup window for new card
function newCardPopUp(){
    newCardPopContainer.style.display = "block";
    newCardPopContainer.style.display = "none";
    getCardName.value = "";
    tableContainer.style.filter = "blur(0px)";
}

function createNewCard(){
    cardGenerator();
    popDown();
}


// Creating new cards
function cardGenerator(){
    if(cardI <= 4){
        
        const newCard = document.createElement("div");
        newCard.className = "cards";
        newCard.id = "card"+cardI;
        
        const newCardName = document.createElement("p");
        newCardName.className = "newCardName";
        newCardName.id = "newCardName"+cardI;
        newCardName.style.pointerEvents = "none";
        newCard.append(newCardName);
        
        // checking for input, if no user input cardname = new card + cardI
        if(getCardName.value == ""){
            newCardName.innerHTML = "NEW CARD "+cardI;
        } if(getCardName.value != ""){
            newCardName.innerHTML = getCardName.value.toUpperCase();
        } 
        
        // Adding eventlistener for dragging to new cards
        newCard.addEventListener("dragover", dragOver);
        newCard.addEventListener("dragenter", dragEnter);
        newCard.addEventListener("dragleave", dragLeave);
        newCard.addEventListener("drop", dragDrop);
        table.append(newCard);
        
        // Edit button for cards
        const editCard = document.createElement("span");
        editCard.className = "edit";
        editCard.id = "cardEdit"+cardI;
        editCard.innerHTML = "&#9998;";
        editCard.addEventListener("click", editCardPop);
        newCard.append(editCard);
        
        // Order input init
        let orderInputContainer = document.createElement("div");
        orderInputContainer.className = "orderInputContainer";
        orderInputContainer.id = "orderInputContainer"+cardI;
        
        const orderEnter = document.createElement("span");
        orderEnter.className = "enter";
        orderEnter.id = "orderEnter"+cardI;
        orderEnter.innerHTML = "&plus;";
        orderEnter.addEventListener("click",createNewOrder);
        
        const getOrderName = document.createElement("input");
        getOrderName.className = "orderInput";
        getOrderName.id = "orderInput"+cardI;
        getOrderName.placeholder = "Enter new order name....";
        getOrderName.addEventListener("keyup", function(){
            if(event.keyCode == 13){
                createNewOrder();
            }
        });
        
        orderInputContainer.append(orderEnter);
        orderInputContainer.append(getOrderName);
        newCard.append(orderInputContainer);
        table.append(newCardButton);
        
        cardI++;
        
        // max cards
        if(cardI == 5){
            newCardButton.style.display = "none";
        }
        
    } else {
        alert("erroooor");
    }
}

function editCardPop(e){
    
    cardId = e.target.id.substr(e.target.id.length -1);
    const currentCard = document.getElementById("card"+cardId);
    
    const editPop = document.createElement("div");
    editPop.className = "editPopContainer";
    editPop.id = "editPopContainer";
    editPop.style.display = "block";
    
    const editWindow = document.createElement("div");
    editWindow.className = "editPop";
    
    const editCardName = document.createElement("p");
    editCardName.className = "editCardName";
    editCardName.innerHTML = document.getElementById("newCardName"+cardId).innerHTML;
    
    const editEnter = document.createElement("span");
    editEnter.className = "enter";
    editEnter.id = "editEnter";
    editEnter.innerHTML = "&plus;";
    editEnter.addEventListener("click", editPopEnter);
    
    const editClose = document.createElement("span");
    editClose.className = "close";
    editClose.id = "editClose";
    editClose.innerHTML = "&times;";
    editClose.addEventListener("click", editpopDown);
    
    const editName = document.createElement("input");
    editName.className = "editInput";
    editName.id = "editName";
    editName.placeholder = "Enter new cardname";

    const deleteCardContainer = document.createElement("div");
    deleteCardContainer.className = "editInput";
    deleteCardContainer.id = "deleteCardContainer";

    const deleteCard = document.createElement("input");
    deleteCard.className = "editInput";
    deleteCard.id = "deleteCard";
    deleteCard.placeholder = "Enter 'DELETE' to confirm";

    
    editWindow.append(editClose);
    editWindow.append(editEnter);
    editWindow.append(editCardName);
    editWindow.append(editName);
    editWindow.append(deleteCard);
    
    editPop.append(editWindow);
    body.append(editPop);
    
    console.log(currentCard);
}

// Creating new order
function createNewOrder(){
    
    cardId = event.target.id.substr(event.target.id.length -1);
    const orderInput = document.getElementById("orderInput"+cardId);
    const currentCard = document.getElementById("card"+cardId);
    
    const order = document.createElement("div");
    order.className = "orders";
    order.id = "order"+orderI;
    order.draggable = "true";

    const orderName = document.createElement("div");
    orderName.className = "orderName";
    orderName.id = "orderName"+cardId;
    orderName.style.pointerEvents = "none";    

    if(orderInput.value == ""){
        orderName.innerHTML = "NEW ORDER "+orderI;
    } else if(orderInput.value != "" && orderInput.value.length <= 14){
        orderName.innerHTML = orderInput.value.toUpperCase();
    } else {
        orderInput.value = "";
        orderInput.placeholder = "Too many letters, max 14";
        orderName.innerHTML = "NEW ORDER "+orderI;
    }
    
    // Edit button for cards
    const editOrder = document.createElement("span");
    editOrder.className = "edit";
    editOrder.id = "orderEdit"+cardI;
    editOrder.innerHTML = "&#9998;";
    //editOrder.addEventListener("click", editOrderPop);
    
    order.append(editOrder);

    order.addEventListener("dragstart", dragStart);
    order.addEventListener("dragend", dragEnd);

    order.append(orderName);
    currentCard.append(order);

    orderI++;
    orderInput.value = "";
}

// save edit pop
function editPopEnter(){
    if(document.getElementById("editName").value != ""){
        document.getElementById("newCardName"+cardId).innerHTML = document.getElementById("editName").value.toUpperCase();
    }
    body.removeChild(document.getElementById("editPopContainer"));
}

// close edit pop
function editpopDown(){
    body.removeChild(document.getElementById("editPopContainer"));
}

// Dragging
function dragStart(e){
    const target = getDiv (e.target);
    orderDrag = target;
    orderDrag.className += " hold";
    setTimeout(() => (this.className = "invisible"), 0);
}

function dragEnd(){
    this.className = "orders";
}

function dragOver(e){
    e.preventDefault();
    var target = getDiv (e.target);
    
    if(e.target.className == "orders"){
        var bounding = target.getBoundingClientRect();
        var offset = bounding.y + (bounding.height/2);
    }
    
    if ( e.clientY - offset > 0 && e.target.className !== "cards") {
       	target.style['border-bottom'] = 'solid 2px black';
        target.style['border-top'] = '';
    } else if ( e.clientY - offset < 0 && e.target.className != "cards") {
        target.style['border-top'] = 'solid 2px  black';
        target.style['border-bottom'] = '';
    }
}

function dragEnter(e){
    e.preventDefault();
    this.className += " .hovered";
}

function dragLeave(e){
    this.className = "cards";
    var target = getDiv(e.target);
    target.style['border-bottom'] = '';
    target.style['border-top'] = '';
    
}

function dragDrop(e){
    var target = getDiv( e.target );
    this.className = "cards";

    // check to place order above or below target
    if ( target.style['border-bottom'] !== '' && e.target.className !== "cards") {
        target.style['border-bottom'] = '';
        target.parentNode.insertBefore(orderDrag, e.target.nextSibling);
    } else if ( target.style['border-top'] !== '' && e.target.className !== "cards"){
        target.style['border-top'] = '';
        target.parentNode.insertBefore(orderDrag, e.target);
    } else if (e.target.className == "cards" ||  e.target.parentNode.className == "orderInputContainer" || e.target.className == "edit"){
        this.append(orderDrag);
    } else {
        alert("stupid");
    }
}

// get targeted div
function getDiv( target ) {
    while ( target.nodeName.toLowerCase() != 'div' && target.nodeName.toLowerCase() != 'body' && target.className.toLowerCase() != "cards" ) {
        target = target.parentNode;
    }
    if ( target.nodeName.toLowerCase() == 'body' ) {
        return false;
    } else {
        return target;
    }
}










var i = 0;

var numberField = document.getElementById("number");
var start = document.getElementById("start");
var userPointsElement = document.getElementById("userPoints");
var pointsEarnedElement = document.getElementById("pointsEarned");
var startDropdown = document.getElementById("startDropdown");
var dropdownDisplay = document.getElementById("dropDown_Score");
var tableContainer = document.getElementById("container");

var userPoints = 0;
var pointsEarned = 200;

startDropdown.addEventListener("click", function(){
    tableContainer.style.filter = "blur(5px)"
    tableContainer.style.transition = "1s";
    dropdownDisplay.style.opacity = "0.8";
    dropdownDisplay.style.transition = "1s";

    setTimeout(function(){ myLoop(); }, 1500);
    setTimeout(function(){ removeDropdown(); }, 5500);

});

function removeDropdown(){
    tableContainer.style.filter = "blur(0px)"
    tableContainer.style.transition = "1s";
    dropdownDisplay.style.opacity = "0.0";
    dropdownDisplay.style.transition = "1s";
}

pointsEarnedElement.innerText = pointsEarned;
userPointsElement.innerText = userPoints;


var i = 1;                     //  set your counter to 1

function myLoop () {           //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
                              //  your code here
                         //  increment the counter
      if (pointsEarned > 0) {            //  if the counter < 10, call the loop function
        myLoop();
        userPoints += 1;
        pointsEarned -= 1; 
        pointsEarnedElement.innerText = pointsEarned;
        userPointsElement.innerText = userPoints;
            if(userPoints >= 100){
                userPointsElement.style.left = "100px";
            }else if(userPoints > 10){
                userPointsElement.style.left = "140px";
            }

            if(pointsEarned > 100){
                pointsEarnedElement.style.left = "100px";
            }else if(pointsEarned > 10){
                pointsEarnedElement.style.left = "140px";
            }else if(pointsEarned < 10){
                pointsEarnedElement.style.left = "170px";
            }
         
            //  ..  again which will trigger another 
      }                        //  ..  setTimeout()
   }, 10)
}

start.addEventListener("click", function(){
    myLoop();
});     