package org.example.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name="tbl_categories")
public class CategoryEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 200, nullable = false)
    private String name;

    @Column(length = 200)
    private String image;

    @Column(length = 4000)
    private String description;

    @Column(name="date_created")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCreated;
}
