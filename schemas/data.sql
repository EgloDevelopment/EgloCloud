do $$
declare
    usrid int;
    extid int;
    example int;
begin
    /* create a test user */
    insert into users( username, password )
    values( 'test', 'test' )
    returning id into usrid;

    /* create an extension for the test user */
    insert into extensions ( ext, fk_user )
    values ( 'test', usrid )
    returning id into extid;

    /* create one of each redirect types for the extension */
    insert into links ( link, fk_ext )
    values ( 'https://www.google.com/', extid );

    insert into splashes ( type, msg, fk_ext )
    values ( 'default', 'testsplash', extid );

    insert into endpoints ( type, handle, fk_ext )
    values ( 'twitch', 'Eidylon', extid );

    /* EXAMPLE EXTENSION FOR HOME PAGE */
    insert into extensions ( ext, fk_user )
    values ( '1337', usrid )
    returning id into example;

    insert into splashes ( type, msg, fk_ext )
    values ( 'default', 'Splash page for x1337!', example );
end $$;
