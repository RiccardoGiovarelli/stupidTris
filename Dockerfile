FROM php:7.0-apache
COPY ./config/php.ini /usr/local/etc/php/
COPY ./config/my-httpd.conf /usr/local/apache2/conf/httpd.conf

