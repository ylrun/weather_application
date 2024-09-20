City Weather App
This project is a simple weather application that allows users to search for weather information in various cities and view the current weather conditions for those cities. The app fetches data from the OpenWeatherMap API and displays additional information such as temperature, humidity, wind speed, and weather conditions using icons. Users can also view an image of the city, fetched from the Pixabay API, to enhance the visual experience.

Features
Search for cities by name to view current weather data
Display temperature, humidity, wind speed, and weather conditions with appropriate icons
Fetch and display a relevant image of the city from Pixabay
Add and manage multiple cities with draggable weather cards
Responsive design for both desktop and mobile devices
Technologies Used
HTML5: For structuring the web page
CSS3: For styling the application (including custom weather card design)
JavaScript (ES6+): For handling DOM manipulation and API calls
OpenWeatherMap API: For retrieving weather data
Pixabay API: For retrieving images of cities
Interact.js: For enabling draggable functionality on weather cards
Getting Started
Follow these instructions to get a copy of the project running on your local machine.

Prerequisites
API Keys: You will need API keys for both OpenWeatherMap and Pixabay. Sign up on their websites to get your keys:
OpenWeatherMap API
Pixabay API
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/city-weather-app.git
Navigate to the project directory:

bash
Copy code
cd city-weather-app
Open the index.html file in your browser.

Configuration
In the app.js file, replace the placeholder values apiKey and pixabayApiKey with your actual API keys:

javascript
Copy code
const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
const pixabayApiKey = 'YOUR_PIXABAY_API_KEY';
Usage
Enter the name of a city in the input field and click the "Add City" button to fetch the weather data.
The weather information, along with a city image, will be displayed in a draggable weather card.
Click the close button (X) on any card to remove it from the display.
You can drag the weather cards around the screen as needed.
Draggable Functionality
Weather cards are made draggable using the Interact.js library. To use the drag functionality:

Click and hold the weather card, then drag it to a new position.
Release the card to set its new position.