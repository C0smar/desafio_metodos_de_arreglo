let nuevasTareas = [
    {
        id: Date.now() +1,
        desc: 'Dar pastillas al perrito' ,
        fecha: new Date ().toLocaleDateString(),
        estado: false,
    },
    {
        id: Date.now()+2,
        desc: 'Lavar la ropa' ,
        fecha: new Date ().toLocaleDateString(),
        estado: false,
    },
    {
        id: Date.now()+3,
        desc: 'Hacer Aseo' ,
        fecha: new Date ().toLocaleDateString(),
        estado: true,
    },

] ;

const listaTareas = document.getElementById ('listaTareas')
const input = document.getElementById ('input')
const btnAgregar = document.getElementById ('btn')
const total = document.getElementById ('total')
const completadas = document.getElementById ('completadas')


const crearTareas= () => {
    let template =''
    nuevasTareas.forEach (tareas =>{
        template += `
            <tr class="${tareas.estado ? 'tarea_completada' : 'tarea_incompleta'}"> 
                <td> ${tareas.id} </td>
                <td> ${tareas.desc} </td>
                <td> ${tareas.fecha} </td>
                <td><input  type="checkbox" ${tareas.estado ? 'checked' : ''} 
                    onclick="cambiarEstado(${tareas.id})"> 
                    <button id="btnBorrar" onclick="borrarTarea (${tareas.id})"> Borrar </button> </td>
            </tr>`

    })
    listaTareas.innerHTML = template
}

const cambiarEstado = (id) => {
    nuevasTareas = nuevasTareas.map(tarea => 
        tarea.id === id ? { ...tarea, estado: !tarea.estado } : tarea
    );
    crearTareas();
    filtrarTareas ();
    realizadas();
};

function filtrarTareas (){
    const tareasFiltradasFalsas = nuevasTareas.filter((tarea) => tarea.estado == false );
    const tareasFiltradasVerdaderas = nuevasTareas.filter((tarea) => tarea.estado == true);
    const tareasFiltradas = tareasFiltradasFalsas.concat(tareasFiltradasVerdaderas);
     total.innerHTML= tareasFiltradas.length
};
    
function realizadas (){
    const tareasRealizadas = nuevasTareas.filter(
        (tarea) => tarea.estado === true );
        completadas.innerHTML = tareasRealizadas.length
    }

function borrarTarea (id) {
    const index = nuevasTareas.findIndex ( Tareas => nuevasTareas.id == id)
    nuevasTareas.splice(index,1)
    crearTareas()
    filtrarTareas()
    realizadas()

}

btnAgregar.addEventListener ('click', agregarTareas);

function agregarTareas () {
    const tarea ={
        id: Date.now()  ,
        desc: input.value.trim(),
        fecha: new Date ().toLocaleDateString(),
        estado: false
    };
    nuevasTareas.push(tarea);
    input.value= '';
    
    filtrarTareas()
    realizadas()
    crearTareas()
    
}


crearTareas ()
filtrarTareas ()
realizadas ()

