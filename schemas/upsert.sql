truncate table endpoints;

select * from endpoints;

insert into endpoints
( fk_ext, type, handle )
values ( 1, 'twitch', 'Eidylon' )
on conflict ( fk_ext, type ) do update set handle = excluded.handle;

select * from endpoints;

insert into endpoints
( fk_ext, type, handle )
values ( 1, 'twitch', 'Brodolon' )
on conflict ( fk_ext, type ) do update set handle = excluded.handle;

select * from endpoints;

insert into endpoints
( fk_ext, type, handle )
values ( 1, 'steam', '[RE]Eidy' )
on conflict ( fk_ext, type ) do update set handle = excluded.handle;

select * from endpoints;

insert into endpoints
( fk_ext, type, handle )
values ( 1, 'steam', '[RE]Eidy' )
on conflict ( fk_ext, type ) do update set handle = excluded.handle;

select * from endpoints;
