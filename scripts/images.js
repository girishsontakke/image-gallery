const data = [
  {
    url: "https://static.toiimg.com/photo/61624101/.jpg",
    name: "Jaipur",
  },
  {
    url: "https://media-cdn.tripadvisor.com/media/photo-s/01/2f/c5/7d/taj-mahal.jpg",
    name: "Agra",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Marine_Lines_Mumbai_2021.jpg/700px-Marine_Lines_Mumbai_2021.jpg",
    name: "Mumbai",
  },
  {
    url: "https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg",
    name: "Delhi",
  },
  {
    url: "https://www.holidify.com/images/cmsuploads/compressed/1200px-Charminar_Ramzan_Nights_20210201171739_20210201171755.jpg",
    name: "Hyderabad",
  },
  {
    url: "https://lp-cms-production.imgix.net/2019-06/9483508eeee2b78a7356a15ed9c337a1-bengaluru-bangalore.jpg",
    name: "Banglore",
  },
  {
    url: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/6e/b4/5f.jpg",
    name: "Ahmedabad",
  },
  {
    url: "https://www.holidify.com/images/bgImages/KOLKATA.jpg",
    name: "Kolkata",
  },
  {
    url: "https://3.imimg.com/data3/PN/MR/MY-10340011/39-250x250.jpg",
    name: "Masuri",
  },
];

// state of the application
class State {
  constructor(initialState) {
    if (initialState === null) throw Error("initialState can't be null");
    this.state = initialState;
  }
  static getState = (initialState) => {
    if (this.created) return this.instance;
    this.created = true;
    this.instance = new State(initialState);
    return this.instance;
  };
  setState = (updatedState) => {
    this.state = {
      ...this.state,
      ...updatedState,
    };
  };
}
const initialState = {
  searchBarValue: "",
};
const state = State.getState(initialState);

// handling search functionality of the searchBar
const searchBar = document.querySelector(".image-search");

const handleChange = (event) => {
  console.log("I ran");
  state.setState({ searchBarValue: event.target.value });
  console.log(state.state.searchBarValue);
};
searchBar.addEventListener("change", handleChange);

// element selection
const imageContainer = document.querySelector("#image-container");
const loadImages = () => {
  data.map((item) => {
    let cardComponent = document.createElement("div");
    let imageElement = document.createElement("img");

    cardComponent.classList.add("card");
    imageElement.setAttribute("src", item.url);
    imageElement.classList.add("image");

    cardComponent.appendChild(imageElement);
    imageContainer.appendChild(cardComponent);
  });
};

// loading data from API after loading static elements
window.onload = loadImages;
