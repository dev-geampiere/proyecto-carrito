// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
    // Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos el arreglo
        limpiarHtml(); // eliminamos todo el html
    })
}

// Funciones
function agregarCurso(e) {
    e.preventDefault();

    if ( e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosDelCurso(cursoSeleccionado);
    }
}
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo de articulos carrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

        carritoHtml();
    }
}

// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso

function leerDatosDelCurso(curso) {

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else{
        // Agregar elementos al arreglo carrito 
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);

    carritoHtml();
}

// Muestra el carrito de compras en el html 
function carritoHtml() {

    // limpiar html
    limpiarHtml();

    // Recorre el carrito y genera el html
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src= "${imagen}" width="100px">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a hrft="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>
        `;

        // agrega el html al carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

}

// Eliminar los cursos del html

function limpiarHtml () {
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}





