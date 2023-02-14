async function deletePostFormHandler(event) {
    event.preventDefault();

    //Received help for this variable: 
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to add Post');
    }
  }
  
  document.querySelector('.delete-something-button').addEventListener('submit', deletePostFormHandler);