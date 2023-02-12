async function editPostFormHandler(event) {
    event.preventDefault();

    const postTitle = document.querySelector('input[name="post_title"]').value.trim();
    const postContent = document.querySelector('input[name="post_content"]').value.trim();

    //Received help for this variable 
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    const response = await fetch(`/api/posts/${id}`, {
      method: 'POST',
      body: JSON.stringify({
        postTitle,
        postContent
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to add Post');
    }
  }
  
  document.querySelector('.edit-post-button').addEventListener('submit', editPostFormHandler);