FROM php:7-fpm 
RUN docker-php-ext-install pdo pdo_mysql
COPY ./config/php.ini /usr/local/etc/php/
COPY ./config/my-httpd.conf /usr/local/apache2/conf/httpd.conf

