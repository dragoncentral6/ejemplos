import {guardar, listar, cambios, borrar, busqueda, actualizar } from './firedatabase.js'

const formulario = document.getElementById("form-task");
const listdisplay = document.getElementById("tareas");

let estado = false;
let idUpdate = "";

window.addEventListener('DOMContentLoaded', async() => {
    
    
    cambios((listado) =>{
        let html = "";

        listado.forEach(doc => {
            const dato = doc.data();

            //let titulo = doc.data().title;
            //let desc = doc.data().description;

            //console.log(dato);
            html += `
                <div class="resTarea">
                    <label>${dato.Titulo}</label>
                    <p>${dato.Descripcion}</p>
                    <button class="btn-delete" data-id="${doc.id}">borrar</button>
                    <button class="btn-editar" data-id="${doc.id}">editar</button>
                </div>
                `
        });

        listdisplay.innerHTML = html;

        const btnsborrar = listdisplay.querySelectorAll('.btn-delete');

        btnsborrar.forEach(btn => {
            btn.addEventListener('click', ({target: {dataset}}) => {
                borrar(dataset.id);
                //console.log(dataset.id);
                console.log("tarea borrada");
            });
        });

        const btneditar = listdisplay.querySelectorAll('.btn-editar');
        btneditar.forEach(btn => {
            btn.addEventListener('click', async(e) => {
                
                const doc = await busqueda(e.target.dataset.id);

                const datos = doc.data()
                //console.log("seleccionastes editar los siguiestes datos: "+datos);
                formulario['titletarea'].value = datos.Titulo;
                formulario['areatarea'].value = datos.Descripcion;

                estado = true;
                idUpdate = doc.id;
                formulario['btnsave'].innerText = "actualizar";
            });
        });

    });
});





//guardar datos
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const titulo = formulario["titletarea"];
    const descripcion = formulario["areatarea"];

    if (!estado) {
        
        if (titulo.value != "" || descripcion.value != "") {
            guardar(titulo.value, descripcion.value);    
            console.log("tarea guardada");
        } else {
            console.log("los campos son requeridos");
        }
    } else {
        actualizar(idUpdate,{
            Titulo: titulo.value, 
            Descripcion: descripcion.value
        });
        console.log("tarea editanda");
        formulario['btnsave'].innerText = "guardar";
        estado = false;
    }
    formulario.reset();
    
});
