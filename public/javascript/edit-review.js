async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="review_title"]').value.trim();
    const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function() {
      document.location.replace('/dashboard/');
    })
    .catch(err => console.log(err));

}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);