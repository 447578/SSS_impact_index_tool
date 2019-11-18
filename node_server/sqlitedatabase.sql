create table if not exists cities(
	name text primary key
);

create table if not exists items(
	city text,
	item_name text,
	score double not null,
	story text not null,
	category integer,
	PRIMARY KEY(city, item_name)
	FOREIGN KEY(city) REFERENCES cities(name)
);
	