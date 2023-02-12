//This is derived from activity 17, Session Storage. Routes, event handlers, ect should be changed accordingly

const loginFormHandler = async (event) => {
    event.preventDefault();

    try {
      const email = await document.querySelector('#email-login').value.trim();
      const password = await document.querySelector('#password-login').value.trim();
    
      // /api/userRoutes
  
      if (email && password) {
        const response = await fetch('/api/users/login', {
          method: 'post',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          alert("Log in successful!")
          document.location.replace('/dashboard');
        } else {
          alert('Failed to log in.');
        }
      }
    } catch (err) {
      console.log(err);
    }

  };

  document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);


  //=====sign up=====
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        alert("sign up successful"),
        document.location.replace('/dashboard');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
