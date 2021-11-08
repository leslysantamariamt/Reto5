/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package reto5.reto5.repositorio;

import reto5.reto5.interfaces.InterfaceQuadbikes;
import reto5.reto5.modelo.Quadbike;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author USUARIO
 */
@Repository
public class RepositorioQuadbikes {
    @Autowired
    private InterfaceQuadbikes crud;
    

    public List<Quadbike> getAll(){
        return (List<Quadbike>) crud.findAll();       
    }
    
    public Optional <Quadbike> getQuadbikes(int id){
        return crud.findById(id);
    }
    
    public Quadbike save(Quadbike quadbikes){
        return crud.save(quadbikes);
    }
      public void delete(Quadbike quadbikes){
        crud.delete(quadbikes);
    }
}
