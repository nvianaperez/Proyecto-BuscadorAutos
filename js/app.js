/*********** VARIABLES ***********/
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");
//contenedor donde se muestran todos los resultados
const contenedor = document.querySelector("#resultado");

// variables para rellenar el selector de Año
const max = new Date().getFullYear();
const min = max - 10;

for (let i = max; i >= min; i--) {
  const option = document.createElement("option");
  option.value = i;
  option.innerText = i;
  document.querySelector("#year").appendChild(option);
}

// crear un objeto que se completará con los datos de la búsqueda
const datosBusqueda = {
  marca: "",
  year: "",
  precioMin: "",
  precioMax: "",
  puertas: "",
  transmision: "",
  color: "",
};

/*********** EVENTS ***********/
document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos);
});

// Event listener para los select de búsqueda
marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;
  filtrarAuto();
});
year.addEventListener("change", (e) => {
  //   datosBusqueda.year = Number(e.target.value);
  datosBusqueda.year = parseInt(e.target.value);
  filtrarAuto();
});
minimo.addEventListener("change", (e) => {
  datosBusqueda.precioMin = Number(e.target.value);
  filtrarAuto();
});
maximo.addEventListener("change", (e) => {
  datosBusqueda.precioMax = Number(e.target.value);
  filtrarAuto();
});
puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = Number(e.target.value);
  filtrarAuto();
});
transmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;
  filtrarAuto();
});
color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;
  filtrarAuto();

  console.log(datosBusqueda);
});

/*********** FUNCTIONS ***********/
function mostrarAutos(autos) {
  //elimina el HTML previo
  limpiarHTML();
  //itera y agrega el nuevo contenido
  autos.forEach((auto) => {
    const { marca, modelo, year, precio, puertas, color, transmision } = auto; //destructuring  objects
    const autoHTML = document.createElement("p");
    autoHTML.innerHTML = `
            <p>${marca} ${modelo} - ${year} - Precio: ${precio} - Puertas: ${puertas} 
            - Transmisión: ${transmision} - Color: ${color}</p>
        `;
    contenedor.appendChild(autoHTML);
  });
}

function limpiarHTML() {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
}

// filtrando la búsqueda
function filtrarAuto() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);
  //HIGH LEVEL FUNCTION --> el método filter, en vez de llevar una arrow function dentro lleva otra función
  //hacemos chaining --> encadenamos métodos
  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    mostrarNoResultado();
  }
}

function mostrarNoResultado() {
  limpiarHTML();
  const noResultado = document.createElement("div");
  noResultado.textContent = `No Existen Resultados. Intenta con otros términos de búsqueda.`;
  noResultado.classList.add("alerta", "error");
  contenedor.appendChild(noResultado);
}

function filtrarMarca(auto) {
  const { marca } = datosBusqueda; //destructuring  objects
  if (marca) {
    return auto.marca === marca;
  }
  return auto;
}

function filtrarYear(auto) {
  if (datosBusqueda.year) {
    return auto.year === datosBusqueda.year;
  }
  return auto;
}

function filtrarMinimo(auto) {
  const { precioMin } = datosBusqueda; //destructuring  objects
  if (precioMin) {
    return auto.precio >= precioMin;
  }
  return auto;
}

function filtrarMaximo(auto) {
  const { precioMax } = datosBusqueda; //destructuring  objects
  if (precioMax) {
    return auto.precio <= precioMax;
  }
  return auto;
}

function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda; //destructuring  objects
  if (puertas) {
    return auto.puertas === puertas;
  }
  return auto;
}

function filtrarTransmision(auto) {
  const { transmision } = datosBusqueda; //destructuring  objects
  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}

function filtrarColor(auto) {
  const { color } = datosBusqueda; //destructuring  objects
  if (color) {
    return auto.color === color;
  }
  return auto;
}
