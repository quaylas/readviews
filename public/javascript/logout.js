async function logout() {
    const response = await fetch('/api/users/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    }).then(function() {
      document.location.replace("/");
    })
    .catch(err => console.log(err));
  }

  document.querySelector('#logout').addEventListener('click', logout)