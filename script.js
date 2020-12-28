var u = 0
let pokemonList = document.getElementsByClassName("list-item")
let prev = document.getElementById("prev")
let next = document.getElementById("next")
let imagen1 = document.getElementById("imagen1")
let imagen2= document.getElementById("imagen2")
let nombre= document.getElementById("nombre")
let numero= document.getElementById("numero")
let defense= document.getElementById("defense")
let attack= document.getElementById("attack")
let tipo= document.getElementById("tipo")
let principal= document.getElementById("principal")
let telon= document.getElementById("telon")
let open= document.getElementById("open")

let contador = 0
open.addEventListener("click", ()=>{
    if (contador==0) {
        open.innerHTML = "CLEAR"
        telon.style.opacity = "0"
        setTimeout(()=>{telon.style.zIndex = "0"}, 10000)
        contador++
    }
    else{
        open.innerHTML = "OPEN"
        telon.style.opacity = "1"
        telon.style.zIndex = "1"
        contador--
    }
})

let capitalizar = (s) => s[0].toUpperCase() + s.substr(1); 
function pokemon(n) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${n}`)
    .then(resp => resp.json())
    .then(resp =>{
      imagen1.src = resp.sprites.front_default
      imagen2.src = resp.sprites.back_default 
      nombre.innerHTML = capitalizar(resp.name)
      numero.innerHTML = "#0" + resp.id
      attack.innerHTML = "Attack: " + resp.stats[1].base_stat
      defense.innerHTML = "Defense: " + resp.stats[2].base_stat
      tipo.innerHTML = capitalizar(resp.types[0].type.name)
    })
}
for (let pokemonItem of pokemonList){
    pokemonItem.addEventListener("click", (e)=>{
        principal.removeAttribute("hidden")
        var contenido = e.target.textContent.split('.')[0]
        pokemon(contenido)
    })
}



// LISTA DEL LADO DERECHO

function search(u) {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${u}`)
    .then(resp => resp.json())
    .then(resp =>{
        for (let i = 0; i < pokemonList.length; i++) {
            let itemList = pokemonList[i];
            let namePoke = resp.results[i].name
            itemList.innerHTML = (u+i+1) + ". " + capitalizar(namePoke)
        }
    })
}
search(u)

prev.addEventListener("click", () =>{
    if (u==0) {
    }
    else{
        u=u-20
        search(u)
    }
})

next.addEventListener("click", () =>{   
    u = u+20
    search(u)
})