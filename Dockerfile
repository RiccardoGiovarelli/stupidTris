FROM php:7.2-apache

COPY ./www /var/www/html

COPY ./config/php.ini /usr/local/etc/php/
COPY ./config/my-httpd.conf /usr/local/apache2/conf/httpd.conf

COPY ./www/index.php /var/www/html/