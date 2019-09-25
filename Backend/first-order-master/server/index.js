import express from "express";
import bodyParser from "body-parser";
import expressGraphQL from "express-graphql";
import cors from "cors";
import path from "path";
import graphQLSchema from "./graphql/schema.js";
import graphQLResolvers from "./graphql/resolvers";
import db from "./database/index";

const PORT = process.env.PORT || 5000;
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

app.use(cors());
app.use(bodyParser.json());

//Uses GraphQL middleware
app.use(
  "/graphql",
  expressGraphQL({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
  })
);

app.use(express.static(path.join(__dirname, "..", "client", "build")));

function main() {
  db.setup();

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  });

  app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
}

main();
