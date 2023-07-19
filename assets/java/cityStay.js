console.log(localStorage);
var storedData = localStorage.getItem('data');
var dataArray = JSON.parse(storedData);
var storedCity = localStorage.getItem('city');
var geoId = localStorage.getItem('geoId');
var searchButton = $('#searchBtn');
var numRoom = $('#roomNum');
var numAdults = $('#adultsNum');
var numChild = $('#childNum');
var priceMin = $('#minPrice');
var priceMax = $('#maxPrice');
var rating = $('#rating');


// var reserveBtn = $('.reserve-btn');

var apiKey = '2d700b2435msh0a7cd8e74fc4857p188924jsn21fe9f3932f0'
var apiKey1 = '25108deademsh71d8a17d3aa10b1p1e1407jsnaf1da3a92302'
var formattedCheckIn;
var formattedCheckOut;

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
    var numRoomUrl = '&rooms=' + $('#roomNum').val();
    var numAdultsUrl = '&adults=' + $('#adultsNum').val();
    var priceMinUrl = '&priceMin=' + $('#minPrice').val();
    var priceMaxUrl = '&priceMax=' + $('#maxPrice').val();
    var ratingUrl = '&rating=' + $('#rating').val(); 
    formattedCheckIn = $.datepicker.formatDate("yy-mm-dd", checkIn);
    formattedCheckOut = $.datepicker.formatDate("yy-mm-dd", checkOut);
    console.log(formattedCheckIn);
    var roomConfirm = {
        formattedCheckIn: formattedCheckIn,
        formattedCheckOut: formattedCheckOut,
        rooms: $('#roomNum').val(),
        numAdults: $('#adultsNum').val(),

    }
    localStorage.setItem('confirmationPage', JSON.stringify(roomConfirm))

    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels?geoId=' + geoId + '&checkIn=' + formattedCheckIn + '&checkOut=' + formattedCheckOut + '&pageNumber=1' + numAdultsUrl + numRoomUrl + '&currencyCode=USD' + ratingUrl + priceMinUrl + priceMaxUrl,
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


    
}



// 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels?geoId=186338&checkIn=%3CREQUIRED%3E&checkOut=2023-07-19&pageNumber=1&adults=2&rooms=2&currencyCode=USD&rating=2&priceMin=100&priceMax=200'


// url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels?geoId=' + geoId + '&checkIn=' + formattedCheckIn + '&checkOut=' + formattedCheckOut + '&pageNumber=1' + numAdultsUrl + numRoomUrl + 'currencyCode=USD' + ratingUrl + priceMinUrl + priceMaxUrl,
var unsplashApiKey = 'v_ZHZM7ccQIgp2uVQNcA09a5epEcctWEX4kxYQ3TwM8';
var unsplashApiKey1 = '5lH3PxzCuhd_HBTDBZYhWGJbPjXw2Qido0wXCLMS2Vs';

var numImages = 4;

var imageIds = ['image1', 'image2', 'image3','image4'];


function fetchAndSetImageSource(imageId) {
    
    fetch('https://api.unsplash.com/photos/random?query=hotel&client_id=' + unsplashApiKey1)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
    
        var image = document.getElementById(imageId);
  
        
        image.src = data.urls.regular;
  
       
        image.alt = data.alt_description;
      })
      .catch(function(error) {
        console.log('Error:', error);
      });
  }
  
 
  imageIds.forEach(function(imageId) {
    fetchAndSetImageSource(imageId);
  });

  $('.reserve-btn').click(function(){
    console.log($(this));
    var imageHotel = $(this).siblings('img').attr('src');
    var hotelName = $(this).siblings('h3').text();
    console.log(hotelName);
    var hotelParams = JSON.parse(localStorage.getItem('confirmationPage'));
    hotelParams.hotelName = hotelName;
    hotelParams.imageSource = imageHotel;
    localStorage.setItem('confirmationPage', JSON.stringify(hotelParams));
    window.location.href = "./confirm.html"
});

