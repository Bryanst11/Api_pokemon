function consumo_api_total(api_pk) {
    //let api_pk = "https://pokeapi.co/api/v2/pokemon"
    let consumo = fetch(api_pk)
    consumo.then(res => res.json())
        .then(data_api => {
            //console.log(data_api)
            document.querySelector("#cartas").innerHTML = ''
            for (const pokemones_api of data_api.results) {
                //console.log(pokemones_api)
                let consumo1 = fetch(pokemones_api.url)
                consumo1.then(res1 => res1.json())
                    .then(data1_api => {
                        //console.log(data1_api)
                        let hp_pok = data1_api.stats[0].base_stat
                        let attack_pok = data1_api.stats[1].base_stat
                        let defense_pok = data1_api.stats[2].base_stat
                        let type_pok = data1_api.types[0].type.name
                        let type1_pok = data1_api.types[1].type.name
                        document.querySelector("#cartas").innerHTML += `
                            <div class=" col-4">
                                <div class=" d-flex justify-content-center align-content-center align-items-center mb-4">
                                    <div class="card" style="width: 18rem;">
                                        <img src="${data1_api.sprites.other.home.front_default}" class="card-img-top" alt="...">
                                        <div class="card-body">
                                            <h5 class="card-title">${pokemones_api.name}</h5>
                                            <div class="d-flex">
                                                <label for="" class="col-3">Hp</label>
                                                <div class="progress col-9 mt-1">
                                                    <div class="progress-bar bg-success" role="progressbar" aria-label="Example with label" style="width: ${hp_pok}%;" aria-valuenow="${hp_pok}" aria-valuemin="0" aria-valuemax="100">${hp_pok}</div>
                                                </div>
                                            </div>
                                            <div class="d-flex">
                                                <label for="" class=" col-3">Attack</label>
                                                <div class="progress col-9 mt-1">
                                                    <div class="progress-bar bg-danger" role="progressbar" aria-label="Example with label" style="width: ${attack_pok}%;" aria-valuenow="${attack_pok}" aria-valuemin="0" aria-valuemax="100">${attack_pok}</div>
                                                </div>
                                            </div>
                                            <div class="d-flex">
                                                <label for="" class=" col-3">Defense</label>
                                                <div class="progress col-9 mt-1">
                                                    <div class="progress-bar" role="progressbar" aria-label="Example with label" style="width: ${defense_pok}%;" aria-valuenow="${defense_pok}" aria-valuemin="0" aria-valuemax="100">${defense_pok}</div>
                                                </div>
                                            </div>
                                            <div class= " mt-1 d-flex">
                                                <label for="" class=" col-3">tipo:</label>
                                                <div class="col-9 d-flex">
                                                    <input class="btn btn-primary me-1 col-6" type="submit" value="${type_pok}">
                                                    <input class="btn btn-primary col-6" type="submit" value="${type1_pok}">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
                    })
            }
            crear_botones(data_api.next, data_api.prev)
        })
}

function crear_botones(url_pagina_siguiente, url_pagina_anterior) {
    let div_paginacion = document.querySelector("#paginacion")
    div_paginacion.innerHTML = ''

    let boton_anterior = document.createElement("button")
    boton_anterior.classList.add("btn", "btn-primary")
    boton_anterior.innerText = "Pagina anterior"
    if (url_pagina_anterior != null) {
        boton_anterior.setAttribute("onclick", `consumo_api_total('${url_pagina_anterior}')`)
    } else {
        boton_anterior.setAttribute("disabled", '')
    }
    div_paginacion.appendChild(boton_anterior)

    let boton_siguiente = document.createElement("button")
    boton_siguiente.className = "btn btn-primary"
    boton_siguiente.innerText = "Siguiente pagina"
    if (url_pagina_siguiente != null) {
        boton_siguiente.setAttribute("onclick", `consumo_api_total('${url_pagina_siguiente}')`)
    } else {
        boton_siguiente.setAttribute("disabled", '')
    }
    div_paginacion.appendChild(boton_siguiente)
}
    
    consumo_api_total("https://pokeapi.co/api/v2/pokemon")
    
    let btnBusqueda = document.querySelector("#btn-busqueda-api")
    btnBusqueda.addEventListener("click", () => {
        let busqueda = document.querySelector("#busquedaTexto").value
        if (busqueda == '') {
            consumo_api_total("https://pokeapi.co/api/v2/pokemon")
        } else {
            document.querySelector("#cartas").innerHTML = ''
            consumo_api_total(consumo_api_total("https://pokeapi.co/api/v2/pokemon/?name=" + busqueda))
            console.log(consumo_api_total)
        }
    })
