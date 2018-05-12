born:
	sudo ./script/docker-born.sh

halt:
	sudo docker stop running-stupid-tris
	sudo docker rm running-stupid-tris

start:
	sudo docker start running-stupid-tris

stop:
	sudo docker stop running-stupid-tris
