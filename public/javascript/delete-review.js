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

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);