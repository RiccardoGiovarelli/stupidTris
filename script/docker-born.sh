#!/bin/bash
line=$(docker image ls | grep stupid-tris)
if [ $? -eq 1 ]; then
    echo "Building docker..."
    docker build -t stupid-tris .
fi
echo "Running docker..."
docker run -v $PWD/www:/var/www/html/ -p 127.0.0.1:80:80 --name running-stupid-tris stupid-tris &
cd $PWD/www
npm start