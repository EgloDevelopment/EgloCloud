create table users(
    id serial primary key,
    username text,
    password text,
    fk_user int references users( id )
);

create table extensions(
    id serial primary key,
    ext text,
    active_type text,
    active_id int,
    fk_user int references users( id )
);

create table links(
    id serial primary key,
    link text,
    fk_ext int references extensions( id ),
    unique( fk_ext )
);

create table splashes(
    id serial primary key,
    type text,
    msg text,
    fk_ext int references extensions( id ),
    unique( fk_ext )
);

create table endpoints(
    id serial primary key,
    type text,
    handle text,
    active boolean default FALSE,
    fk_ext int references extensions( id ),
    constraint idx_fkext_type unique( fk_ext, type )
);

/*
create unique index idx_fkext_type on endpoints ( fk_ext, type );
*/
