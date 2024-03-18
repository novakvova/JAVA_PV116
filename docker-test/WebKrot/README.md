# Docker run project

ASP.NET Core MVC
* docker images
* docker build -t webkrot_image .
* docker images
* docker run -it --rm -p 5453:80 --name webkrot_image_container webkrot_image
* docker run -d --restart=always --name webkrot_image_container -p 5453:80 webkrot_image
* docker ps -a
* docker stop webkrot_image_container
* docker rm webkrot_image_container
* docker ps -a
* docker rmi webkrot_image
* docker images