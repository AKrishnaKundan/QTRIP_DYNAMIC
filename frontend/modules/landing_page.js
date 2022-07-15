import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
   let response = await fetch(`${config.backendEndpoint}/cities`);
   let user = await response.json();
   console.log(user);
   return user;
  }

  catch(err){
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
   
    let ele = document.getElementById("data");

    let col_div = document.createElement("div");
    col_div.className="col-12 col-sm-6 col-lg-3 mb-4";
    ele.append(col_div);

    let a_tag = document.createElement("a");
    a_tag.href=`pages/adventures/?city=${city}`;
    a_tag.id = id;
    col_div.append(a_tag);

    let tile_ele = document.createElement("div");
    tile_ele.className="tile";
    a_tag.append(tile_ele);

   
    let city_image = document.createElement("img");
    city_image.src = image;
 
    tile_ele.append(city_image);

    let tile_text = document.createElement("div");
    tile_text.className = "tile-text";
    tile_text.innerHTML = 
    `  <p>${city} <br> ${description}</p>
    `;

    tile_ele.append(tile_text);
}


export { init, fetchCities, addCityToDOM };
