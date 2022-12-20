import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const url = config.backendEndpoint + "/reservations";
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (err) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  const NoBannerElem = document.getElementById("no-reservation-banner");
  const ReserveTable = document.getElementById("reservation-table-parent");

  if (reservations.length) {
    NoBannerElem.style.display = "none";
    ReserveTable.style.display = "block";
  } else {
    NoBannerElem.style.display = "block";
    ReserveTable.style.display = "none";
  }

  const parent = document.getElementById("reservation-table");

  console.log(reservations);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    formatMatcher:"basic",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true
  };
  reservations.map((item, i) => {
    const date =new Date(item.date);
    const timeString =new Date(item.time).toLocaleString("en-IN",options);
    const timeArray=timeString.split(' at');
    const timeStringPrint=timeArray.join(',');
  
    parent.innerHTML += `
      <tr>
      <td  ><strong>${item.id}</strong></td>
      <td  >${item.name}</td>
      <td  >${item.adventureName}</td>
      <td  >${item.person}</td>
      <td  >${date.toLocaleDateString("en-IN",{
        //day:'2-digit',
        //month:'2-digit',
        //year:'numeric',
      })}</td>
      <td  >${item.price}</td>
      <td  >${timeStringPrint}</td>
      <td  ><button id=${item.id} class='reserve-button'><a  href='../detail/?adventure=${item.adventure}'>Visit Adventure</a></button> </td>
      
  </tr>
      `;
  });
}

export { fetchReservations, addReservationToTable };
