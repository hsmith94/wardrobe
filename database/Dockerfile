# Use the official MySQL 8.0 image as the base image
FROM mysql:8.0

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=wardrobe_local
ENV MYSQL_USER=local
ENV MYSQL_PASSWORD=local
ENV MYSQL_ALLOW_EMPTY_PASSWORD=yes

# Copy custom MySQL configuration file
COPY ./docker/db/my.cnf /etc/mysql/conf.d/my.cnf

# Copy custom startup scripts to initialize the database
COPY ./init /docker-entrypoint-initdb.d

# Expose port 3306 for MySQL
EXPOSE 3306

# Start MySQL when the container starts
CMD ["mysqld", "--default-authentication-plugin=mysql_native_password", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]
