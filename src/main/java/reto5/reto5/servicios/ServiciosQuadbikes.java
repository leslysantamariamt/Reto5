/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package reto5.reto5.servicios;

import reto5.reto5.modelo.Quadbike;
import reto5.reto5.repositorio.RepositorioQuadbikes;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author LESLY SANTAMARIA
 */
@Service
public class ServiciosQuadbikes {
     @Autowired
    private RepositorioQuadbikes metodosCrud;
    
    public List<Quadbike> getAll(){
        return metodosCrud.getAll();
    }
    
    public Optional<Quadbike> getQuadbikes(int idQuadbikes){
        return metodosCrud.getQuadbikes(idQuadbikes);
    }
    
    public Quadbike save(Quadbike quadbikes){
        if(quadbikes.getId()==null){
            return metodosCrud.save(quadbikes);
        }else{
            Optional<Quadbike> evt=metodosCrud.getQuadbikes(quadbikes.getId());
            if(evt.isEmpty()){
                return metodosCrud.save(quadbikes);
            }else{
                return quadbikes;
            }
        }
    }
    public Quadbike update(Quadbike quadbikes){
        if(quadbikes.getId()!=null){
            Optional<Quadbike> e=metodosCrud.getQuadbikes(quadbikes.getId());
            if(!e.isEmpty()){
                if(quadbikes.getName()!=null){
                    e.get().setName(quadbikes.getName());
                }
                if(quadbikes.getBrand()!=null){
                    e.get().setBrand(quadbikes.getBrand());
                }
                if(quadbikes.getYear()!=null){
                    e.get().setYear(quadbikes.getYear());
                }
                if(quadbikes.getDescription()!=null){
                    e.get().setDescription(quadbikes.getDescription());
                }
                if(quadbikes.getCategory()!=null){
                    e.get().setCategory(quadbikes.getCategory());
                }
                metodosCrud.save(e.get());
                return e.get();
            }else{
                return quadbikes;
            }
        }else{
            return quadbikes;
        }
    }


    public boolean deleteQuadbikes(int quadbikesId) {
        Boolean aBoolean = getQuadbikes(quadbikesId).map(quadbikes -> {
            metodosCrud.delete(quadbikes);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
