async function editFormHandler(event) {
    event.preventDefault();
  
    const review_title = document.querySelector('input[name="review-title"]').value;
    const review_text = document.querySelector('textarea[name="review-text"]').value;
    const is_public = document.querySelector('input[name="is-public"]').checked;
    const comments_enabled = document.querySelector('input[name="comments-enabled"]').checked;
    const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        text,
        is_public,
        comments_enabled
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