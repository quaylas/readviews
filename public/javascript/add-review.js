async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="review-title"]').value;
    const body = document.querySelector('input[name="review-text"]').value;
    const public = document.querySelector('input[name="is-public"]').checked;
    const comments = document.querySelector('input[name="comments-enabled"]').checked;
  
    const response = await fetch(`/api/reviews`, {
      method: 'POST',
      body: JSON.stringify({
        review_title,
        review_text,
        is_public,
        comments_enabled,
        book_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(){
      document.location.replace('/dashboard/');
    })
    .catch(err => console.log(err));

}

document.querySelector('.new-review-form').addEventListener('submit', newFormHandler);
