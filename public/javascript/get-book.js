
async function booksearch(event) {
    event.preventDefault();

const usersearch = document.getElementById("booksearch").value.trim();

if(usersearch){
    const response = await fetch(`/api/books/title/${usersearch}`,  {
        method: "get",
        
        headers: { 
            'Content-Type': 'application/json'
        }
    }) .then(response =>{

        console.log(response)

        document.getElementById("bookseachresults").innerHTML = response
       
    })
    .catch(err => console.log(err)); 
}

}
document.getElementById("gobooksearch").addEventListener("click", booksearch);