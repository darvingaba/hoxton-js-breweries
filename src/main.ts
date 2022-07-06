type Brewery = {
  address_2: null;
  address_3: null;
  brewery_type: string;
  city: string;
  country: string;
  county_province: null;
  created_at: string;
  id: number;
  latitude: string;
  longitude: string;
  name: string;
  obdb_id: string;
  phone: string;
  postal_code: string;
  state: string;
  street: string;
  updated_at:   string;
  website_url: string;
};
type State = {
  UsState: string;
  breweries: Brewery[]
}

let state : State = {
  UsState: 'Texas',
  breweries: []
};

function getBreweries() {
  fetch(`https://api.openbrewerydb.org/breweries?by_state=${state.UsState}&per_page=10`)
    .then(response => response.json())
    .then(breweries => {
      state.breweries = breweries;
      render();
    })
}

function renderHeader() {
  // <h1>List of Breweries</h1>
    let mainEl = document.querySelector("main");
    if(mainEl==null) return;
    mainEl.innerHTML = '';

    let h1El = document.createElement('h1');
    h1El.innerText = 'List of Breweries';
  // <header class="search-bar">
    let headerEl = document.createElement('header');
    headerEl.className = 'search-bar';
  //   <form id="search-breweries-form" autocomplete="off">
    let formEl = document.createElement('form');
    formEl.id = 'search-breweries-form';
    formEl.setAttribute('autocomplete', 'off');

  //     <label for="search-breweries"><h2>Search breweries:</h2></label>
        let labelEl = document.createElement('label');
        labelEl.innerText = 'Search breweries:';
        labelEl.setAttribute('for', 'search-breweries');
        let h2El = document.createElement('h2');
        h2El.innerText = 'Search breweries:';
        labelEl.appendChild(h2El);
    
  //     <input id="search-breweries" name="search-breweries" type="text" />
        let inputEl = document.createElement('input');
        inputEl.id = 'search-breweries';
        inputEl.name = 'search-breweries';
        inputEl.type = 'text';

        inputEl.addEventListener('keyup', function (e)  {
          let searchTerm = (e.target as HTMLInputElement).value;
          let filteredBreweries = state.breweries.filter(brewery => {
            brewery.name.toLowerCase().includes(searchTerm.toLowerCase());
          });
          state.breweries = filteredBreweries;          
          renderBreweriesList();
          console.log(state);
        })

    formEl.append(labelEl, inputEl);
    headerEl.appendChild(formEl);
    mainEl?.append(h1El,headerEl);
  //   </form>
  // </header>
}
function renderABrewery(brewery:Brewery ,breweriesUlEl: HTMLElement) {
  // <li>
  let liEl = document.createElement("li");
  //   <h2>Snow Belt Brew</h2>
  let h2El = document.createElement("h2");
  h2El.innerText = brewery.name;
  //   <div class="type">micro</div>
  let divEl = document.createElement("div");
  divEl.className = "type";
  divEl.innerText = brewery.brewery_type;
  //   <section class="address">
  let sectionEl = document.createElement("section");
  sectionEl.className = "address";
  //     <h3>Address:</h3>
  let h3El = document.createElement("h3");
  h3El.innerText = "Address:";
  //     <p>9511 Kile Rd</p>
  let pEl = document.createElement("p");
  pEl.innerText = `${brewery.street} ${brewery.city}, ${brewery.state} ${brewery.postal_code}`;

  //     <p>
  //       <strong>Chardon, 44024</strong>
  let strongPEl = document.createElement("p");
  strongPEl.innerText = `${brewery.country}`;
  strongPEl.setAttribute("style", "font-weight: bold;");

  sectionEl.append(h3El, pEl, strongPEl);
  //     </p>
  //   </section>
  //   <section class="phone">
  let sectionPhoneEl = document.createElement("section");
  sectionPhoneEl.className = "phone";
  //     <h3>Phone:</h3>
  let h3PhoneEl = document.createElement("h3");
  h3PhoneEl.innerText = "Phone:";
  //     <p>N/A</p>
  let pPhoneEl = document.createElement("p");
  pPhoneEl.innerText = brewery.phone;
  sectionPhoneEl.append(h3PhoneEl, pPhoneEl);
  //   </section>
  //   <section class="link">
  let sectionLinkEl = document.createElement("section");
  sectionLinkEl.className = "link";
  //     <a href="null" target="_blank">
  let aEl = document.createElement("a");
  aEl.href = brewery.website_url?brewery.website_url:"#";
  aEl.target = "_blank";
  aEl.innerText = "Visit Website"?"Visit Website":"No Website";
  //       Visit Website
  sectionLinkEl.append(aEl);

  liEl.append(h2El, divEl, sectionEl, sectionPhoneEl, sectionLinkEl);

  breweriesUlEl.append(liEl);
}
function renderBreweriesList(){
  let mainEl = document.querySelector("main");
  if(mainEl==null) return;
  
  let articleEl = document.createElement('article');

  let breweriesUlEl = document.createElement('ul');
  breweriesUlEl.className = 'breweries-list';
  
  for(let brewery of state.breweries) {
  renderABrewery(brewery,breweriesUlEl);
}
  
  
  articleEl.appendChild(breweriesUlEl);
  mainEl.appendChild(articleEl);
}


