let urlBaseReport = "http://150.136.58.216:8080/api/Reservation";

$(document).ready();


function getReportByStatus() {
    $("#info").removeAttr("style");
    $("#completed").removeAttr("style");
    $("#cancelled").removeAttr("style");
    $("#status").removeAttr("style");
    $("#dates2").attr("style", "display: none");
    $("#dates").attr("style", "display: none");
    $("#client").attr("style", "display: none");

    hideForm();
    $.ajax({
        dataType: 'json',
        url: urlBaseReport + "/report-status",
        type: "GET",
        success: function (response) {
            console.log(response);
            var misItems = response;

            $("#completed").append(response.completed);
            $("#cancelled").append(response.cancelled);

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function mostrarfechas() {
    $("#info").removeAttr("style");
    $("#dates").removeAttr("style");
    $("#status").attr("style", "display: none");
    $("#client").attr("style", "display: none");
    let fechainicio = $("#Dateinicio").val();
    let fechafin = $("#DateFin").val();

}

function getReportByDate() {
    $("#info").removeAttr("style");
    $("#dates2").removeAttr("style");
    $("#dates").attr("style", "display: none");
    $("#status").attr("style", "display: none");
    $("#client").attr("style", "display: none");
    hideForm();
    let fechainicio = $("#Dateinicio").val();
    let fechafin = $("#DateFin").val();
    console.log(fechainicio + fechafin);
    if (confirmarfechas()) {

        $.ajax({
            dataType: 'json',
            url: urlBaseReport + "/report-dates/" + fechainicio + "/" + fechafin,
            type: "GET",
            success: function (response) {
                console.log(response);
                var misItems = response;
                for (let i = 0; i < misItems.length; i++) {
                    $("#allDates2").append("<tr>");
                    $("#allDates2").append("<td>" + misItems[i].startDate.split("T")[0] + "</td>");
                    $("#allDates2").append("<td>" + misItems[i].devolutionDate.split("T")[0] + "</td>");
                    $("#allDates2").append("<td>" + misItems[i].status + "</td>");
                    $("#allDates2").append("</tr>");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}

function confirmarfechas() {
    let fechainicio = $("#Dateinicio").val();
    let fechafin = $("#DateFin").val();
    if (Date.parse(fechainicio) > Date.parse(fechafin)) {
        //  $("#").val()
        alert('Recuerde que la  fecha de fin debe ser posterior a la fecha de inicio.Por favor verifique las fechas.');
        mostrarfechas();
        $("#dates2").attr("style", "display: none");
        return false;
    }
    return true;
}


function getReportByClient() {
    $("#info").removeAttr("style");
    $("#client").removeAttr("style");
    $("#status").attr("style", "display: none");
    $("#dates2").attr("style", "display: none");
    $("#dates").attr("style", "display: none");
    hideForm();

    $.ajax({
        dataType: 'json',
        url: urlBaseReport + "/report-clients",
        type: "GET",
        success: function (response) {
            console.log(response);
            var misItems = response;
            for (let i = 0; i < misItems.length; i++) {
                $("#allClients").append("<tr>");
                $("#allClients").append("<td>" + misItems[i].total + "</td>");
                $("#allClients").append("<td>" + misItems[i].client.name + "</td>");
                $("#allClients").append("<td>" + misItems[i].client.email + "</td>");
                $("#allClients").append("<td>" + misItems[i].client.age + "</td>");
                $("#allClients").append("</tr>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function showForm() {
    $("#formPost").removeAttr("style");

    hideTable();
}

function hideForm() {
    $("#formPost").attr("style", "display: none");

}

function hideTable() {
    $("#info").attr("style", "display: none");
}
