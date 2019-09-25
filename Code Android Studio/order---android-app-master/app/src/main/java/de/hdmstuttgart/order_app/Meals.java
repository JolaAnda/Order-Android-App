package de.hdmstuttgart.order_app;

import java.io.Serializable;

public class Meals implements Serializable {

    public String kategorie;
    //public String description;
    public String name;
    public double price;
    public String description;
    public String id;

    public Meals(String id, String kategorie, String name,String description, double price) {
        this.kategorie = kategorie;
        this.name = name;
        this.price = price;
        this.description = description;
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public String getKategorie() {
        return kategorie;
    }

    public void setKategorie(String kategorie) {
        this.kategorie = kategorie;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getPrice() {
        return price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
