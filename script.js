// Selectors
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const addBtn = document.querySelector(".add-btn");
const booksList = document.querySelector(".books-list");

// Event Listeners

addBtn.addEventListener("click", addBook);
booksList.addEventListener("click", removeBook);

// Functions

function addBook() {
  // create book Div
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");

  // Create title
  const titleElement = document.createElement("h3");
  titleElement.innerText = titleInput.value;

  // create Author
  const authorElement = document.createElement("h3");
  authorElement.innerText = authorInput.value;

  // Create Remove Btn
  const removeElement = document.createElement("button");
  removeElement.classList.add("remove-btn");
  removeElement.innerText = "Remove";

  bookDiv.appendChild(titleElement);
  bookDiv.appendChild(authorElement);
  bookDiv.appendChild(removeElement);
  booksList.appendChild(bookDiv);

  let books;
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }

  let book = {};
  book.title = titleInput.value;
  book.author = authorInput.value;
  book.index = books.length;

  books.push(book);

  localStorage.setItem("books", JSON.stringify(books));
}

function removeBook(e) {
  const item = e.target;
  if (item.classList[0] === "remove-btn") {
    const books = JSON.parse(localStorage.getItem("books"));
    const index = item.dataset.id;
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
  }
}
