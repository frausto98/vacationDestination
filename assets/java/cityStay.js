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