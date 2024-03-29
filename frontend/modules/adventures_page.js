import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let text = search;
  let pos = text.search("=");

  let cityName = text.slice(pos+1,);

  return cityName.toLowerCase();
  
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  let apiURL = `${config.backendEndpoint}/adventures/?city=${city}`
  
  try{
     let response = await fetch(apiURL);
     let adventureData = await response.json();
     return adventureData;
  }

  catch (err) {
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let rowElement = document.getElementById("data"); 

  for (let i = 0; i < adventures.length; i++){

    let colElement = document.createElement("div");
    colElement.className = "col-6 col-sm-2 col-md-4 col-lg-4 col-xl-3 mb-2 gx-1";
    let adventureDetailsUrl = `detail/?adventure=${adventures[i].id}`;
    
     colElement.innerHTML = 
     `
    <a href=${adventureDetailsUrl} id=${adventures[i].id}>
    
      <div class="activity-card">
        <img src=${adventures[i].image} alt="Image not found">
          <div class="category-banner">${adventures[i].category}</div>
            <div class="activity-card-text w-100 mt-3">
        
              <div class="d-block d-md-flex justify-content-between">
                <p class="ps-3 pe-3 activity-card-heading">${adventures[i].name}</p>
                <p class="ps-3 pe-3">₹${adventures[i].costPerHead}</p>
              </div> 
              <div class="d-block d-md-flex justify-content-between">
                <p class="ps-3 pe-3 activity-card-heading">Duration</p>
                <p class="ps-3 pe-3">${adventures[i].duration} Hours</p>
              </div>   
            </div>
          </div>
      </div>
    </a>`;
    rowElement.append(colElement);
     
  }

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  let filteredList = [];
    for (let i=0; i<list.length; i++){
      if (list[i].duration >= low && list[i].duration<=high){
        filteredList.push(list[i]);
      }
    }

  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  let filteredList = []; 

  for (let i=0; i<list.length; i++){

  let presentCategory = list[i].category;
  let pos = categoryList.indexOf(presentCategory);

  if (pos !== -1){
    filteredList.push(list[i]);
  }
  }

  return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  let categoryList = filters["category"];
  let durationStr = filters["duration"];

  let categoryLength = filters["category"].length; 
  let durationLength = filters["duration"].length;

  if (durationLength>0 && categoryLength>0){
     //filterByDuration();
    let pos = durationStr.indexOf("-");
    let lowStr = durationStr.slice(0,pos);
    let highStr = durationStr.slice(pos+1);

    let low = parseInt(lowStr);
    let high = parseInt(highStr); 
    
    let filteredList1 = filterByCategory(list, categoryList);
    let filteredList2 = filterByDuration(filteredList1, low,high);
    return filteredList2;
  }

  else if (durationLength>0) {
    let pos = durationStr.indexOf("-");
    let lowStr = durationStr.slice(0,pos);
    let highStr = durationStr.slice(pos+1);

    let low = parseInt(lowStr);
    let high = parseInt(highStr); 
    
    return filterByDuration(list, low, high);
  }

   else if (categoryLength>0){
     return filterByCategory(list,categoryList);
   }

   else {
    return list;
   }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  window.localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  
  let filters = window.localStorage.getItem('filters');
  return JSON.parse(filters);
  
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  
  // update the Duration Filter value 
  if (filters["duration"].length > 0) {
    let durationStr = filters["duration"];
    let options = document.getElementById("duration-select").options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].id === durationStr) {
        document.getElementById("duration-select").selectedIndex = i;
        break;
      }
    }
  }
  //Generate Category Pills
  let categoryList = filters["category"];
  let categoryLength = categoryList.length;
  
  let categoryPills = document.getElementById("category-list");

  for (let i=0; i<categoryLength; i++){
    
    let pillContent = document.createElement("div");
    pillContent.setAttribute("class", "category-filter");
    pillContent.setAttribute("id", categoryList[i]);

    pillContent.innerHTML =
      `${categoryList[i]}
      <div class="closecategory close" style="cursor : pointer; display:inline" onclick="clearOneCategory(event)">x</div>`;
    pillContent.getElementsByClassName("closecategory")[0].id = categoryList[i];
    categoryPills.appendChild(pillContent);

  }
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