// function dropdown() {
//   let mainEl = document.querySelector<HTMLDivElement>("main");
//   if(mainEl==null) return;
//   mainEl.innerHTML = '';

//   let asideEl = document.createElement("aside");
//   asideEl.className = "filters-section";

//   // <h2>Filter By:</h2>
//   let h2El = document.createElement('h2');
//   h2El.innerText = 'Filter By:';
//   // <!-- Type of brewery - Challenge #1 -->
//   // <form id="filter-by-type-form" autocompete="off">
//   let formEl = document.createElement('form');
//   formEl.id = 'filter-by-type-form';
//   formEl.setAttribute('autocompete', 'off');
//   //   <label for="filter-by-type">
//   let labelEl = document.createElement('label');
//   //     <h3>Type of Brewery</h3>
//   let h3El = document.createElement('h3');
//   h3El.innerText = 'Type of Brewery';
//   labelEl.appendChild(h3El);
//   //   </label>
//   //   <select name="filter-by-type" id="filter-by-type">
//   let selectEl = document.createElement('select');
//   selectEl.name = 'filter-by-type';
//   selectEl.id = 'filter-by-type';
//   //     <option value="">Select a type...</option>
//   let optionEl = document.createElement('option');
//   optionEl.value = '';
//   optionEl.innerText = 'Select a type...';
//   //     <option value="micro">Micro</option>
//   let optionMicroEl = document.createElement('option');
//   optionMicroEl.value = 'micro';
//   optionMicroEl.innerText = 'Micro';
//   //     <option value="regional">Regional</option>
//   let optionRegionalEl = document.createElement('option');
//   optionRegionalEl.value = 'regional';
//   optionRegionalEl.innerText = 'Regional';
//   //     <option value="brewpub">Brewpub</option>
//   let optionBrewpubEl = document.createElement('option');
//   optionBrewpubEl.value = 'brewpub';
//   optionBrewpubEl.innerText = 'Brewpub';
//   selectEl.append(optionEl, optionMicroEl, optionRegionalEl, optionBrewpubEl);

//   formEl.append(labelEl, selectEl);
//   asideEl.append(h2El, formEl);
//   mainEl.append(asideEl);
// }
// function checkbox() {
//   let mainEl = document.querySelector<HTMLDivElement>("main");
//   if(mainEl==null) return;

//   let asideEl = document.createElement("aside");
//   asideEl.className = "filters-section";
//   // <div class="filter-by-city-heading">
//   let divEl = document.createElement('div');
//   divEl.className = 'filter-by-city-heading';
//   //   <h3>Cities</h3><button class="clear-all-btn">clear all</button>
//   let h3El = document.createElement('h3');
//   h3El.innerText = 'Cities';
//   let buttonEl = document.createElement('button');
//   buttonEl.className = 'clear-all-btn';
//   buttonEl.innerText = 'clear all';

//   h3El.appendChild(buttonEl);
//   divEl.appendChild(h3El);
//   // </div>
//   // <form id="filter-by-city-form">
//   //   <input type="checkbox" name="williamsville" value="williamsville">
//   //   <label for="williamsville">Williamsville</label> <input type="checkbox" name="holland patent"
//   //     value="holland patent">
//   //   <label for="holland patent">Holland Patent</label>
//   //   <input type="checkbox" name="holbrook" value="holbrook">
//   //   <label for="more">More cities ...</label>
//   //   <input type="checkbox" name="more" value="more">
//   // </form>
//   let formEl = document.createElement('form');
//   formEl.id = 'filter-by-city-form';
//     let inputEl = document.createElement('input');
//     inputEl.type = 'checkbox';
//     inputEl.name = "williamsville";
//     inputEl.value = "williamsville";
//     let labelEl = document.createElement('label');
//     labelEl.textContent = "Williamsville";
//     labelEl.innerText = "Williamsville";
//     formEl.append(inputEl,labelEl);
//   asideEl.append(divEl, formEl);
//   mainEl.append(asideEl);
// }

function listenForSearch() {
  let formEl = document.querySelector<HTMLFormElement>("#select-state-form");
  if (formEl == null) return;
  formEl?.addEventListener("submit", function(event){
    event.preventDefault();
    let searchTerm = formEl["select-state"].value;
    state.UsState=searchTerm;
    getBreweries();
    render();
    });
}

function render(){
  let mainEl = document.querySelector("main");
  if(mainEl==null) return;
  mainEl.textContent = '';
  renderHeader();
  renderBreweriesList();
}
// dropdown();
// checkbox();
listenForSearch();
render();