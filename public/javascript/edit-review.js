async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="review-title"]').value.trim();
    const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/reviews/${id}`, {
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

document.querySelector('.edit-review-form').addEventListener('submit', editFormHandler);