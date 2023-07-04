//importacion de modulos express y filesystem
const express = require("express"); 
const fs = require("fs");

const app = express();
port = 3000;

//middleware
app.use(express.json());

//iniciar el servidor
/* app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
}); */

//Crear CRUD completo de los datos. El id será el primer argumento para acceder a las propiedades de cada anime.
//READ toda la database de animes.json
app.get("/api/animes", (req, res)=>{
    console.log("en app.get");
    try {
        const data =fs.readFile("./database/anime.json",(err, data)=>{
            if(err){
                console.log("se produjo un error en data: ", err);
                return false;
            }
            else{
                const animes=JSON.parse(data);
                res.status(200).send({animes});
                return animes;
            }
        })
    } catch (error) {
        console.log("se produjo un error en app.get: ", error)
        res.status(500).json({error})
    }
});

//CREATE un anime en la database de animes.json

app.post("/api/animes", (req, res)=>{
    console.log("en app.post");
    try {
        const data =fs.readFile("./database/anime.json",(err, data)=>{
            if(err){
                console.log("se produjo un error en data: ", err);
                return false;
            }
            else{
                const animes=JSON.parse(data);
                let objectLength =Object.keys(animes).length;
                const id=objectLength+1;
                const newAnime = req.body;
                animes[id] = newAnime;
                fs.writeFile("./database/anime.json",JSON.stringify(animes, null, 4), (err)=>{
                    if(err){
                        console.log("se produjo un error en fs.writefile: ", err);
                        return false;
                    }
                    else{
                        console.log("el archivo ha sido modificado")
                        //res.status(200).send("el archivo a sido modificado");
                        res.status(200).json({ message: "anime agregado con exito", newAnime });
                    }
                })
            }
        })
    } catch (error) {
        console.log("se produjo un error en app.post: ", error)
        res.status(500).json({error})
    }
})

//UPDATE un anime en la database de animes.json
app.put("/api/animes/:id", (req, res)=>{
    console.log("en app.put -> id:", req.params.id);
    id= req.params.id;
    try {
        const data =fs.readFile("./database/anime.json",(err, data)=>{
            if(err){
                console.log("se produjo un error en data: ", err);
                return false;
            }
            else{
                const animes=JSON.parse(data);
                for (const key in animes) {
                    if (key == id){
                        const updatedAnime = req.body;
                        animes[id] = updatedAnime
                    }
                }
                fs.writeFile("./database/anime.json",JSON.stringify(animes, null, 4), (err)=>{
                    if(err){
                        console.log("se produjo un error en fs.writefile: ", err);
                        return false;
                    }
                    else{
                        console.log("el archivo ha sido modificado")
                        //res.status(200).send("el archivo a sido modificado");
                        res.status(200).json({ message: "anime modificado con exito", anime:animes[id] });
                    }
                });
            }
        });
    } catch (error) {
        console.log("se produjo un error en app.put: ", error)
        res.status(500).json({error})
    }
})

//DELETE un anime en la database de animes.json
app.delete("/api/animes/:id", (req, res)=>{
    console.log("en app.delete -> id:", req.params.id);
    let id= req.params.id;
    try {
        const data =fs.readFile("./database/anime.json",(err, data)=>{
            if(err){
                console.log("se produjo un error en data: ", err);
                return false;
            }
            else{
                const animes=JSON.parse(data);
                for (const key in animes) {
                    if (key == id){
                        //const updatedAnime = req.body;
                        //animes[id] = updatedAnime
                        animes[id].nombre ="";
                        animes[id].genero ="";
                        animes[id].año ="";
                        animes[id].autor ="";
                    }
                }
                fs.writeFile("./database/anime.json",JSON.stringify(animes, null, 4), (err)=>{
                    if(err){
                        console.log("se produjo un error en fs.writefile: ", err);
                        return false;
                    }
                    else{
                        console.log("el archivo ha sido modificado")
                        //res.status(200).send("el archivo a sido modificado");
                        res.status(200).json({ message: "anime eliminado con exito" });
                    }
                });
            }
        });
    } catch (error) {
        console.log("se produjo un error en app.delete: ", error)
        res.status(500).json({error})
    }
})
//listar animes por id
app.get("/api/animes/:id", (req, res)=>{
    console.log("en app.get por ID");
    let id = req.params.id;
    try {
        const data =fs.readFile("./database/anime.json",(err, data)=>{
            if(err){
                console.log("se produjo un error en data: ", err);
                return false;
            }
            else{
                const animes=JSON.parse(data);
                for (const key in animes) {
                    console.log(animes[key].nombre)
                    if(animes[key].nombre !== ""){
                        if(key==id){
                            res.status(200).json(animes[key]);
                            console.log("res");
                            return true;
                        }
                    }
                    //else{
                    //console.log("else")
                    //}
                }
                res.status(200).send("no existe anime con ese ID");
                return animes;
            }
        })
    } catch (error) {
        console.log("se produjo un error en app.get: ", error)
        res.status(500).json({error})
    }
});

//Test con Mocha y Chai en ./test/getTest.test.js

//export
module.exports=app
