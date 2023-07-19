console.log(localStorage);
var storedData = localStorage.getItem('data');
var dataArray = JSON.parse(storedData);
var storedCity = localStorage.getItem('city');
var geoId = localStorage.getItem('gedId');
var searchButton = $('#searchBtn');
var numRoom = $('roomNum')
var numAdults = $('adultsNum');
var numChild = $('childNum');
var priceMin = $('minPrice');
var priceMax = $('maxPrice');
var rating = $('rating')

var numRoomUrl = '&rooms=' + $('roomNum');
var numAdultsUrl = '&adults=' + $('adultsNum');
// var numChildUrl = '&rooms=' + $('childNum');
var priceMinUrl = '&priceMin=' + $('minPrice');
var priceMaxUrl = '&priceMax=' + $('maxPrice');
var ratingUrl = '&rating=' + $('rating'); 

var apiKey = '2d700b2435msh0a7cd8e74fc4857p188924jsn21fe9f3932f0'
var apiKey1 = '25108deademsh71d8a17d3aa10b1p1e1407jsnaf1da3a92302'

console.log(geoId);
console.log(storedCity);

$(function() {
    $("#checkInDate").datepicker({
        dateFormat: "dd-mm-yy"
    });
    $("#checkOutDate").datepicker({
        dateFormat: "dd-mm-yy"
    });

    searchButton.on('click', function(event) {
        event.preventDefault();

        var checkIn = $("#checkInDate").datepicker("getDate");
        var checkOut = $("#checkOutDate").datepicker("getDate");
        console.log("Check-in Date:", checkIn);
        console.log("Check-out Date:", checkOut);

        findHotels(checkIn, checkOut);
        
    });
});

async function findHotels(checkIn, checkOut) {
    console.log(geoId);

    var formattedCheckIn = $.datepicker.formatDate("yy-mm-dd", checkIn);
    var formattedCheckOut = $.datepicker.formatDate("yy-mm-dd", checkOut);
    console.log(formattedCheckIn);

    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels?geoId=' + geoId + '&checkIn=' + formattedCheckIn + '&checkOut=' + formattedCheckOut + '&pageNumber=1' + numAdultsUrl + numRoomUrl + 'currencyCode=USD' + ratingUrl + priceMinUrl + priceMaxUrl,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '25108deademsh71d8a17d3aa10b1p1e1407jsnaf1da3a92302',
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
    };

    $.ajax(settings).done(function(response) {
        console.log(response);
        var dataArray = response.data.data;
        console.log(dataArray[0].title);
        console.log(dataArray[0].priceDetails)
        


        for (var i = 0; i < 4; i++) {
            var hotelIndex = i + 1;
            var hotelPrim = dataArray[i].primaryInfo;
            var hotelName = dataArray[i].title;
            var hotelInfo = dataArray[i].priceDetails;
            var hotelPrice = dataArray[i].priceForDisplay;

            if (hotelInfo === null) {
                hotelInfo = hotelPrim;
                if (hotelPrim === null) {
                  hotelInfo = 'No Hotel Information Available';
                }
              }
            
            // Update the hotel name, info, and price elements in the HTML
            $('#hotelName' + hotelIndex).append(hotelName);
            $('#hotelInfo' + hotelIndex).append('Hotel info: ' + hotelInfo);
            $('#hotelPrice' + hotelIndex).append(hotelPrice);

        }
        $("#hotelColumn").removeClass("is-hidden");

    });
        // console.log()
        // console.log()

    
}

// 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels?geoId=186338&checkIn=%3CREQUIRED%3E&checkOut=2023-07-19&pageNumber=1&adults=2&rooms=2&currencyCode=USD&rating=2&priceMin=100&priceMax=200'


// url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels?geoId=' + geoId + '&checkIn=' + formattedCheckIn + '&checkOut=' + formattedCheckOut + '&pageNumber=1' + numAdultsUrl + numRoomUrl + 'currencyCode=USD' + ratingUrl + priceMinUrl + priceMaxUrl,
var unsplashApiKey = 'v_ZHZM7ccQIgp2uVQNcA09a5epEcctWEX4kxYQ3TwM8';
var unsplashApiKey1 = '5lH3PxzCuhd_HBTDBZYhWGJbPjXw2Qido0wXCLMS2Vs';
// Number of random images to fetch
// var numImages = 5;

// Container element to append the images
var imageIds = ['image1', 'image2', 'image3','image4'];

// Fetch random images from Unsplash API
function fetchAndSetImageSource(imageId) {
    // Fetch a random image from Unsplash API
    fetch('https://api.unsplash.com/photos/random?query=hotel&client_id=' + unsplashApiKey)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Get the image element by ID
        var image = document.getElementById(imageId);
  
        // Set the source URL of the image
        image.src = data.urls.regular;
  
        // Set other attributes or styles as desired
        image.alt = data.alt_description;
      })
      .catch(function(error) {
        console.log('Error:', error);
      });
  }
  
  // Loop through the image IDs and fetch/set image source URLs
  imageIds.forEach(function(imageId) {
    fetchAndSetImageSource(imageId);
  });