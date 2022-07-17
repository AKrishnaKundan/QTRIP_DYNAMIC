import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let text = search;
  let pos = text.search("=");

  let id = text.slice(pos + 1,);
 
  return id;
  
  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  let apiURL = `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`

  try {
     let response = await fetch(apiURL);
     let adventureDetails = await response.json();

     return adventureDetails;
  }

  catch(err){
    return null;
  }

  // Place holder for functionality to work in the Stubs
  //return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  let adventureName = document.getElementById("adventure-name");
  adventureName.textContent = adventure.name;

  let adventureSubtitle = document.getElementById("adventure-subtitle");
  adventureSubtitle.textContent = adventure.subtitle;
 
  let imagesArr = adventure.images;

  addBootstrapPhotoGallery(imagesArr);
  let adventureContent = document.getElementById("adventure-content");
  adventureContent.textContent = adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  let photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML =
    `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carouselEle">
    <div class="carousel-item active">
       <img src="${images[0]}" class="d-block w-100 activity-card-image" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
  
    let carouselEle = document.getElementById("carouselEle");
  for (let i = 1; i < images.length; i++){
  
    let carouselItem = document.createElement("div");
    carouselItem.setAttribute("class", "carousel-item");

    carouselItem.innerHTML =
       `<img src="${images[i]}" class="d-block w-100 activity-card-image" alt="...">`
    carouselEle.appendChild(carouselItem);
  }

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available === true) {
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    let costPerHeadEle = document.getElementById("reservation-person-cost");
    costPerHeadEle.textContent = adventure.costPerHead;
    document.getElementById("reservation-panel-available").style.display = "block";
  }
  else {
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
   console.log(adventure.costPerHead * persons);
  document.getElementById("reservation-cost").textContent = adventure.costPerHead * persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
 
  let myForm = document.getElementById("myForm"); 
  let formElements = myForm.elements;
  let url = config.backendEndpoint + "/reservations/new";

  myForm.addEventListener("submit", async event => {
    event.preventDefault();
    let bodyString = JSON.stringify({
      name: formElements["name"].value,
      date: formElements["date"].value,
      person: formElements["person"].value,
      adventure: adventure.id,
    });
    try {
      let res = await fetch(url, {
        method: "POST",
        body: bodyString,
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (res.ok) {
        alert("Reservation successful");
        window.location.reload(true);
      }
      else {
        alert("Reservation failed");
      }
    }
    catch(err){
      alert("Reservation failed");
    }
  })
  
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved === true) {
    document.getElementById("reserved-banner").style.display = "block";
  }
  else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
