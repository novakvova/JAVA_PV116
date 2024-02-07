package org.example;

import org.example.entities.CategoryEntity;
import org.example.utils.HibernateUtil;
import org.hibernate.Session;

import java.util.Calendar;

public class Main {
    public static void main(String[] args) {
        var sf = HibernateUtil.getSessionFactory();

        try(Session session = sf.openSession())
        {
            session.beginTransaction();

            Calendar calendar = Calendar.getInstance();
            CategoryEntity category = new CategoryEntity();
            category.setName("Взуття");
            category.setImage("2.jpg");
            category.setDateCreated(calendar.getTime());

            session.save(category);
            session.getTransaction().commit();
        }
        sf.close();
    }
}