// Selectors
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const addBtn = document.querySelector('.add-btn');
const booksList = document.querySelector('.books-list');


// Event Listeners 

addBtn.addEventListener('click', addBook)

// Functions

function addBook() {

  // create book Div
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book');

  // Create title
  const titleElement = document.createElement('h3');
  titleElement.innerText = titleInput.value;
  
  // create Author
  const authorElement = document.createElement('h3');
  authorElement.innerText = authorInput.value;

  // Create Remove Btn
  const removeElement = document.createElement('button');
  removeElement.innerText = 'Remove';

  bookDiv.appendChild(titleElement);
  bookDiv.appendChild(authorElement);
  bookDiv.appendChild(removeElement);
  booksList.appendChild(bookDiv);
}