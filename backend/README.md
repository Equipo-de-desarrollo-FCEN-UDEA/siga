
# Siga Backend

## Para los que desarrollarán backend:

La principal herramienta que usaremos para desarrollar en el lado del backend es docker, para no tener que instalar una gran cantidad de servicios como lo son redis, mongo, postgres, pgadmin, etc.

Para la instalación de docker siga la guía oficial de docker https://docs.docker.com/engine/install/

Con docker instalado procesa a instalar docker compose, yo recomiendo la instalación de docker desktop, las cuales se pueden encontrar en: https://docs.docker.com/compose/install/

### Ejecutar docker compose

De acuerdo a la versión que tenga de docker deberá usar docker-compose en lugar de docker compose.

Recuerde que en el archivo example.env está la configuración necesaria para ejercutar el backend con docker, es importante entonces que cree su propio archivo .env y lo modifique con los datos que sean de su preferencia, recuerde que sin este archivo no se ejecurá bien el docker compose.

Ahora bien para ejecutar el docker compose ejecute en su bash los siguientes comandos:

```bash
docker compose -f docker-compose.dev.yml build
docker compose -f docker-compose.dev.yml up
```

Una vez se ejecute todos los contenedores asegurese de que no salgan errores inesperados, en algunos casos la primera vez que ejecutamos el segundo comando el backend no se conecta a la base de datos porque no espera a que esta se inicie correctamente, si le sucede esto detenga los contenedores y vuelva a ejecutar el segundo comando.

Recuerde que la documentación automática estará expuesta en el puerto 8001, pgadmin (para administrar la base de datos) está expuesto en el puerto 80 y flower para verificar nuestras tareas asincronas está en el puerto 5555


Con lo anterior le bastaría para desarrollar sin ningún inconveniente, sin embargo es de gran ayuda iniciar un ambiente virtual dentro del fichero de backend, esto con el fin de que visual studio code les pueda auto completar las funcionaliades y demás cosas de las librerías.

### Para crear un ambiente virtual con poetry

Lo primero que se debe hacer es instalar poetry https://ython-poetry.org/docs/#installation 

Una vez tenga instalado poetry le recomiendo seguir la guía para añadir el bin a la terminal y poder ejecutar comandos de poetry, para verificar que poetry quedó bien instalado haga uso del comando

``` bash
poetry --version
```

Una vez se puedan ejecutar comandos de poetry en nuestra terminal deberemos ir hasta la carpeta backend y agregaremos las siguientes líneas de bash

```bash
export POETRY_VIRTUALENVS_IN_PROJECT=true
poetry install
```

Y con esto bastará para crear el entorno virtual de python con todos los requerimientos necesarios para ejecutar el código.

### Para conectar pgadmin a la base de datos de postgres

Vaya al puerto 80 de su localhost, ingrese con las credenciales que se encuentran en su archivo de entorno (.env) y haga loging, de click donde dice add server y nombrelo como siga, luego dirijase a la pestaña connection en Host name/address ingrese host.docker.internal ó 172.17.0.1 en caso de que les salga error con la red interna de docker, en username y password ingrese las credenciales que modificó en el archivo de entorno.

### Ejecutar tests

Vaya al directorio de backend y ejecute
```bash
poetry run pytest tests/run_test.py 
```