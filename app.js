import { db }
from "./firebase.js";

import {

  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc

}
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";




/* ========================================= */
/* LOGIN */
/* ========================================= */

const usuarios = [

  {
    user:"Javier",
    password:"Shield2025"
  },

  {
    user:"Guadalupe",
    password:"Shield2025"
  }

];
/* ========================================= */
/* STORAGE */
/* ========================================= */


let vehiculos = [];

let fibraData = [];

let cristalesData = [];

async function cargarVehiculos(){

  const querySnapshot =
  await getDocs(
    collection(db,"vehiculos")
  );

  vehiculos = [];

  querySnapshot.forEach((docu)=>{

    vehiculos.push({

      firebaseId:docu.id,

      ...docu.data()

    });

  });

  renderVehiculos();
  renderEquipos();
  renderProduccion();
  renderDashboard();

}

cargarVehiculos();


async function cargarFibra(){

  const querySnapshot =
  await getDocs(
    collection(db,"fibra")
  );

  fibraData = [];

  querySnapshot.forEach((docu)=>{

    fibraData.push({

      firebaseId:docu.id,

      ...docu.data()

    });

  });

  renderFibra();

}

cargarFibra();

async function cargarCristales(){

  const querySnapshot =
  await getDocs(
    collection(db,"cristales")
  );

  cristalesData = [];

  querySnapshot.forEach((docu)=>{

    cristalesData.push({

      firebaseId:docu.id,

      ...docu.data()

    });

  });

  renderCristales();

}

cargarCristales();




/* ========================================= */
/* EQUIPOS */
/* ========================================= */

const equiposCarroceria = [

  "Luis Martinez",
  "Pedro Pascual",
  "Angel Jimenez",
  "Alberto Martinez",
  "Luis Becerril",
  "Juan Luis",
  "Alejandro Rangel",
  "Aldo Angeles",
  "Oscar Madrid"

];

const equiposPuertas = [

  "Benito Cocileon",
  "Carlos Callejas",
  "Alejandro Lavarieja",
  "Nancy Cortez"

];

/* ========================================= */
/* ACTIVIDADES CARROCERIA */
/* ========================================= */

const actividadesCarroceria = [

  {
    nombre:"Foliado",
    dias:0.041
  },

  {
    nombre:"Desmontaje de puertas",
    dias:0.0833
  },

  {
    nombre:"Desarme interno",
    dias:3
  },

  {
    nombre:"Almacenado de piezas de carrocería",
    dias:3
  },

  {
    nombre:"Protección del piso",
    dias:0.041
  },

  {
    nombre:"Segunda protección de carrocería",
    dias:0.041
  },

  {
    nombre:"Entrega de acero de carrocería",
    dias:0.041
  },

  {
    nombre:"Entrega fibra",
    dias:0.041
  },

  {
    nombre:"Opaco de Carrocería Poste A-B-C / Coronas",
    dias:3
  },

  {
    nombre:"Opaco Zona de Carga / Poste D / Concha",
    dias:10
  },

  {
    nombre:"Opaco Carrocería Toldo",
    dias:2
  },

  {
    nombre:"Arrivo de cristales",
    dias:0
  },

  {
    nombre:"Pegado de cristales",
    dias:3
  },

  {
    nombre:"Armado",
    dias:7
  }

];

/* ========================================= */
/* ACTIVIDADES PUERTAS */
/* ========================================= */

const actividadesPuertas = [

  {
    nombre:"Desmontaje de puertas",
    dias:0.0833
  },

  {
    nombre:"Desarme de puerta",
    dias:0.0833
  },

  {
    nombre:"Almacenado de piezas",
    dias:1
  },

  {
    nombre:"Entrega de fibra",
    dias:0.041
  },

  {
    nombre:"Entrega de acero",
    dias:0.0833
  },

  {
    nombre:"Apertura de lámina",
    dias:2
  },

  {
    nombre:"Pegado de fibra",
    dias:1
  },

  {
    nombre:"Opaco acero",
    dias:3
  },

  {
    nombre:"Arrivo de cristales",
    dias:0
  },

  {
    nombre:"Montaje sistema de elevación",
    dias:1
  },

  {
    nombre:"Cerrado de lámina / Armado",
    dias:3
  },

  {
    nombre:"Pintura",
    dias:1
  }

];

/* ========================================= */
/* LOGIN */
/* ========================================= */

