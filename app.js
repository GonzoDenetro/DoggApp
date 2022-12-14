const URL_API_RANDOM = "https://api.thedogapi.com/v1/images/search?limit=2";
const URL_API_FAVORITES = 'https://api.thedogapi.com/v1/favourites?api_key=';
const API_KEY = 'live_3wDCoj5MW5ugqnXEC8vmn6bmwoNudsfsJ64RuqBBNXzBh1eBlbKXkMmo4NnraInV';
const URL_COMPLETE = 'https://api.thedogapi.com/v1/favourites?api_key=live_3wDCoj5MW5ugqnXEC8vmn6bmwoNudsfsJ64RuqBBNXzBh1eBlbKXkMmo4NnraInV';


const img_container = document.getElementById('img-1');
const img_container2 = document.getElementById('img-2');
const img_container3 = document.getElementById('img-3');

const spanError = document.getElementById('error');

let btn = document.querySelector('button');
let fv_btn = document.querySelector('.btn-1');


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

        console.log('ID:');
        console.log(data[1].id);

        fv_btn.addEventListener('click', function(){
          saveAsAFavorite(data[0].id)
        })
    }
}


//FUNCIÓN PARA OBTENER A NUESTROS PERROS FAVORTIOS DEL BACKEND
async function loadFavorites(){
  let response = await fetch(URL_COMPLETE);
  let data = response.json();

  console.log("Aqui están guardados nuestros favoritos que enviamos")
  console.log(data);
}

//FUNCIÓN PARA GUARDAR UN PERRO EN FAVORITOS, PARA ENVIAR AL BACKEN NUESTROS FAVORITOS
async function saveAsAFavorite(id){
  let response = await fetch(URL_COMPLETE, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json', //Indicamos el tipo de información que estamos esperando
    },
    body: JSON.stringify({
            image_id: id //Le decimos al backend la información que le vamos a enviar
    })
  })

  let data = response.json();

  console.log("Respuesta del servidor de cuando guardamos en favoritos")
  console.log(response)

  if(response.status !== 200){
    spanError.innerHTML = `ERROR ${response.status} ${data.message}`;
  }
}

fetchData();
loadFavorites();

