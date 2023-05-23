package com.example.backend.model;

import jakarta.persistence.*;

@Entity(name = "categories")
public class Category {

    @Id
    @SequenceGenerator(name="cat_seq",sequenceName = "cat_seq",allocationSize = 1)
    @GeneratedValue(generator = "cat_seq")
    private Long id;
    @Column(nullable = false)
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