function login(){

  const user =
  document.getElementById("loginUser").value;

  const password =
  document.getElementById("loginPassword").value;

const valido =
usuarios.find(u=>

  u.user === user &&
  u.password === password

);

if(valido){

    localStorage.setItem(
      "loginActivo",
      "true"
    );

    mostrarSistema();

  }else{

    document.getElementById("loginError")
    .innerText =
    "Usuario o contraseña incorrectos";

  }

}

function logout(){

  localStorage.removeItem("loginActivo");

  location.reload();

}

function mostrarSistema(){

  document.getElementById("loginScreen")
  .style.display = "none";

  document.getElementById("appContainer")
  .style.display = "flex";

  renderVehiculos();
  renderEquipos();
  renderProduccion();
  renderDashboard();
  renderFibra();
  renderCristales();

}

if(localStorage.getItem("loginActivo") === "true"){

  mostrarSistema();

}

/* ========================================= */
/* CAMBIO SECCIONES */
/* ========================================= */

function showSection(id){

  document.querySelectorAll(".section")
  .forEach(section=>{

    section.classList.remove("active");

  });

  document.getElementById(id)
  .classList.add("active");

}

/* ========================================= */
/* FECHAS */
/* ========================================= */

function sumarDiasHabiles(fecha,dias){

  let nuevaFecha = new Date(fecha);

  while(dias > 0){

    nuevaFecha.setDate(
      nuevaFecha.getDate() + 1
    );

    const dia = nuevaFecha.getDay();

    if(dia !== 0 && dia !== 6){

      dias--;

    }

  }

  return nuevaFecha;

}

function formatoFecha(fecha){

  const f = new Date(fecha);

  return f.toLocaleDateString();

}

function diasRestantes(fecha){

  const hoy = new Date();

  const objetivo = new Date(fecha);

  const diferencia = objetivo - hoy;

  return Math.ceil(
    diferencia / (1000 * 60 * 60 * 24)
  );

}

/* ========================================= */
/* CREAR PRODUCCION */
/* ========================================= */

function crearProduccion(fechaIngreso,actividades){

  let inicio = new Date(fechaIngreso);

  return actividades.map((actividad)=>{

    const fechaInicio =
    new Date(inicio);

    const fechaFin =
    sumarDiasHabiles(
      fechaInicio,
      actividad.dias
    );

    inicio = new Date(fechaFin);

    return{

      actividad:actividad.nombre,

      estado:"No iniciado",

      inicio:fechaInicio,

      fin:fechaFin

    };

  });

}

/* ========================================= */
/* GUARDAR VEHICULO */
/* ========================================= */

async function guardarVehiculo(){

  const vehiculo = {

    id:Date.now(),

   ot:
document
.getElementById("ordenTrabajo")
.value
.replace(/\s/g,''),

    marca:
    document.getElementById("marca").value,

    modelo:
    document.getElementById("modelo").value,

    fechaIngreso:
    document.getElementById("fechaIngreso").value,

    fechaCristales:
    document.getElementById("fechaCristales").value,

    tipoCristal:
    document.getElementById("tipoCristal").value,

    proveedorCristal:
    document.getElementById("proveedorCristal").value,

    quemacocos:
    document.getElementById("tipoQuemacocos").value,

    equipoCarroceria:
    document.getElementById("equipoCarroceria").value,

    equipoPuertas:
    document.getElementById("equipoPuertas").value,

    cinturones:false,

    elevadores:false,

    salida:false,

    produccionCarroceria:
    crearProduccion(
      document.getElementById("fechaIngreso").value,
      actividadesCarroceria
    ),

    produccionPuertas:
    crearProduccion(
      document.getElementById("fechaIngreso").value,
      actividadesPuertas
    )

  };

  await addDoc(

  collection(db,"vehiculos"),

  vehiculo

);

cargarVehiculos();

  renderVehiculos();
  renderEquipos();
  renderProduccion();
  renderDashboard();

  alert("Vehículo guardado");

}

/* ========================================= */
/* STORAGE */
/* ========================================= */

function guardarStorage(){

  localStorage.setItem(
    "vehiculos",
    JSON.stringify(vehiculos)
  );

  localStorage.setItem(
    "fibraData",
    JSON.stringify(fibraData)
  );

  localStorage.setItem(
    "cristalesData",
    JSON.stringify(cristalesData)
  );

}

