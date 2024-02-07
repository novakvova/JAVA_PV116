package org.example.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name="tbl_categories")
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 200, nullable = false)
    private String name;

    @Column(length = 150)
    private String image;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCreated;
}
