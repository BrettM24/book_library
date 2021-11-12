let myLibrary = [];

function Book(title, author, pages, readInfo){

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readInfo = readInfo;

};

Book.prototype.readToggle = function(){

  if(this.readInfo == "Yes"){

    this.readInfo = "No";

  }else{

    this.readInfo = "Yes";

  };

};

function addBookToLibraryArray(newBookObject){

  myLibrary.push(newBookObject);

};

function createRow(bookObject){

  const libraryTable = document.querySelector(".libraryTable");

  newRow = document.createElement('div');
  newRow.setAttribute('class', 'bookRow');
  newRow.setAttribute('id', 'unselected');

  newBlockOne = document.createElement('div');
  newBlockOne.setAttribute('class', 'tableBlockNormal');
  newBlockOne.textContent = bookObject.title;

  newBlockTwo = document.createElement('div');
  newBlockTwo.setAttribute('class', 'tableBlockNormal');
  newBlockTwo.textContent = bookObject.author;

  newBlockThree = document.createElement('div');
  newBlockThree.setAttribute('class', 'tableBlockNormal');
  newBlockThree.textContent = bookObject.pages;

  newBlockFour = document.createElement('div');
  newBlockFour.setAttribute('class', 'tableBlockFinal');
  newBlockFour.textContent = bookObject.readInfo;

  newRow.appendChild(newBlockOne);
  newRow.appendChild(newBlockTwo);
  newRow.appendChild(newBlockThree);
  newRow.appendChild(newBlockFour);

  libraryTable.appendChild(newRow);

};

function removeRows(){

  let libraryTable = document.querySelector(".libraryTable");

  let n = myLibrary.length;

  while(n > 0){

    let bookRow = document.querySelector(".bookRow");

    libraryTable.removeChild(bookRow);

    n--;

  };


};

const addButton = document.querySelector(".addButton");
addButton.addEventListener('click', () => {

  const titleTextInput = document.querySelector("#titleText");
  let titleText = titleTextInput.value;

  const authorTextInput = document.querySelector("#authorText");
  let authorText = authorTextInput.value;

  const pagesTextInput = document.querySelector("#pagesText");
  let pagesText = pagesTextInput.value;

  let readStatus;

  const readInputYes = document.querySelector("#yes");

  if(readInputYes.checked == true){

    readStatus = "Yes";

  }else{

    readStatus = "No";

  };

  removeRows();

  let newBook = new Book(titleText, authorText, pagesText, readStatus);

  console.log(myLibrary.length);

  if(myLibrary.length == 0){

    addBookToLibraryArray(newBook);

  }else{
  
    let counter = 0;

    for(let m = 0; m < myLibrary.length; m++){
  
      if(myLibrary[m].title == newBook.title){
          
        counter = 1;

      };
    
    };
  
    if(counter == 0){

      addBookToLibraryArray(newBook);
  
    };

  };

  let n = 0;

  while(n < (myLibrary.length)){

    createRow(myLibrary[n]);

    n++;

  };

});

window.addEventListener("click", (e) => {

  if(e.target.parentElement.className == "bookRow"){
  
    for(let n = 0; n < myLibrary.length; n++){

      let arrayTitle = myLibrary[n].title;

      let tableTitle = e.target.parentElement.children[0].textContent;

      if(arrayTitle == tableTitle){

        if(e.target.parentElement.id == "unselected"){

          e.target.parentElement.setAttribute('id', 'selected');

        }else{

          e.target.parentElement.setAttribute('id', 'unselected');

        };

      };

    };
    
  };

});

let removeButton = document.querySelector("#removeButton");
removeButton.addEventListener('click', () => {

  let libraryTable = document.querySelector(".libraryTable");

  let indexArray = [];

  for(let m = 1; m < libraryTable.children.length; m++){

    if(libraryTable.children[m].id == "selected"){

      indexArray.unshift(m-1);

    };

  };

  removeRows();

  for(let counter = 0; counter < indexArray.length; counter++){

    myLibrary.splice(indexArray[counter], 1);

  };

  let n = 0;

  while(n < (myLibrary.length)){

    createRow(myLibrary[n]);

    n++;

  };

});

const readButton = document.querySelector('#toggleReadButton');
readButton.addEventListener('click', () => {

  let libraryTable = document.querySelector(".libraryTable");

  let indexArray = [];

  for(let m = 1; m < libraryTable.children.length; m++){

    if(libraryTable.children[m].id == "selected"){

      indexArray.push(m - 1);

    };

  }; 

  console.table(indexArray);

  removeRows();

  for(let counter = 0; counter < indexArray.length; counter++){

    myLibrary[indexArray[counter]].readToggle();
    console.table(myLibrary[indexArray[counter]].prototype);

  };

  let n = 0;

  while(n < (myLibrary.length)){

    createRow(myLibrary[n]);

    n++;

  };

  let p = 0;

  while(p < (myLibrary.length)){

    for(let q = 0; q < indexArray.length; q++){

      if(p == indexArray[q]){

        libraryTable.children[p + 1].setAttribute('id', 'selected'); 

      };

    };

    p++;

  };

});