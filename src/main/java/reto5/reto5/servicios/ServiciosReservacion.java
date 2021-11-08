/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package reto5.reto5.servicios;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import reto5.reto5.modelo.Reservacion;
import reto5.reto5.repositorio.RepositorioReservacion;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reto5.reto5.repositorio.CountClient;

/**
 *
 * @author LESLY SANTAMARIA
 */
@Service
public class ServiciosReservacion {

    @Autowired
    private RepositorioReservacion metodosCrud;

    public List<Reservacion> getAll() {
        return metodosCrud.getAll();
    }

    public Optional<Reservacion> getReservation(int reservationId) {
        return metodosCrud.getReservation(reservationId);
    }

    public Reservacion save(Reservacion reservation) {
        if (reservation.getIdReservation() == null) {
            return metodosCrud.save(reservation);
        } else {
            Optional<Reservacion> e = metodosCrud.getReservation(reservation.getIdReservation());
            if (e.isEmpty()) {
                return metodosCrud.save(reservation);
            } else {
                return reservation;
            }
        }
    }

    public Reservacion update(Reservacion reservacion) {
        if (reservacion.getIdReservation() != null) {
            Optional<Reservacion> e = metodosCrud.getReservation(reservacion.getIdReservation());
            if (!e.isEmpty()) {

                if (reservacion.getStartDate() != null) {
                    e.get().setStartDate(reservacion.getStartDate());
                }
                if (reservacion.getDevolutionDate() != null) {
                    e.get().setDevolutionDate(reservacion.getDevolutionDate());
                }
                if (reservacion.getStatus() != null) {
                    e.get().setStatus(reservacion.getStatus());
                }
                metodosCrud.save(e.get());
                return e.get();
            } else {
                return reservacion;
            }
        } else {
            return reservacion;
        }
    }

    public boolean deleteReservation(int reservationId) {
        Boolean aBoolean = getReservation(reservationId).map(reservation -> {
            metodosCrud.delete(reservation);
            return true;
        }).orElse(false);
        return aBoolean;
    }

    public StatusReservation getReporteStatusReservaciones(){
        List<Reservacion>completed= metodosCrud.ReservacionStatus("completed");
        List<Reservacion>cancelled= metodosCrud.ReservacionStatus("cancelled");
        return new StatusReservation(completed.size(), cancelled.size());
    }

    public List<Reservacion> getReservationPeriod(String dateA, String dateB) {
        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
        Date aDate = new Date();
        Date bDate = new Date();

        try {
            aDate = parser.parse(dateA);
            bDate = parser.parse(dateB);
        } catch (ParseException evt) {
            evt.printStackTrace();
        }
        if (aDate.before(bDate)) {
            return metodosCrud.getReservationPeriod(aDate, bDate);
        } else {
            return new ArrayList<>();
        }

    }

    public List<CountClient> getTopClientes() {
        return metodosCrud.getTopClientes();
    }

}
