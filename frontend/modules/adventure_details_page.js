import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let id = new URLSearchParams(search);
  for (const [key, value] of id.entries()) {
    return value;
  }

  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const result = await fetch(
      `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    );
    const data = await result.json();
    return data;
  } catch (err) {
    return null;
  }
  // console.log(data);
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  document.getElementById("adventure-content").innerHTML = adventure.content;
  let photoGallery = document.getElementById("photo-gallery");
  adventure.images.forEach((item) => {
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute("src", `${item}`);
    div.setAttribute("class", "activity-card-image");
    div.append(img);

    photoGallery.append(div);
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML = ` <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id='innerElem'>
     
    </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;
  const innerElem = document.getElementById("innerElem");
  images.forEach((item, i) => {
    const divEle = document.createElement("div");
    i === 0
      ? divEle.setAttribute("class", "carousel-item active")
      : divEle.setAttribute("class", "carousel-item");

    const imgEle = document.createElement("img");
    imgEle.setAttribute("src", `${item}`);
    imgEle.setAttribute("alt", `${i}`);
    imgEle.setAttribute("class", `crouselImage`);
    divEle.append(imgEle);
    innerElem.append(divEle);
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  //console.log("adventure", adventure);
  const soldOutElem = document.getElementById("reservation-panel-sold-out");
  const reservPanel = document.getElementById("reservation-panel-available");
  const CostPerHelem = document.getElementById("reservation-person-cost");
  if (adventure.available) {
    soldOutElem.style.display = "none";
    reservPanel.style.display = "block";
    CostPerHelem.innerHTML = adventure.costPerHead;
  } else {
    soldOutElem.style.display = "block";
    reservPanel.style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const costPerHead = adventure.costPerHead;
  const total = costPerHead * persons;
  document.getElementById("reservation-cost").innerHTML = total;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  const form = document.getElementById("myForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const postData = {
      name: form.elements.name.value,
      date: form.elements.date.value,
      person: form.elements.person.value,
      adventure: adventure.id,
    };
    console.log(postData);
    const url = `${config.backendEndpoint}/reservations/new`;
   try{
     fetch(url, {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status === 200) {
          alert("successfull");
        } else {
          alert("failed!");
        }
      });
   } 
   catch(err){
    throw new Error(err);
   }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const ele=document.getElementById('reserved-banner');
  console.log(adventure);
  if (adventure.reserved)
  {
    ele.style.display='block';
  }
  else
  {
    ele.style.display='none';

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
