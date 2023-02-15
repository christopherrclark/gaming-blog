async function deletePostFormHandler(event) {
    event.preventDefault();
    const idToDelete = event.target.getAttribute("data-id");
    const response = await fetch(`/api/posts/${idToDelete}`, {
      method: 'DELETE',
      });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete Post');
    }
  }
  
  Array.from(document.querySelectorAll('.delete-something-button')).forEach(button => {
    button.addEventListener('click', deletePostFormHandler);
  })