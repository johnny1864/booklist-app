// BOOK CLASS 
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI CLASS
class UI {
    static displayBooks() {
        let savedBooks = [
            {
                title: 'book one',
                author: 'Author one',
                isbn: '12345'
           },
            {
                title: 'book one',
                author: 'Author one',
                isbn: '12345'
           }
       ];

        let books = savedBooks;

        books.forEach(book => {
            UI.addBookToList(book);
        });
    }

    static addBookToList(book) {
        const list = document.getElementById('book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href='#' class='btn btn-danger delete'>Delete</a></td>
        `

        list.appendChild(row);
    }
    
    static deleteBook(book){
        if(book.classList.contains('delete')){
            book.parentElement.parentElement.remove();
        }
    }

    static clearForm() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// STORAGE CLASS
class Storage {

}


// DISPLAY BOOKS
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// ADD BOOK
document.querySelector('#book-form').addEventListener('submit', (e) => {

    e.preventDefault();

    //FORM VALUES
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    
    if(!title || !author || !isbn){
        alert('Please fill in all fields');
        //return;
    }

    // INSTATIATE NEW BOOK
    const book = new Book(title, author, isbn);

    UI.addBookToList(book);
    
    UI.clearForm();
});

// REMOVE BOOK
document.querySelector('#book-list').addEventListener('click', (e)=> {
    e.preventDefault();
    UI.deleteBook(e.target);
});