/* eslint-disable max-classes-per-file */

// Selectors
const addBtn = document.querySelector('.add-btn');
const booksList = document.querySelector('.books-list');
const allBooksSection = document.querySelector('#all-books-section');
const addBookSection = document.querySelector('#books-section');
const contactSection = document.querySelector('#contact-section');
const listNavLink = document.querySelector('.list-nav-link');
const addNavLink = document.querySelector('.add-nav-link');
const contactNavLink = document.querySelector('.contact-nav-link');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// LocalStorage Class

class Store {
  static getBooks() {
    let books;

    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(author) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.author === author) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// ui operations

class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => {
      UI.addBookToList(book);
    });

    allBooksSection.classList.add('show-section');
    allBooksSection.classList.remove('hide-section');
    addBookSection.classList.add('hide-section');
    contactSection.classList.add('hide-section');
    listNavLink.children[0].classList.add('active');
    contactNavLink.children[0].classList.remove('active');
    addNavLink.children[0].classList.remove('active');
  }

  static addBookToList(book) {
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

    // Create infoDiv element
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

    // create h3
    const linkElement = document.createElement('h3');
    linkElement.innerText = 'by';

    infoDiv.appendChild(titleElement);
    infoDiv.appendChild(linkElement);
    infoDiv.appendChild(authorElement);

    bookDiv.appendChild(infoDiv);
    booksList.appendChild(bookDiv);
    bookDiv.appendChild(removeElement);
  }

  static clearFields() {
    document.getElementById('title-input').value = '';
    document.getElementById('author-input').value = '';
  }

  static deleteBook(el) {
    if (el.classList.contains('remove-btn')) {
      el.parentElement.remove();
    }
  }
}

// Adding Book
addBtn.addEventListener('click', () => {
  const titleInput = document.querySelector('#title-input').value;
  const authorInput = document.querySelector('#author-input').value;
  if (titleInput && authorInput) {
    const book = new Book(titleInput, authorInput);
    UI.addBookToList(book);
    Store.addBook(book);
    UI.clearFields();
  }
});
// Removing Book
booksList.addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  console.log(e.target.previousElementSibling.children[2]);
  Store.removeBook(e.target.previousElementSibling.children[2].textContent);
});

// Event listener
document.addEventListener('DOMContentLoaded', UI.displayBooks);
listNavLink.addEventListener('click', (e) => {
  e.preventDefault();
  allBooksSection.classList.add('show-section');
  allBooksSection.classList.remove('hide-section');
  addBookSection.classList.add('hide-section');
  contactSection.classList.add('hide-section');
  listNavLink.children[0].classList.add('active');
  contactNavLink.children[0].classList.remove('active');
  addNavLink.children[0].classList.remove('active');
});
addNavLink.addEventListener('click', (e) => {
  e.preventDefault();
  addBookSection.classList.add('show-section');
  addBookSection.classList.remove('hide-section');
  contactSection.classList.add('hide-section');
  allBooksSection.classList.add('hide-section');
  addNavLink.children[0].classList.add('active');
  listNavLink.children[0].classList.remove('active');
  contactNavLink.children[0].classList.remove('active');
});
contactNavLink.addEventListener('click', (e) => {
  e.preventDefault();
  contactSection.classList.add('show-flex-section');
  contactSection.classList.remove('hide-section');
  addBookSection.classList.add('hide-section');
  allBooksSection.classList.add('hide-section');
  contactNavLink.children[0].classList.add('active');
  listNavLink.children[0].classList.remove('active');
  addNavLink.children[0].classList.remove('active');
});
