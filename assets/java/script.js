

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
            'X-RapidAPI-Key': '2d700b2435msh0a7cd8e74fc4857p188924jsn21fe9f3932f0',
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
    };
    
    $.ajax(settings).done(function (response) {
        var geoString = response.data[0].geoId
        var geoId = geoString.split(';')[1]
        console.log(response);
        console.log(geoId);
        findHotels(geoId, city);

    });
}





async function findHotels(geoId, city){
    window.location.href="./html/cityStay.html";   
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels?geoId=186338&checkIn=2023-07-15&checkOut=2023-07-17&pageNumber=1&currencyCode=USD',
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2d700b2435msh0a7cd8e74fc4857p188924jsn21fe9f3932f0',
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
    };
    
    $.ajax(settings).done(function (response) {
        // window.location.href = "./html/citystay.html";
        localStorage.setItem(response);
        localStorage.setItem('city', city);
        console.log(response);
        console.log(localStorage);
    });

    console.log(localStorage);   

}
searchButton.on('click', function(event){
    event.preventDefault();
    // window.location.href="./html/cityStay.html";
    console.log('in click event')
    var city = citySearch.val();
    console.log('city', city);
    findCity(city);

});


// animejs

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