import React from 'react';

import SectionWithHeader from './components/SectionWithHeader';
import TodoList from './components/TodoList.prod';
import DemoList from './deprecated-code/TodoList.dev.v3';

import './style.css';

function App() {
  return (
    <>
      <h1 className="title">
        Conversing with Code: The Journey to AI Eloquence
      </h1>
      <hr />
      <SectionWithHeader subtext="dev">
        <DemoList />
      </SectionWithHeader>
      <SectionWithHeader subtext="ready for prod">
        <TodoList />
      </SectionWithHeader>
      <div className="intro-container">
        <p>
          This code was written by a newly hired developer who is actually a
          psychologist planted to spy on
          <strong> EDITED</strong> employees for dark triad personality
          disorders, the most likely cause for churn in 2023.
        </p>

        <p>Unsurprisingly, it contains many bugs.</p>

        <p>
          To be exact, it contains 16 bugs. Possibly more that I didn't in my
          pre-coffee haze but this simulates working conditions so this is fine.
        </p>

        <p>
          There are also 3 bonus points that, whilst technically not bugs, are
          blasphemous.
        </p>

        <p>This employee has the following assumptions:</p>
        <ul>
          <li>the best testing is done in production</li>
          <li>
            it's better to overpromise and underdeliver, especially during
            probation
          </li>
          <li>
            developers at <strong>EDITED</strong> won't cheat and look at the
            bug solutions before they are allowed
          </li>
          <li>(even though it is better to cheat than look bad)</li>
          <li>Thou shall not touch, let alone even look at deprecated code</li>
          <li>
            brute strength is superior to all forms of intelligence, apart from
            ChatGPT, which is rarely wrong
          </li>
          <li>
            backenders are superior developers, and so can't whine today about
            not knowing React
          </li>
          <li>
            it's better to add comments for backenders, because they whine about
            React more than frontenders
          </li>
        </ul>

        <p>
          You can't use the console for this challenge. Real developers can just
          read code and understand it.
        </p>

        <p>This challenge isn't fair. Life isn't fair.</p>
      </div>
    </>
  );
}

export default App;
