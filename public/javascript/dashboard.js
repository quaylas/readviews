

async function deleteFormHandler(event) {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    }).then(function(){
        document.location.reload();
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
                    let bauthor = books[i].author;
                    let breview_count = books[i].review_count;
                    let create_review = `/create-review?id=${books[i].id}&title=${btitle}&author=${bauthor}`;
                    let bookListItem  = document.createElement('article');
                    bookListItem.classList.add('book-list-item', "m-3");
                    bookListItem.innerHTML= `<h2 class='book'>${btitle}</h2><p class='subtitle'>${bauthor}</p><p class='review-link'>Total Reviews: ${breview_count} | <a href='${create_review}'>Review this book</a></p>`;
                    bookInnerContainer.appendChild(bookListItem);
                }

                bookContainer.appendChild(bookInnerContainer);
            }
            else {bookInnerContainer.innerHTML=`<h2 class='title'>No books found with that title!</h2>s`}
        })

    })
    .catch(err => console.log(err)); 
}

}
document.getElementById("gobooksearch").addEventListener("click", booksearch);
let deleteBtnEl=document.querySelector('.delete-btn');
if (deleteBtnEl){deleteBtnEl.addEventListener('click', deleteFormHandler)};
