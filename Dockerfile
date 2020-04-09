# Docker image
FROM php:7.2-apache

# Copy config files
COPY ./config/php.ini /usr/local/etc/php/
COPY ./config/my-httpd.conf /usr/local/apache2/conf/httpd.conf