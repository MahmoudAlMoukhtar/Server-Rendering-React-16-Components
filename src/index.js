import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import {handelModifyAswerVotes} from "../shared/utility.js";
const container = document.getElementById("root");
let state = undefined;

fetch("http://localhost:4242/data")
  .then(data => data.json())
  .then(json => {
    state = json;
    console.log("go to state", state);
    render();
  });

const handelVote = (answerId, increment) => {
  state.answers = handelModifyAswerVotes(state.answers, answerId, increment);
  fetch(`vote/${answerId}?increment=${increment}`);
  render();
};

const render = () => {
  ReactDOM.hydrateRoot(
    container,
    <App {...state} handelModifyAswerVotes={handelVote} />
  );
};
