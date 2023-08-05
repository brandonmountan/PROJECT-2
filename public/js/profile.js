const delButtonHandler = async (event) => {
    console.log('Delete button clicked!');
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
  
        const response = await fetch(`/item/${id}`, {
            method: 'DELETE',
    });

    console.log(response);
  
    if (response.ok) {
        document.location.replace('/profile');
    } else if (response.status === 404) {
        alert('Item not found.');
    } else {
        alert('Failed to delete item.');
    }
    }
};

document
  .querySelector('.delete-item-btn')
  .addEventListener('click', delButtonHandler);