/* ========================================= */
/* VEHICULOS */
/* ========================================= */

function renderVehiculos(){

  const tabla =
  document.getElementById("tablaVehiculos");

  tabla.innerHTML = "";

 [...historialVisual,...vehiculos]
.forEach((v,index)=>{

    tabla.innerHTML += `

      <tr>

 <td>
    ${index + 1}
  </td>


        <td>
          <input
  type="checkbox"

  ${v.cinturones ? "checked" : ""}

  onchange="
    toggleCheck(
      ${v.id},
      'cinturones',
      this.checked
    )
  "
>
        </td>

        <td>
         <input
  type="checkbox"

  ${v.elevadores ? "checked" : ""}

  onchange="
    toggleCheck(
      ${v.id},
      'elevadores',
      this.checked
    )
  "
>
        </td>


        <td class="${v.ot.includes('26T') ? 'ot-secundaria' : ''}">

  ${v.ot}

</td>

        <td>
          ${v.marca} ${v.modelo}
        </td>

        <td>
          ${formatoFecha(v.fechaIngreso)}
        </td>

        <td>
          ${v.tipoCristal}
        </td>


	<td>
  	${v.proveedorCristal}
	</td>

        <td>
          ${v.quemacocos}
        </td>

        <td>

  <span class="carroceria-tag">

    ${v.equipoCarroceria}

  </span>

</td>

        

<td>

  <span class="puertas-tag">

    ${v.equipoPuertas}

  </span>

</td>


        <td>

          ${
            v.salida
            ?
            "✅"
            :
            "-"
          }

        </td>

        <td>

          <button
            class="delete-btn"
            onclick="eliminarVehiculo(${v.id})"
          >

            X

          </button>

        </td>

      </tr>

    `;

  });

}

/* ========================================= */
/* ELIMINAR */
/* ========================================= */

async function eliminarVehiculo(id){

  const vehiculo =
  vehiculos.find(v=>v.id === id);

  await deleteDoc(

    doc(
      db,
      "vehiculos",
      vehiculo.firebaseId
    )

  );

  cargarVehiculos();

}
/* ========================================= */
/* EQUIPOS */
/* ========================================= */

function renderEquipos(){

  const carroceria =
  document.getElementById("equiposCarroceria");

  const puertas =
  document.getElementById("equiposPuertas");

  carroceria.innerHTML = "";
  puertas.innerHTML = "";

  /* ============================= */
  /* CARROCERIA */
  /* ============================= */

  equiposCarroceria.forEach(nombre=>{

   const activas =
vehiculos.filter(v=>
  v.equipoCarroceria === nombre
).length;

    let estado = "";
    let clase = "";

    if(activas >= 2){

      estado = "SATURADO";
      clase = "saturado";

    }else if(activas === 1){

      estado = "MEDIA";
      clase = "media";

    }else{

      estado = "DISPONIBLE";
      clase = "disponible";

    }

    carroceria.innerHTML += `

      <div class="equipo-card">

        <h3>${nombre}</h3>

        <p>
          Camionetas activas:
          ${activas}/2
        </p>

        <p class="${clase}">
          ${estado}
        </p>

      </div>

    `;

  });

  /* ============================= */
  /* PUERTAS */
  /* ============================= */

  equiposPuertas.forEach(nombre=>{

   const activas =
vehiculos.filter(v=>
  v.equipoPuertas === nombre
).length;

    let estado = "";
    let clase = "";

    if(activas >= 5){

      estado = "SATURADO";
      clase = "saturado";

    }else if(activas >= 3){

      estado = "MEDIA";
      clase = "media";

    }else{

      estado = "DISPONIBLE";
      clase = "disponible";

    }

    puertas.innerHTML += `

      <div class="equipo-card">

        <h3>${nombre}</h3>

        <p>
          Camionetas activas:
          ${activas}/5
        </p>

        <p class="${clase}">
          ${estado}
        </p>

      </div>

    `;

  });

}

/* ========================================= */
/* PRODUCCION */
/* ========================================= */

