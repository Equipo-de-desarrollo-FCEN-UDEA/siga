# Siga

Este desarrollo está construido por capas, una capa de dominio en donde encontraremos nuestras entidades y las reglas que rigen lo que se puede o no hacer con estas, en la capa de servicios tenemos toda la lógica de negocio, en la capa de adaptadores tenemos toda la exposición de la api, en la capa de infraestructura tenemos toda la configuración para dar inicio al proyecto.



## Ejecución

Con el siguiente código se puede ejecutar toda la aplicación, asegurese que su docker no esté ejecutando otros contenedores para evitar conflictos.

```bash
docker compose -f docker-compose.prod.yml
```



Para administrar la base de datos acceda a través de la url: localhost:8010, recuerde revisar las variables de entorno, por defecto el acceso a base de datos es user : simon@example.com, password : password