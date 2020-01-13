create table if not exists cities(
	name text primary key
);

create table if not exists items(
	city text,
	item_name text,
	score double not null,
	story text not null,
	category text,
	PRIMARY KEY(city, item_name)
	FOREIGN KEY(city) REFERENCES cities(name)
);

create table if not exists categories(
	city text,
	category text,
	description text,
	pitfall text,
	opportunity text,
	PRIMARY KEY(city, category)
	FOREIGN KEY(city) REFERENCES cities(name)
);

create table if not exists steps(
	city text,
	category text,
	step text,
	PRIMARY KEY(city, category, step)
	FOREIGN KEY(city) REFERENCES cities(name)
)

	