function renderProduccion(){

  const contenedor =
  document.getElementById("contenedorProduccion");

  contenedor.innerHTML = "";

 vehiculos.forEach((v,index)=>{

    contenedor.innerHTML += `

      <div class="produccion-card">

  <div
  class="produccion-header"
  onclick="toggleProduccion(${v.id})"
>

        
          <h2>
            <span
  style="
    color:
    ${
      v.ot
      .replace(/\s/g,'')
      .includes('26T')

      ?

      '#facc15'

      :

      'white'
    };

    font-weight:bold;
  "
>

  ${v.ot}

</span>
            -
            ${v.marca}
            ${v.modelo}
          </h2>

          <p>
            Cristales:
            ${formatoFecha(v.fechaCristales)}
          </p>

        </div>

<div
  class="produccion-body"
  id="produccion-${v.id}"
>



        <h3 class="sub-title">
          Carrocería
        </h3>

        <div class="produccion-grid">

          ${renderActividades(
            v.produccionCarroceria,
            v.id,
            "carroceria"
          )}

        </div>

        <h3 class="sub-title">
          Puertas
        </h3>

        <div class="produccion-grid">

          ${renderActividades(
            v.produccionPuertas,
            v.id,
            "puertas"
          )}

        </div>

	</div>

      </div>

    `;

  });

}

/* ========================================= */
/* ACTIVIDADES */
/* ========================================= */

function renderActividades(lista,id,area){

  return lista.map((a,index)=>{

    const dias =
    diasRestantes(a.fin);

    let alerta = "alerta-tiempo";

    if(dias <= 3){

      alerta = "alerta-proxima";

    }

    if(dias < 0 && a.estado !== "Listo"){

      alerta = "alerta-atraso";

    }

    return `

      <div class="actividad-card ${alerta}">

        <h4>${a.actividad}</h4>

        <p>
          Inicio:
          ${formatoFecha(a.inicio)}
        </p>

        <p>
          Fin:
          ${formatoFecha(a.fin)}
        </p>

        <select
          onchange="
            cambiarEstado(
              ${id},
              '${area}',
              ${index},
              this.value
            )
          "
        >

          <option
            ${a.estado === "No iniciado" ? "selected" : ""}
          >
            No iniciado
          </option>

          <option
            ${a.estado === "En curso" ? "selected" : ""}
          >
            En curso
          </option>

          <option
            ${a.estado === "Listo" ? "selected" : ""}
          >
            Listo
          </option>

        </select>

      </div>

    `;

  }).join("");

}



async function toggleCheck(id,campo,valor){

  const vehiculo =
  vehiculos.find(v=>v.id === id);

  vehiculo[campo] = valor;

  await updateDoc(

    doc(
      db,
      "vehiculos",
      vehiculo.firebaseId
    ),

    {

      [campo]:valor

    }

  );

  cargarVehiculos();

}



/* ========================================= */
/* CAMBIAR ESTADO */
/* ========================================= */

async function cambiarEstado(id,area,index,estado){

  const vehiculo =
  vehiculos.find(v=>v.id === id);

  const lista =
  area === "carroceria"
  ?
  vehiculo.produccionCarroceria
  :
  vehiculo.produccionPuertas;

  if(index > 0){

    const anterior =
    lista[index - 1];

    if(anterior.estado !== "Listo"){

      alert(
        "Debes terminar la actividad anterior"
      );

      renderProduccion();

      return;

    }

  }

  lista[index].estado = estado;

 await updateDoc(

  doc(
    db,
    "vehiculos",
    vehiculo.firebaseId
  ),

  {

    produccionCarroceria:
    vehiculo.produccionCarroceria,

    produccionPuertas:
    vehiculo.produccionPuertas

  }

);

cargarVehiculos();

}

/* ========================================= */
/* DASHBOARD */
/* ========================================= */

function renderDashboard(){

  document.getElementById("totalVehiculos")
  .innerText =
  vehiculos.length;

  let atrasos = 0;

  vehiculos.forEach(v=>{

    [
      ...v.produccionCarroceria,
      ...v.produccionPuertas
    ].forEach(a=>{

      if(
        diasRestantes(a.fin) < 0 &&
        a.estado !== "Listo"
      ){

        atrasos++;

      }

    });

  });

  document.getElementById("totalAtrasos")
  .innerText =
  atrasos;

  let saturados = 0;

  equiposCarroceria.forEach(e=>{

    const total =
    vehiculos.filter(v=>
      v.equipoCarroceria === e
    ).length;

    if(total >= 2){

      saturados++;

    }

  });

  equiposPuertas.forEach(e=>{

    const total =
    vehiculos.filter(v=>
      v.equipoPuertas === e
    ).length;

    if(total >= 5){

      saturados++;

    }

  });

  document.getElementById("totalSaturados")
  .innerText =
  saturados;

  document.getElementById("promedioDias")
  .innerText =
  "31";

}

