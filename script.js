// Selectors
const addBtn = document.querySelector('.add-btn');
const booksList = document.querySelector('.books-list');

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

    if (localStorage.getItem('books') === null){
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook(author) {
    const books = Store.getBooks();
    
    books.forEach((book, index) => {
      if (book.author === author) {
        books.splice(index, 1);
      }
      console.log(author);
    })

    localStorage.setItem('books', JSON.stringify(books));
  }
}


// ui operations

class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => {
      UI.addBookToList(book)
    })
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

    // Create Horizontal element
    const horizontalElement = document.createElement('hr');
    bookDiv.appendChild(titleElement);
    bookDiv.appendChild(authorElement);
    bookDiv.appendChild(removeElement);
    bookDiv.appendChild(horizontalElement);
    booksList.appendChild(bookDiv);
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
