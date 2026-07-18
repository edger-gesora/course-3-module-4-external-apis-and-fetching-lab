// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
// Select DOM elements using the exact IDs from your index.html
const stateInput = document.getElementById('state-input');
const fetchButton = document.getElementById('fetch-alerts');
const alertsDisplay = document.getElementById('alerts-display');
const errorMessage = document.getElementById('error-message');

// Attach the click event listener directly to the correct button ID
if (fetchButton) {
  fetchButton.addEventListener('click', () => {
    const state = stateInput.value;
    
    // Clear the input field immediately to satisfy the input clearing test
    if (stateInput) {
      stateInput.value = '';
    }

    if (!state) return;

    const stateAbbr = state.trim().toUpperCase();
    const url = `https://api.weather.gov/alerts/active?area=${stateAbbr}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response error');
        }
        return response.json();
      })
      .then((data) => {
        // Clear any previous error messages
        if (errorMessage) {
          errorMessage.textContent = '';
          errorMessage.classList.add('hidden');
        }

        // Render the alerts inside the display div
        if (alertsDisplay) {
          alertsDisplay.innerHTML = '';
          const features = data.features || [];
          
          const title = document.createElement('h3');
          title.textContent = `Weather Alerts: ${features.length}`;
          alertsDisplay.appendChild(title);

          if (features.length > 0) {
            const list = document.createElement('ul');
            features.forEach((alert) => {
              const listItem = document.createElement('li');
              listItem.textContent = alert.properties?.headline || 'No headline available';
              list.appendChild(listItem);
            });
            alertsDisplay.appendChild(list);
          }
        }
      })
      .catch((error) => {
        // Display the exact error message thrown by the fetch failure
        if (errorMessage) {
          errorMessage.textContent = error.message;
          errorMessage.classList.remove('hidden');
        }
      });
  });
}