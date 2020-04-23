window.addEventListener("DOMContentLoaded", fetcBikes)

const nitzaApi = "https://nitzanmoise.com/t7-portfolio/wp-json/wp/v2/bike?_embed";


function fetcBikes() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log('URLSearchParams' + window.location);
    const the_bike_id = urlParams.get('bike_id');
    console.log(the_bike_id);

    if (the_bike_id){
            fetch("https://nitzanmoise.com/t7-portfolio/wp-json/wp/v2/bike/"+the_bike_id+"?_embed")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            showBike(data);
        })
    }else{
         fetch("https://nitzanmoise.com/t7-portfolio/wp-json/wp/v2/bike?_embed")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            renderBikes(data);
        })
    }

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


        const a = aCopy.querySelector('a');

        if (a){
                    a.href += bike.id;

        }

        let parent = document.querySelector(`.bikes-wrapper`);
        parent.appendChild(aCopy);

    })

}

function showBike(bike){
      let template = document.querySelector("template").content;
        let aCopy = template.cloneNode(true);
    const divBikeDescription = aCopy.querySelector('#bike-description');
    console.log(divBikeDescription);
    if (divBikeDescription){
        divBikeDescription.innerHTML = bike.content.rendered;
          aCopy.querySelector("img").src = bike.image.guid;
        aCopy.getElementById('category').textContent = bike.slug;
        aCopy.getElementById('bike-type').textContent = bike.model;
        aCopy.getElementById('price').textContent = bike.price;
        aCopy.getElementById('colours').style.backgroundColor = bike.colour;

        aCopy.getElementById('instock').textContent = bike.in_stock;
    }



     let parent = document.querySelector(`.bikes-wrapper`);
        parent.appendChild(aCopy);
}
