function parseCSV(csvData){
    const rows =csvData.split('\n');
    const tableBody = document.querySelector('#csvTable tBody');
    rows.forEach( row =>{
        const colums = row.split(',');
        const tr = document.createElement('tr');
        colums.forEach(column=>{
            const td = document.createElement('td');
            td.addEventListener('click', () => EliminarFila(tr)); // agrega un evento con un clik para cada fila
            td.textContent = column.trim();
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);

    });
}

function readCSV(file){
    const reader = new FileReader();
    reader.onload= function(e){
        const csvData = e.target.result;
        parseCSV(csvData);
    }
    reader.readAsText(file);
}
document.querySelector('input[type="file"]').addEventListener('change',function(e){
    const file = e.target.files[0];
    readCSV(file);

});
//inserta nuevs datos 
function IngresaDatos() {
    const Nombre = document.getElementById('Nombre').value;
    const tamaño = document.getElementById('tamaño').value;
    const marca = document.getElementById('marca').value;
    let volumen = document.getElementById('volumen').value;
    const capacidad = document.getElementById('capacidad').value;

    
    
    if (!volumen.startsWith('%')) {
        volumen = volumen + '%' ;
    }

    if (Nombre && tamaño && marca && volumen && capacidad) {
        const tableBody = document.querySelector('#csvTable tbody');
        const tr = document.createElement('tr');
        
        [Nombre, tamaño, marca, volumen, capacidad].forEach(text => {
            const td = document.createElement('td');
            td.textContent = text;
            tr.appendChild(td);
        });
        
        tableBody.appendChild(tr);
        
        updateCSV();
        
        document.getElementById('Nombre').value = '';
        document.getElementById('tamaño').value = ''; 
        document.getElementById('marca').value = '';
        document.getElementById('volumen').value = '';
        document.getElementById('capacidad').value = '';
    } else {
        alert('llena todo');
    }
}
//confirma si deseas borrar una fila
function EliminarFila(row) {
    if (confirm('¿Estás seguro de que deseas eliminar esta fila?')) {
        row.remove();
        updateCSV();
    }
}

// Borra toda la tabla
function Eliminartablacompleta() {
    if (confirm('¿Estás seguro de que deseas borrar la tabla completa?')) {
        const tableBody = document.querySelector('#csvTable tbody');
        tableBody.innerHTML = '';
    }
}