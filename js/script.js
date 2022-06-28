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

// Create a function to add a new book to the collection
function getBookInfo(title, author, id) {
  const divAuthor = document.createElement('div');
  const divTitle = document.createElement('div');
  const removeButton = document.createElement('button');
  const li = document.createElement('li');

  // Add id and classes to the elements
  divTitle.classList.add('author');
  divAuthor.classList.add('title');
  removeButton.classList.add('remove');
  removeButton.setAttribute('id', `button${id}`);
  removeButton.setAttribute('onclick', `javascript:removeListElement(${id})`);
  li.classList.add('book');
  li.setAttribute('id', `book${id}`);

  // Add content to elements
  divTitle.innerHTML = title;
  divAuthor.innerHTML = author;
  removeButton.innerText = 'Remove';
  removeButton.type = 'button';

  // Append elements
  li.appendChild(divTitle);
  li.appendChild(divAuthor);
  li.appendChild(removeButton);

  return li;
}

// Storage data in the browser
function storeData() {
  localStorage.setItem('bookData', JSON.stringify(bookData));
}

// Load data in the browser
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

// Add element from list
addBook.addEventListener('click', () => {
  if (newTitle.value && newAuthor.value) {
    // Create an id to the elements
    const id = bookData[bookData.length - 1] ? bookData[bookData.length - 1].id + 1 : 1;
    const book = new Book(newTitle.value, newAuthor.value, id);
    bookData.push(book);
    bookList.appendChild(getBookInfo(book.title, book.author, book.id));
    storeData();
  }
});

// Remove element from list of books
function removeListElement(id) {
  const li = document.getElementById(`book${id}`);
  // Remove element from the array
  bookData = bookData.filter((book) => book.id !== id);
  // Remove element from the html
  li.remove();
  // Store array withot the element on the browser
  storeData();
}

removeListElement(0);
