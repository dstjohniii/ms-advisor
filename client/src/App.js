import React, { useState } from "react";
import Tweet from "./Tweet";

function App() {
  const [users, setUser] = useState([
    {name: 'Ed', msg: 'Hi', likes: 12},
    {name: 'test', msg: 'gdg', likes: 345},
    {name: '123', msg: 'fgfgHi', likes: 100},
  ])



  const [isRed, setRed] = useState(false);
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
    setRed(!isRed)
  };

  return (
    <div className="app">
      <h1 className={isRed ? 'red' : ''}>Change my Color</h1>
      <button onClick={increment}>Increment</button>
      <h1>{count}</h1>

      {users.map(user =>(
        <Tweet name={user.name} msg={user.msg} likes={user.likes}/>
      ))}

      {/* <Tweet name="Dev ED" msg="foo" likes="12"/>
      <Tweet name="John Snow" msg="bvar" likes="122"/>
      <Tweet name="Winter is coming" msg="bar" likes="1242"/>
      <Tweet name="Mosh" msg="hehe" likes="1253"/> */}
    </div>
  );
}

export default App;
