window.addEventListener("DOMContentLoaded", fetcBikes)

const nitzaApi = "https://nitzanmoise.com/t7-portfolio/wp-json/wp/v2/bike?_embed";


function fetcBikes() {
    getNav()
    const urlParams = new URLSearchParams(window.location.search);
    console.log('URLSearchParams' + window.location);
    const the_bike_id = urlParams.get('bike_id');
    console.log(the_bike_id);
    const search_term = urlParams.get('searchterm');

    if (the_bike_id) {
        fetch("https://nitzanmoise.com/t7-portfolio/wp-json/wp/v2/bike/" + the_bike_id + "?_embed")
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                showBike(data);
            })
    }
        else if (search_term) {
            fetch("https://nitzanmoise.com/t7-portfolio/wp-json/wp/v2/bike?search=" + search_term + "&_embed" )
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    renderBikes(data);
                })
        } else {
            fetch("https://nitzanmoise.com/t7-portfolio/wp-json/wp/v2/bike?_embed")
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    renderBikes(data);
                })
        }

    }

    function getNav() {
        fetch("https://nitzanmoise.com/t7-portfolio/wp-json/wp/v2/categories?parent=13&order=desc")
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                showCategories(data);
            })
    }

    function showCategories(categories) {
        categories.forEach(category => {
            console.log(category);
            const a = document.createElement('a');
            a.textContent = category.name;
            a.href = 'category.html?cat_id=' + category.id;
            console.log(a);
            document.querySelector('nav').appendChild(a);
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


            const a = aCopy.querySelector('a');

            if (a) {
                a.href += bike.id;

            }

            let parent = document.querySelector(`.bikes-wrapper`);
            parent.appendChild(aCopy);

        })

    }

    function showBike(bike) {
        let template = document.querySelector("template").content;
        let aCopy = template.cloneNode(true);
        const divBikeDescription = aCopy.querySelector('#bike-description');
        console.log(divBikeDescription);
        if (divBikeDescription) {
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
