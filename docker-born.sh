#!/bin/bash
docker run -d -v $PWD/www:/var/www/html/ -p 127.0.0.1:80:80 --name running-stupid-tris stupid-tris
cd $PWD/www
npm start