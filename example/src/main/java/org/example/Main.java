package org.example;

import java.util.Random;
import java.util.Scanner;

//Main.main([]);
public class Main {
    public static void main(String[] args) {
        //inputData();
        int[] mas = new int[10];
        for (int i=0;i<mas.length; i++) {
            mas[i]=getRandom(18,60);
        }
        //Цикл foreach(int item in mas)
        for(int item : mas)
            System.out.println(item);
    }
    private static int getRandom(int min, int max) {
        Random rand = new Random();
        return rand.nextInt(max-min)+min;
    }
    private static void inputData() {
        //int, double, float, char, boolean, String,
        System.out.println("Вкажіть ваше ім'я:");
        String name;
        Scanner scanner = new Scanner(System.in);
        name = scanner.nextLine(); //Console.ReadLine();
        System.out.println("Привіт " + name);
    }
}