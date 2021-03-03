async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const post_url = document.querySelector('input[name="post-url"]').value;
  
    const response = await fetch(`/api/review`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_url
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(){
      document.location.replace('/dashboard/');
    })
    .catch(err => console.log(err));

}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
