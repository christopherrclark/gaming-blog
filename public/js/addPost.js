



const addPostHandler = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector('h1[name="post-title"]').textContent;
  const postContent = document.querySelector('textarea[name="post-content"]').value;
     console.log(postContent);
     console.log(postTitle);
  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      post_title: postTitle,
      post_content: postContent,
      post_date: new Date()
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
};

document.querySelector('#add-post-form').addEventListener('submit', addPostHandler);

