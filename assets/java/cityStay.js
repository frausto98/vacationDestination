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
            'X-RapidAPI-Key': '2d700b2435msh0a7cd8e74fc4857p188924jsn21fe9f3932f0',
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
    };

    $.ajax(settings).done(function(response) {
        console.log(response);
    });
}

// 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels?geoId=186338&checkIn=%3CREQUIRED%3E&checkOut=2023-07-19&pageNumber=1&adults=2&rooms=2&currencyCode=USD&rating=2&priceMin=100&priceMax=200'


// url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels?geoId=' + geoId + '&checkIn=' + formattedCheckIn + '&checkOut=' + formattedCheckOut + '&pageNumber=1' + numAdultsUrl + numRoomUrl + 'currencyCode=USD' + ratingUrl + priceMinUrl + priceMaxUrl,
