async function commentFormHandler(event) {
    event.preventDefault();
  
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    const review_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (comment_text) {
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          review_id,
          comment_text
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(){
        document.location.reload();
      })
      .catch(err => console.log(err));

    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);