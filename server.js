import { fastify } from "fastify";
import { DatabasePostgres } from "./database_postgres.js";

const server = fastify()

const database = new DatabasePostgres()
//*Usado para BUSCAR informações
server.get('/videos', async (req, res) => {
   const search = req.query.search
   const videos = await database.list(search)
   return videos
})

//*Usado para ENVIAR informações
server.post('/videos', async (req, res) => {

   const { title, description, duration } = req.body
   await database.create({
      title,
      description,
      duration
   })

   return res.status(201).send()
})

//*Usado para ALTERAR informações de apenas um dado 
server.put('/video/:id', async (req, res) => {
   const videoID = req.params.id
   const { title, description, duration } = req.body

   await database.update(videoID, {
      title,
      description,
      duration
   })

   return res.status(204).send()
})

//*Usado para DELETAR informações
server.delete('/video/:id', async (req, res) => {
   const videoID = req.params.id

   await database.delete(videoID)

   return res.status(204).send()
})

//*Usado para ALTERAR informação específica
server.patch('/video', (req, res) => {

})

server.listen({
   port: process.env.PORT ?? 3333
})