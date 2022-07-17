import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  let url = config.backendEndpoint + "/reservations/";

  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  catch(err){
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  if (reservations.length > 0) {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  }
  else {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  let tableBody = document.getElementById("reservation-table");

  for (let i = 0; i < reservations.length; i++){
    let givenDate = reservations[i].date.split("-");
    console.log(givenDate);
    let date = new Date(givenDate[0], givenDate[1] - 1, givenDate[2]);
    console.log(date);
    var options = {
      year: "numeric",
      month: "2-digit",
      day: "numeric"
    };
    date = date.toLocaleDateString("en-IN", options);
    
    let time = new Date(reservations[i].time);
    var options2 = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };
   
    let bookingDate = time.toLocaleDateString("en-IN", options2);
    let bookingTime = time.toLocaleTimeString();
    bookingTime = bookingTime.toLowerCase();
    
    bookingTime = bookingDate +", "+ bookingTime;
  
  let tableRow = document.createElement("tr");
    tableRow.innerHTML =
      `<th scope="row">${reservations[i].id}</th>
       <td>${reservations[i].name}</td>
       <td>${reservations[i].adventureName}</td>
       <td>${reservations[i].person}</td>
       <td>${date}</td>
       <td>${String(reservations[i].price)}</td>
       <td>${bookingTime}</td>
       <td>
          <div class="reservation-visit-button"  id="${reservations[i].id}">
              <a href="../detail/?adventure=${reservations[i].adventure}">Visit adventure </a>
          </div>
       </td>`;
    tableBody.append(tableRow);
  }
}

export { fetchReservations, addReservationToTable };
