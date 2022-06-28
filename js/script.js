const bookList = document.getElementById('book-list');
const addBook = document.getElementById('add-book');
const newTitle = document.getElementById('new-title');
const newAuthor = document.getElementById('new-author');

let bookData = [];

class Book {
  constructor(title = 'Nuevo libro', author = 'Shakespeare', id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

//Create a function to add a new book to the collection
function getBookInfo(title, author, id) {
  const divAuthor = document.createElement('div');
  const divTitle = document.createElement('div');
  const removeButton = document.createElement('button');
  const li = document.createElement('li');

  //Add id and classes to the elements
  divTitle.classList.add('author');
  divAuthor.classList.add('title');
  removeButton.classList.add('remove');
  removeButton.setAttribute('id', `button${id}`);
  removeButton.setAttribute('onclick', `javascript:removeListElement(${id})`);
  li.classList.add('book');
  li.setAttribute('id', `book${id}`);

  divTitle.innerHTML = title;
  divAuthor.innerHTML = author;
  removeButton.innerText = 'Remove';
  removeButton.type = 'button';

  //append elements
  li.appendChild(divTitle);
  li.appendChild(divAuthor);
  li.appendChild(removeButton);

  return li;
}

//storage data in the browser
function storeData() {
  localStorage.setItem('bookData', JSON.stringify(bookData));
}

//load data in the browser
function loadData() {
  const data = localStorage.getItem('bookData');
  if (data) {
    bookData = JSON.parse(data);
    bookData.forEach((book) => {
      bookList.appendChild(getBookInfo(book.title, book.author, book.id));
    });
  }
}

loadData();

////add element from list