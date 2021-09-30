const data = [
  {
    id: 1,
    url: "https://static.toiimg.com/photo/61624101/.jpg",
    name: "Jaipur",
  },
  {
    id: 2,
    url: "https://media-cdn.tripadvisor.com/media/photo-s/01/2f/c5/7d/taj-mahal.jpg",
    name: "Agra",
  },
  {
    id: 3,
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Marine_Lines_Mumbai_2021.jpg/700px-Marine_Lines_Mumbai_2021.jpg",
    name: "Mumbai",
  },
  {
    id: 4,
    url: "https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg",
    name: "Delhi",
  },
  {
    id: 6,
    url: "https://www.holidify.com/images/cmsuploads/compressed/1200px-Charminar_Ramzan_Nights_20210201171739_20210201171755.jpg",
    name: "Hyderabad",
  },
  {
    id: 7,
    url: "https://lp-cms-production.imgix.net/2019-06/9483508eeee2b78a7356a15ed9c337a1-bengaluru-bangalore.jpg",
    name: "Banglore",
  },
  {
    id: 8,
    url: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/6e/b4/5f.jpg",
    name: "Ahmedabad",
  },
  {
    id: 9,
    url: "https://www.holidify.com/images/bgImages/KOLKATA.jpg",
    name: "Kolkata",
  },
  {
    id: 10,
    url: "https://3.imimg.com/data3/PN/MR/MY-10340011/39-250x250.jpg",
    name: "Masuri",
  },
];
// element selection
const imageContainer = document.querySelector("#image-container");
const favNavLink = document.querySelector("#fav-nav-link");

let showFavourite = false;
favNavLink.addEventListener("click", (event) => {
  event.target.classList.toggle("active");
  event.target.textContent = showFavourite ? "favourite" : "show all";
  showFavourite = showFavourite ? false : true;
  updateImageContainer();
});

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
    updateImageContainer();
  };
}
const initialState = {
  searchBarValue: "",
};

// the state of the application
const state = State.getState(initialState);
const favImages = new Set();

// handling search functionality of the searchBar
const searchBar = document.querySelector(".image-search");

const handleChange = (event) => {
  state.setState({ searchBarValue: event.target.value });
};
searchBar.addEventListener("input", handleChange);

// populate the view based on user-input
const loadImages = () => {
  let filteredData;
  if (showFavourite) {
    filteredData = data.filter((item) => favImages.has(`${item.id}`));
  } else filteredData = data;
  filteredData.map((item) => {
    if (state.state.searchBarValue.trim() != "") {
      if (
        item.name
          .toLowerCase()
          .includes(state.state.searchBarValue.toLowerCase())
      ) {
        createCardElement(item);
      }
    } else {
      createCardElement(item);
    }
  });
};

// creates the card element and append it to the imagecontainer
const createCardElement = (item) => {
  // creating and configuring card component
  const cardComponent = document.createElement("div");
  cardComponent.classList.add("card");

  // creating and configuring image element
  const imageElement = document.createElement("img");
  imageElement.setAttribute("src", item.url);
  imageElement.classList.add("image");

  // creating and configuring the name element
  const nameElement = document.createElement("h3");
  nameElement.classList.add("image-name");
  nameElement.textContent = item.name;

  // creating and configuring heart-icon
  const heartElement = document.createElement("i");
  heartElement.classList.add("heart", "far", "fa-heart");
  if (favImages.has(`${item.id}`)) heartElement.classList.add("fav");
  heartElement.setAttribute("data-id", item.id);
  heartElement.addEventListener("click", handleLikeClick);

  // creating and configuring bottom element
  const bottomElement = document.createElement("div");
  bottomElement.classList.add("card-bottom");
  bottomElement.appendChild(nameElement);
  bottomElement.appendChild(heartElement);

  // appending the element to their respective parent elements
  cardComponent.appendChild(imageElement);
  cardComponent.appendChild(bottomElement);

  imageContainer.appendChild(cardComponent);
};

const likeIcon = document.querySelector(".heart");

// updates the imagecontainer based on the user input
const updateImageContainer = () => {
  const children = imageContainer.childNodes;
  while (children.length > 0) {
    children[0].remove();
  }
  loadImages();
};

const handleLikeClick = (event) => {
  const heartElement = event.target;
  heartElement.classList.toggle("fav");
  const id = heartElement.dataset.id;
  if (favImages.has(id)) {
    favImages.delete(id);
  } else {
    favImages.add(id);
  }
};

// loading data from API after loading static elements
window.onload = loadImages;
