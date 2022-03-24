var  DT_CATEGORIAS;
var  CATEGORIA_TO_DELETE;

$(document).ready(function(){

    DT_CATEGORIAS = $('#listCategorias').DataTable({
        "ajax":{
            type:'get',
            url:"http://daiquiriclub.com/api/categorias",
            dataSrc: 'data',
            cache: true
        },
        columns:[
            {
                "targets":0,
                "render":function(data, type, row){
                    //re    turn row.created_at;
                    return moment(row.created_at).format('DD/MM/YYYY hh:MM:SS');
                },
            },
            { data: 'codigo' },
            { data: 'nombre' },
            {
                "targets":3,
                "render":function(data, type, row){
                    return "<a href='#' onclick=\"loadEditCategoria('"+row.id+"')\">Editar</a> | <a href='#' onclick=\"loadConfirmDelete('"+row.id+"');\">Eliminar</a>"
                },
            },
        ]
    });
});

function updateDataTable()
{
    DT_CATEGORIAS.ajax.reload();
}

function loadConfirmDelete(id)
{
    CATEGORIA_TO_DELETE=id;
    
    $("#modalContainer1").load("/views/categorias/frm-confirm-delete.html",function(response){
        $('#mdlConfirmDelete').modal({ show: true, backdrop: 'static', size: 'lg', keyboard: false });

});
}

function loadNewCategoria ()
{
    //console.log("hola");
    $("#modalContainer1").load("/views/categorias/frm-new-categoria.html",function(response){


            $('#mdlNewCategoria').modal({ show: true, backdrop: 'static', size: 'lg', keyboard: false });

    });

}
function loadEditCategoria (id)
{

    $("#modalContainer1").load("/views/categorias/frm-edit-categoria.html",function(response){

        loadDataCategoria(id);


    });

}
function loadDataCategoria(id)
{
    $.ajax({
        method: "GET",
        url:"http://daiquiriclub.com/api/categorias/"+id
    })
    .done(function( response){

        $("#txtId").val(response.data.id);
        $("#txtCodigo").val(response.data.codigo);
        $("#txtNombre").val(response.data.nombre);

        $('#mdlEditCategoria').modal({ show: true, backdrop: 'static', size: 'lg', keyboard: false });
    });




}