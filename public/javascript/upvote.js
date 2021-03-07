async function upvoteClickHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch('/api/reviews/upvote', {
      method: 'PUT',
      body: JSON.stringify({
        review_id: id
        
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function() {
      document.location.reload();
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
    

}

document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);