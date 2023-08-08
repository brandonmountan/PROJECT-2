// this is for search result query 
Item.search = async function(query) {
  return this.findAll({
    where: {
      // Search the name and description fields (adjust as needed)
      [Op.or]: [
        { item_name: { [Op.like]: `%${query}%` } },
        { description: { [Op.like]: `%${query}%` } }
      ]
    }
  });
}

//this is message for checkout button when it is triggered
function checkout() {
  alert("Thank you for your purchase!");
}

//this one is for add to cart button to notify the user that the item is added to cart
window.onload = function() {
  // Check localStorage on window load
  if (localStorage.getItem('buttonClicked')) {
      document.querySelector('.addToCartButton').style.backgroundColor = "red";
  }
}

function changeColor(event, button) {
  // Prevent the form from submitting
  event.preventDefault();

  button.style.backgroundColor = "purple";

  // Set a value in localStorage
  localStorage.setItem('buttonClicked', true);

}

function contactUs() {
  alert("Thank you for your message!");
}

//this is for delete item using item id
function deleteItem(itemId) {
    fetch(`/delete-item/${itemId}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.ok) {
          window.location.reload();
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data.message); 
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/delete-item/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete item');
      }
    }
  };
// Function to handle removing an item from the cart
async function removeFromCart(cartId) {
  try {
    const response = await fetch(`/remove-from-cart/${cartId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      window.location.reload();
    } else {
      console.log('Error removing item from cart');
    }
  } catch (error) {
    console.error(error);
  }
}
