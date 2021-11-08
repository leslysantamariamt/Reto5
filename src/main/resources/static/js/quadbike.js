var urlBaseQuadbike = "http://localhost:8080/api/Quadbike";
var urlBaseCategory = "http://localhost:8080/api/Category";
$(document).ready(getQuadbike);
$(document).ready(autoInicio);

function getQuadbike() {
    $("#info").removeAttr("style");
    hideForm();
    $.ajax({
        dataType: 'json',
        url: urlBaseQuadbike + "/all",
        type: "GET",
        success: function (response) {
            console.log(response);
            var misItems = response;
            for (let i = 0; i < misItems.length; i++) {
                $("#allItems").append("<tr>");
                $("#allItems").append("<td>" + misItems[i].name + "</td>");
                $("#allItems").append("<td>" + misItems[i].brand + "</td>");
                $("#allItems").append("<td>" + misItems[i].year + "</td>");
                $("#allItems").append("<td>" + misItems[i].description + "</td>");
                $("#allItems").append("<td>" + misItems[i].category.name == null ? "No hay categorias" : misItems[i].category.name + "</td>");
                $("#allItems").append('<td><button class="btn btn-link" onclick="deleteQuadbike(' + misItems[i].id + ')">Borrar Cuatrimoto</button>');
                $("#allItems").append('<td><button class="btn btn-link" onclick="getQuadbikeById(' + misItems[i].id + ')">Actualizar Cuatrimoto</button>');
                $("#allItems").append("</tr>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function getQuadbikeById(idQuadbike) {
    console.log("Ver id: " + idQuadbike);
    $("#formPost").removeAttr("style");
    $("#btnEditar").removeAttr("style");
    $("#btnCancelar").removeAttr("style");
    $("#categorydata").attr("style", "display:none");
    $("#crearcuatrimoto").attr("style", "display: none");
    $("#btncrearCuatrimoto").attr("style", "display: none");
    $("#actualizarcuatrimoto").removeAttr("style");
    console.log("id ver : " + idQuadbike);
    let opc = confirm('Recuerde que solo puede actualizar la marca, nombre, año y descripción de la cuatrimoto. / Remember that you just can update the quadbike\'s brand, name, year and description.');
    if (opc) {
        $.ajax({
            dataType: 'json',
            url: urlBaseQuadbike + "/" + idQuadbike,
            type: 'GET',
            success: function (response) {
                console.log(response);
                var item = response;
                $("#brand").val(item.brand),
                        $("#year").val(item.year);
                $("#categoryid").val(item.categoryid);
                $("#nameQuadbike").val(item.name);
                $("#descriptionQuadbike").val(item.description);
                var elemento = {
                    id: $('#idQuadbike').val(item.id),
                    brand: $("#brand").val(),
                    year: $("#year").val(),
                    name: $("#nameQuadbike").val(),
                    description: $("#descriptionQuadbike").val()
                };
                var dataToSend = JSON.stringify(item);

            },
            error: function (jqXHR, textStatus, errorThrown) {}
        });
    }
}

function autoInicio() {
    console.log("Se esta ejecutando el autoinicio");
    $.ajax({
        url: urlBaseCategory + "/all",
        type: "GET",
        dataType: 'json',
        success: function (json) {
            console.log(json);
            categorias = json;
            show(json);
        },
    })

}

function show(json) {
    var opciones;
    for (var i = 0; i < json.length; i++) {
        opciones += `
            <option value="${json[i].id}">${json[i].name}</option>`;
    }
    ;
    $("#categoryname").html(opciones);
}

function postQuadbike() {
    $("#formPost").removeAttr("style");
    let var2 = {

        brand: $("#brand").val(),
        name: $("#nameQuadbike").val(),
        year: $("#year").val(),
        description: $("#descriptionQuadbike").val(),
        category: {id: +$("#categoryname").val()},
    };

    console.log(var2.category);
    if (checkQuadbike(var2)) {

        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),

            url: urlBaseQuadbike + "/save",

            success: function (json, status, xhr) {
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                window.location.reload()

            },

            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");


            }
        });
    }
    ;

}

function putQuadbike() {
    console.log("ejecutando funcion para actualizar");


    var elemento = {
        id: $("#idQuadbike").val(),
        brand: $("#brand").val(),
        name: $("#nameQuadbike").val(),
        year: $("#year").val(),
        description: $("#descriptionQuadbike").val()
    }

    var dataToSend = JSON.stringify(elemento);
    if (checkQuadbike(elemento)) {
        let opc = confirm('¿Está seguro que desea actualizar esta cuatrimoto?\n Are you sure that you want update this quadbike?');
        if (opc) {

            $.ajax({
                contentType: 'application/json',
                data: dataToSend,
                url: urlBaseQuadbike + "/update",
                type: "PUT",
                success: function (response) {
                    alert("¡Cuatrimoto editada exitosamente!");
                    location.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });
        }
    }
}

function deleteQuadbike(id) {
    console.log("eliminando id: " + id);
    let opc = confirm('¿Está seguro que desea eliminar esta categoria?\n Are you sure that you want delete this category?');
    if (opc) {

        $.ajax({
            dataType: 'json',
            url: urlBaseQuadbike + "/" + id,
            type: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                204: function (response) {
                    success:{
                        // console.log(response);
                        alert('Se ha eliminado la cuatrimoto');
                        getQuadbike();
                        window.location.reload();
                    }

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}

function show(json) {
    var opciones;
    for (var i = 0; i < json.length; i++) {
        opciones += `
            <option value="${json[i].id}">${json[i].name}</option>`;
    }
    ;
    $("#categoryname").html(opciones);
}

function checkQuadbike(quadbike) {
    if (quadbike.id <= 0 || quadbike.brand === '' || quadbike.year === '' || quadbike.name === '' || quadbike.categoryid <= '' || quadbike.description <= '') {
        alert("Procure no dejar campos vacíos!");
        return false;
    }
    return true;
}
function showForm() {
    $("#formPost").removeAttr("style");
    $("#btnGuardarCuatrimoto").removeAttr("style");
    $("#btnCancelar").removeAttr("style");
    $("#btncrearCuatrimoto").attr("style", "display: none");
    $("#crearcuatrimoto").attr("style");
    hideTable();
    autoInicio();
}

function hideForm() {
    $("#formPost").attr("style", "display: none");
    $("#btnGuardarCuatrimoto").attr("style", "display: none");
}

function cancelar() {
    window.location.href = "quadbike.html";
}
function hideTable() {
    $("#info").attr("style", "display: none");
}


