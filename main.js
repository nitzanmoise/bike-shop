window.addEventListener("DOMContentLoaded", fetcBikes)

function fetcBikes() {
    fetch("https://nitzanmoise.com/t7-portfolio/wp-json/wp/v2/bike?_embed")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            renderBikes(data);
        })
}

function renderBikes(jsonData) {

    console.log('bikes', jsonData);
    jsonData.forEach(function (bike) {
        let template = document.querySelector("template").content;
        let aCopy = template.cloneNode(true);
        aCopy.querySelector("img").src = bike.image.guid;
        aCopy.getElementById('category').textContent = bike.slug;
                aCopy.getElementById('bike-type').textContent = bike.model;
        aCopy.getElementById('price').textContent = bike.price;
                aCopy.getElementById('colours').style.backgroundColor = bike.colour;

        aCopy.getElementById('instock').textContent = bike.in_stock;


        let parent = document.querySelector(`.bikes-wrapper`);
        parent.appendChild(aCopy);

    })

}
