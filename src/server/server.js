import React from "react";
import express from "express";
import {readFileSync} from "fs";
import ReactDOMServer from "react-dom/server";
import App from "../components/App";
import {handelModifyAswerVotes} from "../../shared/utility";

let data = {
  questions: [
    {
      questionId: "Q1",
      content: "Which back end solution should we use for our application?",
    },
    {
      questionId: "Q2",
      content:
        "What percentage of developer time should be devoted to end-to-end testing?",
    },
  ],
  answers: [
    {
      answerId: "A1",
      questionId: 1,
      upvotes: 2,
      content: "Apache",
    },
    {
      answerId: "A2",
      questionId: "Q1",
      upvotes: 0,
      content: "Java",
    },
    {
      answerId: "A3",
      questionId: "Q1",
      upvotes: 4,
      content: "Node.js",
    },
    {
      answerId: "A4",
      questionId: "Q2",
      upvotes: 2,
      content: "25%",
    },
    {
      answerId: "A5",
      questionId: "Q2",
      upvotes: 1,
      content: "50%",
    },
    {
      answerId: "A6",
      questionId: "Q2",
      upvotes: 1,
      content: "75%",
    },
  ],
};

const server = express();
server.use(express.static("dist"));

server.get("/vote/:answerId", (req, res) => {
  const {query, params} = req;
  data.answers = handelModifyAswerVotes(
    data.answers,
    params.answerId,
    +query.increment
  );
  res.send("OK");
});

server.get("/data", async (_req, res) => {
  res.json(data);
});

server.get("/", async (_req, res) => {
  const {renderToString} = ReactDOMServer;
  const rendered = renderToString(<App {...data} />);

  const index = readFileSync("public/index.html", "utf8");
  // res.send(index.replace("{{rendered}}", rendered));
  res.send(`
  <html>
    <head>
      <title>Sample React App</title>
    </head>
    <body>
      <div id="root">${rendered}</div>
      <script src="/main.js"></script>
    </body>
  </html>
  `);
  /*  */
});

server.listen(4242, () => console.log("Server is running..."));
