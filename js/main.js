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
        let books = Storage.getBooks();

        console.log(books);
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
    
    static showAlert(message, className){
        const div = document.createElement('div');
        div.classList = `alert alert-${className}`;
        
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        
        container.insertBefore(div, form);
        
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        }, 3000);
    }

    static clearForm() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// STORAGE CLASS
class Storage {
    static getBooks(){
        let books;
    
        if(!localStorage.getItem('books')){
             books = [];
        }else{
             books = JSON.parse(localStorage.getItem('books'));   
        }
        
        return books;
    }
    
    static addBook(book){
        const books = Storage.getBooks();
        
        books.push(book);
        
        localStorage.setItem('books', JSON.stringify(books));
        
    }
    
    static removeBook(isbn){
        const books = Storage.getBooks();
        
        books.forEach((book, index) =>{
           if(book.isbn === isbn){
               books.splice(index, 1);
           } 
        });
        
        localStorage.setItem('books', JSON.stringify(books));
    }
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
    
    // VALIDATION IS FIELDS ARE LEFT EMPTY
    if(title === '' || !author === '' || !isbn === ''){
        UI.showAlert('Please fill in all fields', 'danger');
        return ;
    }

    // INSTATIATE NEW BOOK
    const book = new Book(title, author, isbn);

    UI.addBookToList(book);
    
    Storage.addBook(book);
    
    UI.showAlert('Book Added!!!', 'success');
    
    UI.clearForm();
});

// REMOVE BOOK
document.querySelector('#book-list').addEventListener('click', (e)=> {
    e.preventDefault();
    UI.deleteBook(e.target);
    Storage.removeBook(e.target.parentElement.previousElementSibling.textContent)
    UI.showAlert('Book Removed...', 'success');
});