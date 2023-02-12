async function newPostHandler(event) {
    event.preventDefault();

    const commentContent = document.querySelector('input[name="comment_content"]').value;

    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        commentContent
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
  
  document.querySelector('.add-post-form').addEventListener('submit', newPostHandler);
