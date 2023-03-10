import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
console.log('jdsdj',cities)

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    const result=await fetch(`${config.backendEndpoint}/cities`);
    let data= await result.json();
    return data;
  }
catch(err)
{
  return null;
}
  

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let parent=document.getElementById('data')
  console.log('parent',parent)
  parent.innerHTML+=`
  <div class="col-sm-6 col-md-3 my-3">
  <a id=${id} href="pages/adventures/?city=${id}">
    <div class="tile">
      <img src=${image} alt=${city} />
      <div class="tile-text">
        <h4>${city} </h4>
        <span>${description} </span>
      </div>
    </div>
  </a>
</div>
`

}

export { init, fetchCities, addCityToDOM };
