 // Test de rutas GET
const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../index.js");
const { it } = require("mocha");
const assert = chai.assert;

chai.use(chaihttp);

describe("Test de rutas GET",()=>{
    let servidor = app.listen(3000);
    let respuestaGet;

     describe("Prueba 01: Leer DB de animes en GET api/animes", ()=>{
        chai.request(servidor)
            .get("/api/animes")
            .end((error, res)=>{
                respuestaGet = res
                console.log("res: ",typeof(res));
                console.log("res.body: ",typeof(res.body));
                console.log("rGet: ",typeof(respuestaGet));
            });
        it("Respuesta debe ser un objeto", (done)=>{
            assert.isObject(respuestaGet, "Respuesta no es un objeto");
            done();
        })
        it("Status de respuesta debe ser 200",(done)=>{
            assert.equal(respuestaGet.status, 200, "Status no es 200");
            done();
        });
    });
});



    /* describe("PRUEBAS DE RUTA DELETE", () => {
        let respuestaDelete = 
        chai.request(servidor)
            .delete("/api/productos/1")
            .end((error, res) => {
                respuestaDelete = res.body;
            });
        
        it("Código de respuesta debe ser 200", (done) => {
            assert.equal(
                respuestaDelete.code,
                200,
                "Código de estado no corresponde."
            );
            done(); */