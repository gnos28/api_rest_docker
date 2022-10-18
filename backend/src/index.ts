// const express = require("express");
// import express from "express";
// import cors from "cors";
// const cors = require("cors");
// import wilderController from "./controllers/wilderController";
// import skillsController from "./controllers/skillsController";
import { ApolloServer } from "apollo-server";
import dataSource from "./tools/utils";
import typeDefs from "./typeDefs";
import Query from "./resolvers/query";
import Mutation from "./resolvers/mutation";

const port = 5000;

const resolvers = {
  Query,
  Mutation,
};

const start = async (): Promise<void> => {
  await dataSource.initialize();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  try {
    const { url } = await server.listen({ port });
    console.log(`server ready at ${url}`);
  } catch (e) {
    console.error(e);
  }
};

start();

// const app = express();

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
//     credentials: true,
//     optionsSuccessStatus: 200,
//   })
// );

// app.use(express.json());

// app.use("/api/wilders", wilderController);
// app.use("/api/skills", skillsController);

// const start = async () => {
//   await dataSource.initialize();
//   app.listen(5000, (): void => console.log("listening on port 5000"));
// };

// start();
