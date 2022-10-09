import React, {useState} from "react";

export default function App({questions, answers, handelModifyAswerVotes}) {
  return (
    <div>
      <h1>Q&A Tool</h1>

      {questions.map(({questionId, content}) => (
        <div key={questionId}>
          <h3>{content}</h3>
          <div>
            {answers
              .filter(answer => answer.questionId === questionId)
              .map(({content, upvotes, answerId}) => (
                <div key={answerId}>
                  <span>
                    {content}-{upvotes}
                  </span>
                  <button onClick={() => handelModifyAswerVotes(answerId, 1)}>
                    +
                  </button>
                  <button onClick={() => handelModifyAswerVotes(answerId, -1)}>
                    -
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
