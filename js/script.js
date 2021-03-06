/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
const bookList = document.getElementById('book-list');
const addBook = document.getElementById('add-book');
const newTitle = document.getElementById('new-title');
const newAuthor = document.getElementById('new-author');

const allBooksSection = document.getElementById('all-books');
const addNewBookSection = document.getElementById('add-new-book');
const contactSection = document.getElementById('contact');
const listLink = document.getElementById('list-link');
const addLink = document.getElementById('add-link');
const contactLink = document.getElementById('contact-link');

let bookData;

class Book {
  constructor(title = 'New Book', author = 'John Doe', id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

function getBookInfo(title, author, id) {
  const div = document.createElement('div');
  const removeButton = document.createElement('button');
  const li = document.createElement('li');

  div.classList.add('book-info');
  removeButton.classList.add('remove');
  removeButton.setAttribute('id', `button${id}`);
  removeButton.setAttribute('onclick', `javascript:StorageBooks.removeListElement(${id})`);
  li.classList.add('book');
  li.setAttribute('id', `book${id}`);

  div.innerHTML = `${title} by ${author}`;
  removeButton.innerText = 'Remove';
  removeButton.type = 'button';

  li.appendChild(div);
  li.appendChild(removeButton);

  return li;
}

class StorageBooks {
  static storeData() {
    localStorage.setItem('bookData', JSON.stringify(bookData));
  }

  static loadData() {
    bookData = [];
    const data = localStorage.getItem('bookData');
    if (data) {
      bookData = JSON.parse(data);
      bookData.forEach((book) => {
        bookList.appendChild(getBookInfo(book.title, book.author, book.id));
      });
    }
  }

  static addLiElement() {
    if (newTitle.value && newAuthor.value) {
      const id = bookData[bookData.length - 1] ? bookData[bookData.length - 1].id + 1 : 1;
      const book = new Book(newTitle.value, newAuthor.value, id);
      bookData.push(book);
      bookList.appendChild(getBookInfo(book.title, book.author, book.id));
      StorageBooks.storeData();
    }
  }

  static removeListElement(id) {
    const li = document.getElementById(`book${id}`);
    li.remove();
    bookData = bookData.filter((book) => book.id !== id);
    StorageBooks.storeData();
  }
}

// add current date
document.getElementById('date').innerHTML = Date();

document.addEventListener('DOMContentLoaded', StorageBooks.loadData);
addBook.addEventListener('click', StorageBooks.addLiElement);

// Activate and desactivate sections

listLink.addEventListener('click', () => {
  allBooksSection.classList.remove('hide');
  addNewBookSection.classList.add('hide');
  contactSection.classList.add('hide');
});

// addLink
addLink.addEventListener('click', () => {
  allBooksSection.classList.add('hide');
  addNewBookSection.classList.remove('hide');
  contactSection.classList.add('hide');
});

// contactLink
contactLink.addEventListener('click', () => {
  allBooksSection.classList.add('hide');
  addNewBookSection.classList.add('hide');
  contactSection.classList.remove('hide');
});
