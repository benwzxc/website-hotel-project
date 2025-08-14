const cards = document.querySelector('#cards');

function fetchAndDisplayHotels(jsonPath) {
  const hotelGroupContainer = document.createElement('div');
  hotelGroupContainer.setAttribute('class', 'hotels');
    
  fetch(jsonPath)
    .then(res => res.json())
    .then(data => {
      data.forEach(post => {
        hotelGroupContainer.insertAdjacentHTML('beforeend', `
          <div class="hotel-card">
            <h2>${post.name}</h2>
            <div>
              <img src="${post.photo_path}" alt="Photo of ${post.name}">
              <video src="${post.video_path}" controls></video>
            </div>
            <h3>${post.ratings} ★</h3>
            <p>${post.description}</p>
          </div>
        `);
      });
      cards.appendChild(hotelGroupContainer);
    })
    .catch(error => {
      console.error(`Error fetching data from ${jsonPath}:`, error);
      cards.innerHTML += `<p>Sorry, we could not load hotel information from ${jsonPath}.</p>`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const pathPart = path.split('/')[2]; 
  if (pathPart) {
    const region = pathPart.split('_')[0];
    const jsonPath = `./json/${region}-hotels.json`; 
    cards.innerHTML = '<p class="loading-message">Finding the best hotels...</p>';
    fetchAndDisplayHotels(jsonPath);
} else if (!pathPart) {
    return;
}
});
