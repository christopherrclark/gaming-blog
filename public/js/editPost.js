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

  //Creating a function to add a like event to the "like" button
  async function likePostHandler(event) {
    event.preventDefault();
    const postId = event.target.getAttribute("data-id");

    //Here we update the "number of likes" in the model itself.
    const response = await fetch(`/api/posts/${postId}/like`, {
      method: "PUT",
    });
    if (response.ok) {

      //Once we know the first response is successful/the number of likes has been updated, we get the updated post data
      const secondResponse = await fetch(`/api/posts/${postId}`);

      //Checking to see if the second fetch was successful
      if (secondResponse.ok) {

        //Now we convert the second response to json (not only to avoid the damn "type error") to parse it in the future
        const postData = await secondResponse.json();

        //Now we get the location of that "like number",
        const likeCount = document.querySelector(`#like-count-${postId}`);

        //and update it with the secondResponse, now in a parsable format
        likeCount.textContent = postData.likes;
      }
    } else {
      alert("Failed to like post");
    }
  }
  
  document.querySelectorAll(".like-post-button").forEach((button) => {
    button.addEventListener("click", likePostHandler);
  });
  
  if (document.querySelector('.edit-post-button')) {
    document.querySelector('.edit-post-button').addEventListener('submit', editPostFormHandler);
  }
    