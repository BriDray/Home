var signInButton = document.getElementById('signInButton');

const loginFormHandler = async () => {
  // event.preventDefault();

  const email = document.querySelector('#e-mail').value.trim();
  const password = document.querySelector('#Password').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // document.location.replace('/');
      console.log("signed in")
      document.location.replace('/')
    } else {
      alert('Failed to log in');
    }
  }
};
 console.log("running");

// event listener for sign in button to redirect to main page
// signInButton.addEventListener("click", function(){
//   console.log("click")
//   loginFormHandler();
//   document.location.href = '/';
//   console.log("")
// });

signInButton.addEventListener('click', function(event){
  event.preventDefault();
  loginFormHandler();

  
});