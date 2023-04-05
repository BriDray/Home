var signUpButton = document.querySelector('.signup-form');

const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const firstName = document.querySelector('#first_name').value.trim();
    const lastName = document.querySelector('#last_name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const name = `${firstName} ${lastName}`;
  
    if (firstName && lastName && email && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };

  
   signUpButton.addEventListener('click', signupFormHandler);