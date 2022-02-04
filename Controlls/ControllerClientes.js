$(document).ready(function () {

     //Insertar
     $('#btn_save').click(function (e) { 
        e.preventDefault();
        Insertar();
        
    });
    //Modificar
    $('#btn_edit').click(function (e) { 
        e.preventDefault();
        Modificar();
        
    });
    //Cancelar
    $('#btn_cancel').click(function (e){
        e.preventDefault();
        LimpiarCampos();
        Modificar_Off();
        
    });
    //Busqueda
    Tabla();
    Modificar_Off();

function LimpiarCampos(){
                
    $('#FirstName').val("");
    $('#LastName').val("");
    $('#Email').val("");
    $('#Rfc').val("");
    $('#Phone').val("");
    $('#CellPhone').val("");
    $('#Street').val("");
    $('#Number').val("");
    $('#Suburb').val("");
    $('#Zip').val("");
}
function Insertar(){
    var datos = new FormData();
    datos.append('nombre',$('#FirstName').val());
    datos.append('apellido',$('#LastName').val());
    datos.append('correo',$('#Email').val());
    datos.append('rfc',$('#Rfc').val());
    datos.append('telefono',$('#Phone').val());
    datos.append('celular',$('#CellPhone').val());
    datos.append('calle',$('#Street').val());
    datos.append('numero',$('#Number').val());
    datos.append('colonia',$('#Suburb').val());
    datos.append('cp',$('#Zip').val());
    
    $.ajax({
        type: "post",
        url: "../Models/Cliente/Create.php",
        data: datos,
        processData:false,
        contentType:false,
        success: function (respuesta) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cliente Registrado',
                showConfirmButton: false,
                timer: 1500
              })   
            LimpiarCampos();
            Refrescar_tabla();
            
        }
    });
}    
function Tabla(){
   var table = $('#table').DataTable({
       
        "ajax" : "../Models/Cliente/Read.php",
        "columns" : [
            {"data":"id_cliente"},
            {"data":"referencia"},
            {"data":"nombre"},
            {"data":"celular"},
            {"data":"correo"},
            {"defaultContent":"<button type='submit' class='btn btn-warning editar'> <i class='fa fa-edit'></i></button> <button type='submit' class='btn btn-danger eliminar'> <i class='fa fa-trash'></i></button>"}
            
        ]
    });
    Buscar_Modificar("#table tbody",table);
    Eliminar("#table tbody",table);
}
function Buscar_Modificar(tbody,table){
    $(tbody).on("click","button.editar",function(){
        var data = table.row($(this).parents("tr")).data();
        $("#FirstName").val(data.nombre);
        $("#LastName").val(data.apellido);
        $("#Email").val(data.correo);
        $("#Rfc").val(data.rfc);
        $("#Phone").val(data.telefono);
        $("#CellPhone").val(data.celular);
        $("#Street").val(data.calle);
        $("#Number").val(data.numero);
        $("#Suburb").val(data.colonia);
        $("#Zip").val(data.cp);
        $("#ID").val(data.id_cliente);
        Modificar_On();
    });   
}
function Modificar(){
    var datos = new FormData();
    datos.append('nombre',$('#FirstName').val());
    datos.append('apellido',$('#LastName').val());
    datos.append('correo',$('#Email').val());
    datos.append('rfc',$('#Rfc').val());
    datos.append('telefono',$('#Phone').val());
    datos.append('celular',$('#CellPhone').val());
    datos.append('calle',$('#Street').val());
    datos.append('numero',$('#Number').val());
    datos.append('colonia',$('#Suburb').val());
    datos.append('cp',$('#Zip').val());
    datos.append('id_cliente',$('#ID').val());
    
    $.ajax({
        type: "post",
        url: "../Models/Cliente/Update.php",
        data: datos,
        processData:false,
        contentType:false,
        success: function (respuesta) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cliente Actualizado',
                showConfirmButton: false,
                timer: 1500
              })   
            LimpiarCampos();
            Refrescar_tabla();
            Modificar_Off();
            
        }
    });
}
function Eliminar(tbody,table){
    $(tbody).on("click","button.eliminar",function(){
        var data = table.row($(this).parents("tr")).data();
        var id = data.id_cliente;
        Swal.fire({
            title: '¿Deseas Realmente Eliminar al Cliente?',
            text: "Ya no podrá mostrar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar'
          }).then((result) => {
            if (result.isConfirmed) {
             $.ajax({
                type: "GET",
                url: "../Models/Cliente/Delete.php?delete="+id,
                success: function (respuesta) {
                    Swal.fire(
                        '¡Borrado!',
                        'Cliente Eliminado.',
                        'success'
                      ) 
                    
                }
            }); 
            Refrescar_tabla(); 
            }
          })
    });
}
function Refrescar_tabla(){
    $('#table').DataTable().ajax.reload();
    
}
function Modificar_On(){
    $("#btn_edit").show();
    $("#btn_save").hide();
}
function Modificar_Off(){
    $("#btn_edit").hide();
    $("#btn_save").show();
}
});