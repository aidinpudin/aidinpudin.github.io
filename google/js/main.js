let input = document.getElementById('search-input')
let box = document.getElementById('search-box')
let search = document.getElementById('search')
let searchList = document.getElementById('search-list')
let apps = document.getElementById('apps')
let dots = document.getElementById('dots')
let cross = document.getElementById('cross')

// Eventos
dots.addEventListener('click', abrirApps)
input.addEventListener('click',()=>{
    abrirSearchBox()
    cerrarApps()
})

// funcion abrir apps
function abrirApps() {
    if (apps.classList.contains('hidden'))
        apps.classList.remove('hidden')
    else    
        apps.classList.add('hidden')
}

// funcion abrir search
function abrirSearchBox() {
    box.classList.remove('hidden')
    search.classList.add('search-popup')
}

// funcion cerrar apps
function cerrarApps() {
    apps.classList.add('hidden')
}

// funcion cerrar search
function cerrarSearchBox()  {
    box.classList.add('hidden')
    search.classList.remove('search-popup')
}


// Limpiar búsqueda
cross.addEventListener('click',()=> {
    input.value = ""
    cross.classList.add('hidden')
})


// Evento escribir en search
input.addEventListener("keypress", function(event) {

// Habilitar cerrar
cross.classList.remove('hidden')

// Agregar busqueda a historial al dar enter
    if (event.key === "Enter") {
        crearChildNode(input.value)
        input.value = ''
    }
});

// Crear hijo en historial
function crearChildNode(entrada) {
    let item = document.createElement("li")
    let div1 = document.createElement("div")
    let div2 = document.createElement("div")
    let span = document.createElement("span")

    span.innerHTML = entrada
    div1.classList.add("recent-img")
    div2.classList.add("borrar")
    div2.innerHTML = 'Borrar'
    item.appendChild(div1)
    item.appendChild(span)
    item.appendChild(div2)
    searchList.appendChild(item)
}

// Evento click genérico
// Si estoy fuera de los boxes cierro lo que esté desplegado
document.addEventListener('click',function(e) {
    const isBox = e.target.closest('#search-box')
    const isApps = e.target.closest('#apps')
    const isDots = (e.target.id == 'dots' || e.target.innerHTML.id == 'dots')

// Si hago click en una de las ventanas 
    if (isBox != null) {
        // Estoy dentro de la caja de búsqueda

        // Borrar elemento buscado
        if (e.target.classList =='borrar') {
            const linea = e.target.parentNode
            linea.remove()
        } else if (e.target.localName == 'span') {
            // Copiar historial a búsqueda actual
            input.value = e.target.innerHTML
        }
    } else if (isApps != null) {
        // Estoy dentro de la caja de apps
        
    } else if (isDots) {
        cerrarSearchBox()

    } else if (e.target.localName !='input') {
        // Estoy en otro lado de la pantalla, cierro todos los popups
        
        // Cerrar search box
        cerrarSearchBox()

        // Cerrar apps
        cerrarApps()
    }
})