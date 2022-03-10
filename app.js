const inputSearch = document.querySelector("#search");
const suggestion = document.querySelector(".suggestions");

let arrCity = [];
// --------------------------------------------------- Get data ---------------------------------------------------
fetch(
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json"
)
  .then((response) => response.json())
  .then((responseData) => {
    arrCity.push(...responseData);
  });
// --------------------------------------------------- Tim tp phu hop voi yeu cau  ---------------------------------------------------
function findCity(keyword, arrCity) {
  let regX = new RegExp(keyword, "ig");

  return arrCity.filter((place) => {
    return place.city.match(regX) || place.state.match(regX);
  });
}

inputSearch.addEventListener("input", displayCity);

function displayCity() {
  let matchCity = findCity(this.value, arrCity);

  let matchEL = matchCity
    .map((place) => {
      let regX = new RegExp(this.value, "ig"); // ko phan biet hoa thuong

      const cityName = place.city.replace(
        regX,
        `<span class ="highlight">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regX,
        `<span class ="highlight">${this.value}</span>`
      );
      return `<li class ="city"> ${cityName}, ${stateName}</li>`;
    })
    .join("");

  suggestion.innerHTML = matchEL;
}