/* ========================================= */
/* FIBRA */
/* ========================================= */

async function guardarFibra(){

 
const fibra = {

  id:Date.now(),

  ot:
  document.getElementById("fibraOT").value,

  vehiculo:
  document.getElementById("fibraVehiculo").value,

  pieza:
  document.getElementById("fibraPieza").value,

  cantidad:
  document.getElementById("fibraRecibida").value,

  fechaRecibido:
  document.getElementById("fibraFechaRecibido").value,

  fechaEntrega:""

};

await addDoc(

  collection(db,"fibra"),

  fibra

);

cargarFibra();



}

function renderFibra(){

  const tabla =
  document.getElementById("tablaFibra");

  tabla.innerHTML = "";

  fibraData.forEach(f=>{

    tabla.innerHTML += `

      <tr>

        <td>${f.ot}</td>

        <td>${f.vehiculo}</td>

        <td>${f.pieza}</td>

        <td>${f.cantidad}</td>

        <td>
          ${formatoFecha(f.fechaRecibido)}
        </td>

        <td>

          ${
            f.fechaEntrega
            ?
            formatoFecha(f.fechaEntrega)
            :
            "-"
          }

        </td>

        <td>

          <button
            onclick="entregarFibra(${f.id})"
          >

            Entregar

          </button>

        </td>

        <td>

          <button
            class="delete-btn"
            onclick="eliminarFibra(${f.id})"
          >

            X

          </button>

        </td>

      </tr>

    `;

  });

}


  async function entregarFibra(id){

  const fibra =
  fibraData.find(f=>f.id === id);

  await updateDoc(

    doc(
      db,
      "fibra",
      fibra.firebaseId
    ),

    {

      fechaEntrega:
      new Date().toISOString()

    }

  );

  cargarFibra();

}



  async function eliminarFibra(id){

  const fibra =
  fibraData.find(f=>f.id === id);

  await deleteDoc(

    doc(
      db,
      "fibra",
      fibra.firebaseId
    )

  );

  cargarFibra();

}

/* ========================================= */
/* CRISTALES */
/* ========================================= */

async function guardarCristal(){

  const archivo =
  document.getElementById("cristalArchivo")
  .files[0];

  if(!archivo){

    alert("Selecciona una imagen");
    return;

  }

  const reader = new FileReader();

reader.onload = async function(e){

   const cristal = {

  id:Date.now(),

  ot:
  document.getElementById("cristalOT").value,

  vehiculo:
  document.getElementById("cristalVehiculo").value,

  fecha:
  document.getElementById("cristalFecha").value,

  tipo:
  document.getElementById("cristalTipo").value,

  observaciones:
  document.getElementById("cristalObservaciones").value,

  archivoNombre:
  archivo.name,

  imagen:
  e.target.result

};

await addDoc(

  collection(db,"cristales"),

  cristal

);

cargarCristales();

alert("Cristal guardado");

  };

  reader.readAsDataURL(archivo);

}

function renderCristales(){

  const tabla =
  document.getElementById("tablaCristales");

  tabla.innerHTML = "";

  cristalesData.forEach(c=>{

    tabla.innerHTML += `

      <tr>

        <td>${c.ot}</td>

        <td>${c.vehiculo}</td>

        <td>
          ${formatoFecha(c.fecha)}
        </td>

        <td>${c.tipo}</td>

        <td>${c.observaciones}</td>

        <td>

          <a
            href="${c.imagen}"
            target="_blank"
            class="img-link"
          >

            Ver Imagen

          </a>

        </td>

      </tr>

    `;

  });

}
function toggleProduccion(id){

  const contenedor =
  document.getElementById(
    `produccion-${id}`
  );

  contenedor.classList.toggle("active");

}


window.login = login;
window.logout = logout;
window.showSection = showSection;
window.guardarVehiculo = guardarVehiculo;
window.eliminarVehiculo = eliminarVehiculo;
window.guardarFibra = guardarFibra;
window.entregarFibra = entregarFibra;
window.eliminarFibra = eliminarFibra;
window.guardarCristal = guardarCristal;
window.toggleProduccion = toggleProduccion;
window.cambiarEstado = cambiarEstado;
window.toggleCheck = toggleCheck;
