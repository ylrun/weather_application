const apiKey = 'Your_Key';
const pixabayApiKey = 'Your_Key'; 

document.getElementById('search-btn').addEventListener('click', () => {
    const cityName = document.getElementById('city-input').value.trim();
    if (cityName) {
        fetchWeatherData(cityName);
        document.getElementById('city-input').value = ''; 
    } else {
        alert('Please enter a city name.');
    }
});

document.getElementById('city-input').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        document.getElementById('search-btn').click();
    }
});

async function fetchWeatherData(city) {
    const loadingSpinner = document.getElementById('loading-spinner');
    try {
        loadingSpinner.classList.remove('hidden');
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
                city
            )}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
            throw new Error('City not found.');
        }
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        alert(error.message);
    } finally {
        loadingSpinner.classList.add('hidden');
    }
}

async function fetchCityImage(city) {
    try {
        const response = await fetch(
            `https://pixabay.com/api/?key=${pixabayApiKey}&q=${encodeURIComponent(
                city + ' famous historic and cultural sites'
            )}&image_type=photo&orientation=horizontal&per_page=3`
        );
        const data = await response.json();
        if (data.hits && data.hits.length > 0) {
            return data.hits[0].webformatURL;
        } else {
            return 'default-city.jpg'; // Use a default image if none found
        }
    } catch (error) {
        console.error('Error fetching city image:', error);
        return 'default-city.jpg'; // Use a default image on error
    }
}

// Function to map OpenWeatherMap weather codes to Weather Icons classes
function getWeatherIconClass(weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        return 'wi-thunderstorm';
    } else if (weatherId >= 300 && weatherId < 500) {
        return 'wi-sprinkle';
    } else if (weatherId >= 500 && weatherId < 600) {
        return 'wi-rain';
    } else if (weatherId >= 600 && weatherId < 700) {
        return 'wi-snow';
    } else if (weatherId >= 700 && weatherId < 800) {
        return 'wi-fog';
    } else if (weatherId === 800) {
        return 'wi-day-sunny';
    } else if (weatherId > 800 && weatherId < 900) {
        return 'wi-cloudy';
    } else {
        return 'wi-na';
    }
}

async function displayWeatherData(data) {
    const weatherContainer = document.getElementById('weather-container');

    // Check for duplicate cities
    const existingCards = weatherContainer.getElementsByClassName('weather-card');
    for (let card of existingCards) {
        if (card.dataset.id == data.id) {
            alert('City already added.');
            return;
        }
    }

    // Create weather card
    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weather-card');
    weatherCard.dataset.id = data.id; // Store city ID

    // Get weather icon class
    const weatherId = data.weather[0].id;
    const iconClass = getWeatherIconClass(weatherId);

    // Fetch city image
    const cityImageUrl = await fetchCityImage(data.name);

    // Populate the card content
    weatherCard.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${cityImageUrl}" alt="${data.name}" class="city-image">
        <div class="weather-details">
            <i class="wi ${iconClass} weather-icon"></i>
            <div class="weather-info">
                <p><i class="fas fa-thermometer-half"></i> <strong>Temperature:</strong> ${data.main.temp} °C</p>
                <p><i class="fas fa-cloud"></i> <strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><i class="fas fa-tint"></i> <strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><i class="fas fa-wind"></i> <strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            </div>
        </div>
    `;

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close-btn');
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    
    // Add event listener to remove the card when the close button is clicked
    closeBtn.addEventListener('click', () => {
      weatherContainer.removeChild(weatherCard);
    });
    
    // Append close button to card after setting innerHTML
    weatherCard.appendChild(closeBtn);

    // Append card to container
    weatherContainer.appendChild(weatherCard);

    // Initialize draggable functionality for the new card
    interact(weatherCard).draggable({
        inertia: true,
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true,
            }),
        ],
        autoScroll: true,
        listeners: {
            move: dragMoveListener,
        },
    });

    // Add dragend listener to remove dragging class
    interact(weatherCard).on('dragend', function (event) {
        event.target.classList.remove('dragging');
    });
}

// Initialize interact.js for existing elements
function initializeDraggable() {
    interact('.weather-card').draggable({
        inertia: true,
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true,
            }),
        ],
        autoScroll: true,
        listeners: {
            move: dragMoveListener,
        },
    });

    // Add dragend listener to remove dragging class
    interact('.weather-card').on('dragend', function (event) {
        event.target.classList.remove('dragging');
    });
}

function dragMoveListener(event) {
    var target = event.target;
    target.classList.add('dragging');

    // Keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // Translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    // Update the position attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

// Call initializeDraggable when the page loads
window.addEventListener('load', initializeDraggable);
