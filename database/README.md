Ensure you have `docker-compose` installed.

Run:

```
docker-compose up
```

You can connect to the database using DBeaver (or similar), using the connection details stored in `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD`. By default this will be `mysql://local:local@localhost:3306/wardrobe_local`.

Scripts under `./init` will be executed in alphanumerical order upon database initialization. It is recommended to name schema versions and subsequent migrations in incremental integers, and have a single `data.sql` file to generate test data.
