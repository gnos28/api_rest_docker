# api_rest_docker  
  
**launching the app**  
`docker compose build`  
`docker compose up`  
  
**back routes**  
GET http://localhost:5000/api/wilders/  
GET http://localhost:5000/api/wilders/:id  
POST http://localhost:5000/api/wilders/ {name}  
PUT http://localhost:5000/api/wilders/:id {name}  
DELETE http://localhost:5000/api/wilders/:id  
  
GET http://localhost:5000/api/skills/  
GET http://localhost:5000/api/skills/:id  
POST http://localhost:5000/api/skills/ {name}  
PUT http://localhost:5000/api/skills/:id {name}  
DELETE http://localhost:5000/api/skills/:id  
  
GET http://localhost:5000/api/wilders/:id/skills  
POST http://localhost:5000/api/wilders/:id/skills/:skillId  
DELETE http://localhost:5000/api/wilders/:id/skills/:skillId  