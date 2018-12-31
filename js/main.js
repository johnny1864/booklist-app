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
    
    static addBookToList(book){
        const list = document.getElementById('book-list');
        
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href='#' class='btn btn-danger'>Delete</a></td>
        `
        
        list.appendChild(row);
    }
}

// STORAGE CLASS
class Storage {
    
}


// DISPLAY BOOKS
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// ADD BOOK

// REMOVE BOOK
