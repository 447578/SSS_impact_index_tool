create table Cities 
( name VARCHAR(100) NOT NULL,
  PRIMARY KEY (name)
 )engine=innodb;
 
create table Items
(
    city VARCHAR(100) NOT NULL,
    item_name VARCHAR(20) NOT NULL,
    score double,
    story VARCHAR(500),
    category int,
    PRIMARY Key (city, item_name),
    FOREIGN KEY (city) REFERENCES Cities(name)
    ON update cascade 
)engine=innodb;
