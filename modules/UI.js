import Store from './localStorage.js';

const addBtn = document.querySelector('.add-btn');
const booksList = document.querySelector('.books-list');
const allBooksSection = document.querySelector('#all-books-section');
const addBookSection = document.querySelector('#books-section');
const contactSection = document.querySelector('#contact-section');
const listNavLink = document.querySelector('.list-nav-link');
const addNavLink = document.querySelector('.add-nav-link');
const contactNavLink = document.querySelector('.contact-nav-link');


// ui operations

export default class UI {
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