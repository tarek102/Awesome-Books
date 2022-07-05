// Selectors
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const addBtn = document.querySelector('.add-btn');
const booksList = document.querySelector('.books-list');

// Functions

function displayBooks() {
  const books = JSON.parse(localStorage.getItem('books')) || [];

  if (!books) return;
  booksList.innerHTML = '';
  books.forEach((book) => {
    // create book Div
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

    // Create title
    const titleElement = document.createElement('h3');
    titleElement.innerText = book.title;

    // create Author
    const authorElement = document.createElement('h3');
    authorElement.innerText = book.author;

    // Create Remove Btn
    const removeElement = document.createElement('button');
    removeElement.classList.add('remove-btn');
    removeElement.innerText = 'Remove';
    removeElement.setAttribute('data-id', book.index);

    // Create Horizontal element
    const horizontalElement = document.createElement('hr');
    bookDiv.appendChild(titleElement);
    bookDiv.appendChild(authorElement);
    bookDiv.appendChild(removeElement);
    bookDiv.appendChild(horizontalElement);
    booksList.appendChild(bookDiv);
  });
}

function addBook() {
  // Store book to local storage
  if (!titleInput.value || !authorInput.value) return;
  const books = JSON.parse(localStorage.getItem('books')) || [];
  const book = {};
  book.title = titleInput.value;
  book.author = authorInput.value;
  book.index = books.length;
  books.push(book);

  localStorage.setItem('books', JSON.stringify(books));
  titleInput.value = '';
  authorInput.value = '';

  displayBooks();
}

function removeBook(e) {
  const item = e.target;
  if (item.classList[0] === 'remove-btn') {
    const books = JSON.parse(localStorage.getItem('books'));
    const indexInd = Number(item.dataset.id);
    const modified = books.filter((book) => book.index !== indexInd);
    localStorage.setItem('books', JSON.stringify(modified));
  }
  displayBooks();
}

// Event Listeners
booksList.addEventListener('click', removeBook);
window.addEventListener('load', displayBooks);
addBtn.addEventListener('click', addBook);
