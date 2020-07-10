DROP TABLE if EXISTS orders;
DROP TABLE IF EXISTS orderitems;
DROP TABLE if EXISTS carts;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS users;
create table users
(
    ID numeric(4,0),
    name_users VARCHAR(10),
    password_users VARCHAR(10),
    user_type Bit,
    email VARCHAR(20),
    _availability Bit,

    PRIMARY KEY(ID)
);

create TABLE books
(
    ID NUMERIC(4,0),
    title VARCHAR(50),
    author VARCHAR(50),
    isbn NUMERIC(20,0),
    stock NUMERIC(4,0),
    price NUMERIC(4,1),
    details VARCHAR(1000),
    PRIMARY KEY(ID)
);


create TABLE orders
(
    ID NUMERIC(4,0),
    customer NUMERIC(4,0),
    id_item NUMERIC(4,0),
    sum_book NUMERIC(4,0),
    purchase_time DATE,
    PRIMARY KEY(ID)
);

CREATE TABLE carts
(
    ID NUMERIC(4,0),
    customer NUMERIC(4,0),
    id_item NUMERIC(4,0),
    sum_book NUMERIC(4,0),
    PRIMARY KEY(ID)
);