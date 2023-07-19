var searchButton = $('#searchButton');
var citySearch = $('#searchCity');
var checkIn;
var checkOut;
var city;

async function findCity(city) {
  const settings = {
    async: true,
    crossDomain: true,
    url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation?query=' + city,
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'YOUR_API_KEY', // Replace with your RapidAPI key
      'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
    }
  };

  $.ajax(settings).done(function (response) {
    var geoString = response.data[0].geoId;
    var geoId = geoString.split(';')[1];
    console.log(response);
    console.log(geoId);
    findHotels(geoId, city);
  });
}

async function findHotels(geoId, city) {
  window.location.href = './html/cityStay.html';
  const settings = {
    async: true,
    crossDomain: true,
    url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels?geoId=' + geoId + '&checkIn=' + checkIn + '&checkOut=' + checkOut + '&pageNumber=1&currencyCode=USD',
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '2d700b2435msh0a7cd8e74fc4857p188924jsn21fe9f3932f0', // Replace with your RapidAPI key
      'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
    }
  };

  $.ajax(settings).done(function (response) {
    localStorage.setItem('hotels', JSON.stringify(response)); // Store response in local storage
    localStorage.setItem('city', city);
    console.log(response);
    console.log(localStorage);
  });

  console.log(localStorage);
}

searchButton.on('click', function (event) {
  event.preventDefault();
  console.log('in click event');
  var city = citySearch.val();
  console.log('city', city);
  findCity(city);
});
