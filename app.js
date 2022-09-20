const URL_API_RANDOM = "https://api.thedogapi.com/v1/images/searc?limit=2";
const URL_API_FAVORITES = 'https://api.thedogapi.com/v1/favourites?api_key=';
const API_KEY = 'live_3wDCoj5MW5ugqnXEC8vmn6bmwoNudsfsJ64RuqBBNXzBh1eBlbKXkMmo4NnraInV';


const img_container = document.getElementById('img-1');
const img_container2 = document.getElementById('img-2');
const img_container3 = document.getElementById('img-3');

const spanError = document.getElementById('error');

let btn = document.querySelector('button');


btn.addEventListener('click', function(){
  fetchData()
})

async function fetchData(){
  let res = await fetch(URL_API_RANDOM);
  let data = await res.json();
  
  console.log(res);
  console.log(data);
  
    if(res.status !== 200){
        console.log('hola')
        spanError.innerHTML = `ERROR ${res.status}`;
    }
    else {
        let img_src = await data[0].url;
        let img_zrc = await data[1].url;
        
        img_container.src = img_src;
        img_container2.src = img_zrc;
    }
}

fetchData();