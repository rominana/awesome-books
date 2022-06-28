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
  // create a section dinamically div, li and remove button
  const div = document.createElement('div');
  const removeButton = document.createElement('button');
  const li = document.createElement('li');

  // add classes and atributes to the new created elements
  div.classList.add('book-info');
  removeButton.classList.add('remove');
  removeButton.setAttribute('id', `button${id}`); // set atributes line 68
  removeButton.setAttribute('onclick', `javascript:StorageBooks.removeLiElement(${id})`); // set atributes line 68
  li.classList.add('book');
  li.setAttribute('id', `book${id}`); // set atributes line 68

  div.innerHTML = `${title} by ${author}`;
  removeButton.innerText = 'Remove';
  removeButton.type = 'button';

  li.appendChild(div);
  li.appendChild(removeButton);

  return li;
}

class StorageBooks {
// storage the data in the local store
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

  // Add books to the list
  static addLiElement() {
    if (newTitle.value && newAuthor.value) {
      const id = bookData[bookData.length - 1] ? bookData[bookData.length - 1].id + 1 : 1;
      const book = new Book(newTitle.value, newAuthor.value, id);
      bookData.push(book);
      bookList.appendChild(getBookInfo(book.title, book.author, book.id));
      StorageBooks.storeData();
    }
  }

  // remove element of the list
  static removeLiElement(id) {
    const li = document.getElementById(`book${id}`);
    li.remove();
    bookData = bookData.filter((book) => book.id !== id); // filter method required
    StorageBooks.storeData();
  }
}

document.addEventListener('DOMContentLoaded', StorageBooks.loadData);
addBook.addEventListener('click', StorageBooks.addLiElement);