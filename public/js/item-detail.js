document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch item details from the backend using Fetch API
    function fetchItemDetails() {
      // Replace '/api/items' with the actual API endpoint for retrieving item details
      return fetch('/api/items')
        .then(response => response.json())
        .catch(error => {
          console.error('Error fetching item details:', error);
          return [];
        });
    }
  
    // Function to display the item details in the result container
    function displayItemDetails(items) {
      const resultContainer = document.getElementById('resultContainer');
      
      // Loop through the retrieved items and create HTML elements for each item
      items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        const title = document.createElement('h4');
        title.classList.add('card-title');
        title.textContent = item.title;
        const description = document.createElement('p');
        description.classList.add('card-text');
        description.textContent = item.description;
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary');
        button.setAttribute('type', 'button');
        button.textContent = 'Button';
  
        // Append the elements to the result container
        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(button);
        card.appendChild(cardBody);
        resultContainer.appendChild(card);
      });
    }
  
    // Fetch item details and display them in the result container
    fetchItemDetails().then(data => {
      displayItemDetails(data);
    });
  });
  