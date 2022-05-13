CREATE DATABASE ToonUn_Usuario;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(40),
    name VARCHAR(40),
    lastname VARCHAR(40),
    email TEXT,
    password TEXT,
    birthday DATE

);

INSERT INTO users (nickname, name, lastname, email,password, birthday)
    VALUES  ('JUAN12','Juan','Silva','jussilca@unal.edu.co','123445','1997-11-20'),
            ('SEBAS12','Sebas','Castillo','sessilca@unal.edu.co','123445','1998-12-21');





select * from users;


