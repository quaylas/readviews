

async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/review/${id}`, {
        method: 'DELETE'
    }).then(function(){
        document.location.replace('/dashboard/');
    })
    .catch(err => console.log(err));

}

async function booksearch(event) {
    event.preventDefault();

const usersearch = document.getElementById("booksearch").value.trim();

if(usersearch){
    const response = await fetch(`/api/books/title/${usersearch}`,  {
        method: "get",
        
        headers: { 
            'Content-Type': 'application/json'
        }
    }) .then(response => {
        response.json().then(data => {
            var bookContainer = document.getElementById('booksearchresults');
            bookContainer.innerHTML = '';
            var bookInnerContainer = document.createElement('div');
            var books = data;

            // if books are returned, load them
            if(books.length > 0) {
                for(i=0; i < Math.min(5, books.length); i++) {
                    let btitle = books[i].title;
                    console.log(btitle);
                    let bauthor = books[i].author;
                    let breview_count = books[i].review_count;
                    let create_review = `/create-review?book_id=${books[i].id}?book_title=${btitle}`;
                    let bookListItem  = document.createElement('article');
                    bookListItem.className = 'book-list-item';
                    bookListItem.innerHTML= `<h2 class='book'>${btitle}</h2><p class='subtitle'>${bauthor}</p><p class='review-link'>Total Reviews: ${breview_count} | <a href='${create_review}'>Review this book</a></p>`;
                    bookInnerContainer.appendChild(bookListItem);
                }

                bookContainer.appendChild(bookInnerContainer);
            }
            else {console.log('wrong')}
        })

    })
    .catch(err => console.log(err)); 
}

}
document.getElementById("gobooksearch").addEventListener("click", booksearch);
document.querySelector('.delete-btn').addEventListener('click', deleteFormHandler);