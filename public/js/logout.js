const logout = async () => {
  const response = await fetch('/logout', {
    method: 'GET', 
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

document.querySelector('#logout').addEventListener('click', logout);
