const loginFormHandler = async (event) => { // Login form handler
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim(); // Get the email and password from the login form
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) { // Check if the email and password fields aren't empty
    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }), // Send a POST request to the server with the email and password
      headers: { 'Content-Type': 'application/json' }, // Set the content type to JSON
    });

    const responseData = await response.json(); // Parse the JSON response

    if (response.ok) {
      // Redirect to the homepage if login is successful
      document.location.replace('/');
    } else {
      // Show the error message on the page
      const errorMessage = responseData.message || 'Failed to log in.';
      alert(errorMessage);
    }
  }
};
