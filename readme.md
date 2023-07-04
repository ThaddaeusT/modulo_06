# Iniciar servidor
iniciar el servidor en el archivo startServer.js

# listar todos los animes registrados
GET: http://localhost:3000/api/animes/

# consultar animes registrados por ID
GET: http://localhost:3000/api/animes/1

# Ingresar anime
POST: http://localhost:3000/api/animes
(Body/JSON)

{
  "nombre": "nombre_del_anime",
  "genero": "genero_del_anime",
  "año": "2023",
  "autor": "autor_del_anime"
}

# actualizar anime por ID
PUT: http://localhost:3000/api/animes/1
(Body/JSON)

{
  "nombre": "Akira II",
  "genero": "Seinen",
  "año": "1988",
  "autor": "Katsuhiro Otomo"
}

# eliminar animes registrados por ID
DELETE: http://localhost:3000/api/animes/1

# Iniciar test
1. instalar librerias mocha, chai y chai-http con el siguiente comando:
    npm install mocha chai chai-http -D
2. modificar el archivo package.json con lo siguiente:
    "scripts": {
        "test": "mocha"
    },
3. escribir el siguiente comando:
    npx mocha ./test/getTest.test.js