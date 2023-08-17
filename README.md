# vacationDestination

## Technology Used, Deployment, and Repository

| Application and Technology       | Resource URL           | 
| ------------- |:-------------:| 
| Deployed Site | [https://frausto98.github.io/vacationDestination](https://frausto98.github.io/vacationDestination)     | 
| Our Github Repository | [https://github.com/frausto98/vacationDestination](https://github.com/frausto98/vacationDestination)     | 
| Javascript    | [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) | 
JQuery   | [https://www.w3schools.com/jquery/jquery_syntax.asp](https://www.w3schools.com/jquery/jquery_syntax.asp) |  
| Bulma        | [https://getbootstrap.com/docs/5.3/getting-started/introduction/](https://getbootstrap.com/docs/5.3/getting-started/introduction/) |
| Tripadvisor API          | [https://rapidapi.com/DataCrawler/api/tripadvisor16](https://rapidapi.com/DataCrawler/api/tripadvisor16) |
| Unsplash API | [https://unsplash.com/documentation](https://unsplash.com/documentation)     | 
| Animejs | [https://animejs.com/documentation/](https://animejs.com/documentation/)     | 
| JQUERY UI | [https://jqueryui.com/](https://jqueryui.com/)     | 


## Description:
We have built a hotel finder   SO THAT you can plan your next Vacation Destination. The application is a search engine where you can look up a location and find places to stay within that area. You can input very specific information such as: Check-in and Check-out dates, how many days are staying, how many rooms, and the price. You can then choose between four hotel options, click the reserve button on one of them, and then you'll be directed to a brief summary page where you can leave your name and email.

We followed the following User Stories to develope the mental idea of what we will be using for our website and what our website will be all about:
```md
GIVEN a hotel rservation service
I WANT to search for a city to plan my location
SO THAT I can plan my vacation in my desired city

I WANT to be directed to a page to clarify my parameters for the hotel
SO THAT I can choose the price, number of rooms,  check in and check out dates

WHEN I enter my parameters for the specified hotel
THEN I am presented with a list of hotels including the price

WHEN I choose the specified hotel
THEN I am directed to a confirmation page to input my name and email information

I WANT to be able to enter my email address and name
SO THAT I can receive I confirmation for my reservation
```

Here's is a gif showing how the website works:

<img src ="https://media.giphy.com/media/fidhUgcoTfJiAJjYnL/giphy.gif" height = "400" width = "700"> </img>


This application was put together thanks to the use of Bulma.io, Unsplash API, TripAdivsor API, and Animejs API.


## Table of Contents

* [Tripadvisor, Unsplash, Animejs, and Bulma](#tripadvisor-unsplash-animejs-and-bulma)
* [Installation](#installation)
* [Usage](#usage)
* [Learning Points](#learning-points)
* [Credits](#credits)
* [License](#license)

## Tripadvisor, Unsplash, Animejs, and Bulma

### Bulma

The format and styling of this project involved the implementation of Bulma io, a css framework that involves classes, modifiers, and specific syntax to manipulate HTML code and it's appearance. 

```html
<div id="fillOutContatiner" class="tile is-ancestor is-vertical is-12">
    ...

<div id="hotelColumn" class=" is-hidden is-centered container">

        <div class="columns is-variable is-8">
          <div class="column">
            <div class="box content has-background-grey">
              <img id="image1">
              <h3 id="hotelName1">Featured Hotel: </h3>
              <p id="hotelInfo1"></p>
              <p id="hotelPrice1">Hotel Price:</p>
              <button class="reserve-btn button is-info">Reserve Now</button>
            </div>
          </div>
```

Rather than utilizing CSS to hide certain classes and control their size, bulma makes it easier to control these elements by simply typing out the direction, size, and class modifier within the class itself in HTML.

### Tripadvisor

The Tripadvisor API we used allowed us to access hotels given the city, check-in and check-out dates, price, and rating. The most challenging part of this API was being able to efficiently utilize the different endpoints and translate them into an easy GUI for the user to easily input these values.

```js
searchButton.on('click', function(event){
    event.preventDefault();
    var city = citySearch.val().toLowerCase();
    city = city.split(' ').join('%20');
    console.log('city', city);
    findCity(city);

});

async function findCity(city) {
    console.log(city);
  
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation?query=' + city,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bffcc9a048mshe59ea5b3089de14p1f41b1jsn84b09936a31a',
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
    };
...
}
```

The first endpoint we utilized was the search city endpoint, that we needed to obtain the geoId that would then be utilized for the sequential endpoint based on user input. We did this by obtaining the the users inputted city through an event listener and transforming these values for the ajax fetch request, witch in this case was the city being all lower case and including '%20' in it's empty spaces.

```js
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
            'X-RapidAPI-Key': 'bffcc9a048mshe59ea5b3089de14p1f41b1jsn84b09936a31a',
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
    };

    $.ajax(settings).done(function(response) {
        console.log(response);
        var dataArray = response.data.data;
        ...
    }
}
```

The next step was to link the user to the city reservation page, where they were allowed to specify the amount of days with they wish to stay, the rating of the hotel, its price, the number of rooms, and number of guests. The date was selected via a Jquery ui datepicker widget that was then transformed along with the other values to match the URL. The final step was to simply append the searched hotels onto the page.


### Unsplash API

The Unsplash API allowed us to add images to the hotel options page and worked very similarly to the Tripadvisor API. 

```js 
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
```

We included id tags for each location we wanted the image to be appended, which we then listed as a array named imageIds. The API url included 'query=hotel' to obtain images of hotels. We then added the obtained API request results onto the imageId array and performed a forEach function to append these urls onto each image id tag. 



### Animejs

Animejs is a javascript library that allows you to manipulate and animate your project and works with CSS properties, DOM attributes, and Javascript objects. We utilized this library to create a sliding image animation on the welcoming page.

<img src ="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDQwYWR5MzRsc202ZHZtdWZmaHZsdm1jZXFiOWRzcDJvcmYxcDQ3eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2r7rZnpMpNnpqZCrjs/giphy.gif" height = "400" width = "700"> </img>


Installation of animejs was fairly simple as the animejs website provided a github repository with all the necessary steps for downloading and utilizing the library.

```js 
window.onload = function() {
    var duration = 2000;
    var delta = 1000;
  
    var load = document.getElementById("load");
    var container = document.getElementById("container");
    var slides = document.querySelectorAll('.slide');
  
  
    imagesLoaded(container, function() {
     
      container.style.opacity = 1;
  
      var totalDuration = duration * slides.length;
      var animationDuration = totalDuration + (slides.length - 1) * delta;
  
      slides.forEach(function(slide, index) {
        slide.style.zIndex = slides.length + index;
  
        var tm = anime.timeline({
          loop: true,
          duration: totalDuration,
        });
  
    
        tm.add({
          targets: slide,
          translateX: ['-100vw', '0'],
          easing: 'linear',
          duration: duration,
          delay: index * duration,
        }).add({
          targets: slide,
          translateX: ['0', '100vw'],
          easing: 'linear',
          duration: duration,
          delay: (slides.length - index - 1) * duration + delta,
        });
  
       
        if (index === 0) {
          slide.classList.add('active');
        }
      });
    });
  };

```

The actual utilization of Animejs as a Javascript library was, however, a bit nuanced. The imagesLoaded function was included in a package that allowed included properties in order for the function to work properly. The animation involved variables and properties like delta, duration, index, z-index, and opacity that controlled the animation's duration, delay, order, and it's presentation. The animation operated as a loop with each ".add" working almost as an object describing the individual properties of each part of the animation. The first add worked to bring the image into the screen, seen with translateX, and the second add dexcribed how the images would slide off the screen. 

## Installation:
No installation needed, simply visit the deployed website at: https://frausto98.github.io/vacationDestination

## Usage:
To use, simply input your location, just a city name. You'll then be directed to select dates from a drop down, input how many rooms needed, how many adults, and then input the minimun and maximum prices. Then, a choice of four hotels will pop up, where you must select one to reserve, then you'll be directed to a summary page. There you will input your name and email to be contacted (not really).


## Credits:
Credits to:
* [Karen Shirvanyan](https://github.com/ShirvanyanKaren)
* [Brett Burrington](https://github.com/BrettBurrington)
* [Adrian Frausto](https://github.com/frausto98)

## License 

MIT licensing with permisions such as commercial use, modification, distribution and private use. Limitations include liability and warranty.