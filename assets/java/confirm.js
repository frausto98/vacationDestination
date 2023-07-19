

$(window).on("load", function() {
    var confirmationData = JSON.parse(localStorage.getItem("confirmationPage"));
  
    // Retrieve the values from the confirmationData object
    var formattedCheckIn = dayjs(confirmationData.formattedCheckIn).format("MMMM D, YYYY");
  var formattedCheckOut = dayjs(confirmationData.formattedCheckOut).format("MMMM D, YYYY");
    var hotelName = confirmationData.hotelName;
    var numAdults = confirmationData.numAdults;
    var rooms = confirmationData.rooms;
    
  
    
    var hotelNameWithoutNumber = hotelName.replace(/(Featured Hotel:|\d+\.\s*)/g, "");
    $("#hotelName").text(hotelNameWithoutNumber);
    $("#checkIn").text("Check-In: " + formattedCheckIn);
    $("#checkOut").text("Checkout: " + formattedCheckOut);
    $("#adults").text("Number of Guests: " + numAdults);
    $("#roomsNum").text("Number of Rooms: " + rooms);
  });
  






function submitForm() {
    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");
    const confirmationMessage = document.getElementById("confirmationMessage");

    // Check if name and email are valid
    if (nameInput.checkValidity() && emailInput.checkValidity()) {
        // Display confirmation message and show success icon
        confirmationMessage.classList.remove("hidden");
        nameInput.value = "";
        emailInput.value = "";
    } else {
        // Show validation error messages
        nameInput.reportValidity();
        emailInput.reportValidity();
    }
}
