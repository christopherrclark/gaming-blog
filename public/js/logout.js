const logout = async () => {
  console.log("logout function firing")
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      alert("You have logged out!")
      window.location.reload();

    } else {
      alert('Please sign in again');
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);
  