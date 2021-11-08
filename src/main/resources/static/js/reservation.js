var urlBaseClient = "http://localhost:8080/api/Client";
var urlBaseQuadbike = "http://localhost:8080/api/Quadbike";
var urlBaseReservation = "http://localhost:8080/api/Reservation";
$(document).ready(getReservation);
function getReservation() {
    $("#info").removeAttr("style");
    hideForm();

    $.ajax({
        url: urlBaseClient + "/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            clientes = respuesta;
            cargarClientes(clientes);

        }
    });
    $.ajax({
        url: urlBaseQuadbike + "/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            cuatrimotos = respuesta;
            cargarQuadbike(cuatrimotos);
        }
    });


    $.ajax({
        dataType: 'json',
        url: urlBaseReservation + "/all",
        type: "GET",
        success: function (response) {
            var misItems = response;
            for (let i = 0; i < misItems.length; i++) {
                $("#allItems").append("<tr>");
                $("#allItems").append("<td>" + misItems[i].idReservation + "</td>");
                $("#allItems").append("<td>" + misItems[i].quadbike.name + "</td>");
                $("#allItems").append("<td>" + misItems[i].status + "</td>");
                $("#allItems").append("<td>" + misItems[i].client.idClient + ' ' + misItems[i].client.name + ' ' + misItems[i].client.email + "</td>");
                $("#allItems").append("<td>" + '<button class="btn btn-link" onclick="score(' + misItems[i].score + ')">' + (misItems[i].score == null) ? "0" : misItems[i].score + '</button>' + "</td>");
                $("#allItems").append('<td><button class="btn btn-link" onclick="deleteReservation(' + misItems[i].idReservation + ')">Borrar Reservación </button>');
                $("#allItems").append('<td><button class="btn btn-link" onclick="getReservationById(' + misItems[i].idReservation + ')">Actualizar Reservación</button>');
                $("#allItems").append("</tr>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function getReservationById(idReservation) {
    $("#crearreserva").removeAttr("style");
    $("#actualizarreservacion").removeAttr("style");
    $("#btnCancelar").removeAttr("style");
    $("#btncrearReservacion").attr("style", "display: none");
    console.log("id ver : " + idReservation);
    let opc = confirm('Recuerde que solo puede actualizar la fecha de inicio y fecha de devolución de la reserva. / Remember that you just can update the reservation\'s start Date and devolution Date.');
    if (opc) {
        $.ajax({
            dataType: 'json',
            url: urlBaseReservation + "/" + idReservation,
            type: 'GET',
            success: function (response) {
                console.log(response);
                var item = response;
                $("#starDate").val(item.starDate),
                        $("#devolutionDate").val(item.devolutionDate);
                $("#client").val(item.client);
                $("#quadbike").val(item.quadbike);
                var elemento = {
                    id: $('#idReservation').val(item.id),
                    starDate: $("#starDate").val(),
                    devolutionDate: $("#devolutionDate").val(),
                    client: $("#client").val(),
                    quadbike: $("#quadbike").val()
                };
                var dataToSend = JSON.stringify(item);

            },
            error: function (jqXHR, textStatus, errorThrown) {}
        });
    }
}


function cargarClientes(clientes) {
    var opciones;
    for (var i = 0; i < clientes.length; i++) {
        opciones += `
            <option value="${clientes[i].idClient}">${clientes[i].name}</option>`;
    }
    $("#client").html(opciones);
}

function cargarQuadbike(cuatrimotos) {
    var opciones;
    for (var i = 0; i < cuatrimotos.length; i++) {
        opciones += `
            <option value="${cuatrimotos[i].id}">${cuatrimotos[i].name}</option>`;
    }
    $("#quadbike").html(opciones);
}


function postReservation() {
    $("#actualizarreservacion").attr("style", "display:none");
    var elemento = {
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
        quadbike: {id: +$("#quadbike").val()},
        client: {idClient: +$("#client").val()}

    };

    console.log(elemento);
    $.ajax({
        dataType: "json",
        data: elemento,
        url: urlBaseReservation + "/save",
        type: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(elemento),
        statusCode: {
            201: function () {
                alert('Se ha registrado la reserva');
                window.location.reload();
            }
        }
    });
}

function putReservation() {

    console.log("ejecutando funcion para actualizar");

    var elemento = {
        idReservation: $("#idReservation").val(),
        starDate: $("#starDate").val(),
        devolutionDate: $("#devolutionDate").val()
    };
    console.log("id :" + elemento.idReservation);
    var dataToSend = JSON.stringify(elemento);

    let opc = confirm('¿Está seguro que desea actualizar esta reservación?\n Are you sure that you want update this reservation?');
    if (opc) {
        $.ajax({

            contentType: 'application/json',
            data: dataToSend,
            url: urlBaseReservation + "/update",
            type: "PUT",
            success: function (response) {
                alert("¡Reserva editada exitosamente!");
                location.reload();
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }

}

function deleteReservation(idReservation) {
    console.log("eliminando id: " + idReservation);
    let opc = confirm('¿Está seguro que desea eliminar esta reservación?\n Are you sure that you want delete this reservation?');
    if (opc) {

        $.ajax({
            dataType: 'json',
            url: urlBaseReservation + "/" + idReservation,
            type: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                204: function (response) {
                    success:{
                        // console.log(response);
                        alert('Se ha eliminado la reservación');
                        getReservation();
                        window.location.reload();
                    }

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}


function showForm() {
    $("#formPost").removeAttr("style");
    $("#btnGuardar").removeAttr("style");
    $("#crearreserva").removeAttr("style");
    $("#crearreserva2").removeAttr("style");
    $("#clientn").removeAttr("style");
    $("#cuatrimotos").removeAttr("style");
    $("#btncrearReservacion").attr("style", "display: none");
    getReservation();
    hideTable();
}

function cancelar() {
    window.location.href = "reservation.html";
}

function hideForm() {
    $("#formPost").attr("style", "display: none");
    $("#btnGuardar").attr("style", "display: none");
}

function hideTable() {
    $("#info").attr("style", "display: none");
}
