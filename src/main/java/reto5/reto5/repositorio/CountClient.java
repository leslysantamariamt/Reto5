/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package reto5.reto5.repositorio;

import reto5.reto5.modelo.Cliente;


/**
 *
 * @author LESLY SANTAMARIA
 */
public class CountClient {
    
    private Long total;
    private Cliente client;

    public CountClient(Long total, Cliente client) {
        this.total = total;
        this.client = client;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Cliente getClient() {
        return client;
    }

    public void setClient(Cliente client) {
        this.client = client;
    }
      
}
