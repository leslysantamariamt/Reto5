/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package reto5.reto5.repositorio;


import java.util.ArrayList;
import java.util.Date;
import reto5.reto5.interfaces.InterfaceReservation;
import reto5.reto5.modelo.Reservacion;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import reto5.reto5.modelo.Cliente;



/**
 *
 * @author USUARIO
 */
@Repository
public class RepositorioReservacion {
    @Autowired
    private InterfaceReservation crud4;
    
    public List<Reservacion> getAll(){
        return (List<Reservacion>) crud4.findAll();
    }
    public Optional<Reservacion> getReservation(int id){
        return crud4.findById(id);
    }
    public Reservacion save(Reservacion reservacion){
        return crud4.save(reservacion);
    }
     public void delete(Reservacion reservacion){
        crud4.delete(reservacion);
        
     }
      
       public List<Reservacion> ReservacionStatus (String status){
         return crud4.findAllByStatus(status);
     }
     
     public List<Reservacion> getReservationPeriod (Date a, Date b){
         return crud4.findAllByStartDateAfterAndStartDateBefore(a, b);
     }
   
     public List<CountClient> getTopClientes(){
         List<CountClient> res=new ArrayList<>();
         List<Object[]>report = crud4.countTotalReservationsByClient();
         for(int i=0; i<report.size();i++){
             res.add(new CountClient((Long)report.get(i)[1],(Cliente) report.get(i)[0]));
         
         }
         return res;
     }
       
   
    }

