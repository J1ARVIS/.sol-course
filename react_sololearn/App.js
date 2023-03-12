import React, { useEffect, useState } from 'react';

function App() {

  function Hello() {
    const [name, setName] = useState("JARVIS");

    return <h1>Hello, {name}!</h1>;
  }

  function Counter() {
    const [counter, setCounter] = useState(0);

    /*useEffect(() => {
      alert("Number of clicks: " + counter);
    }, [counter]);*/

    function increment() {
      setCounter(counter + 1);
    };

    return <div>
      <p>Clicks: {counter}</p>
      <button onClick={increment}>Increment</button>
    </div>;
  }

  function Toggle() {
    const [val, setVal] = useState("ON");

    function toggle() {
      setVal((val == "ON") ? "OFF" : "ON");
    };

    return <div>
      <p>
        <button onClick={toggle}>{val}</button>
      </p>
    </div>;
  }

  function Converter() {
    const [km, setKm] = useState(0);

    function handleChange(e) {
      setKm(e.target.value);
    }

    function convert(km) {
      return (km / 1.609).toFixed(2);
    }

    return <div>
      <input type="text" value={km}
        onChange={handleChange} />
      <p> {km} km is {convert(km)} miles </p>
    </div>;
  }

  function AddForm() {
    const [sum, setSum] = useState(0);
    const [num, setNum] = useState(0);

    function handleChange(e) {
      setNum(e.target.value);
    }

    function handleSubmit(e) {
      setSum(sum + Number(num));
      e.preventDefault();
    }

    return <form onSubmit={handleSubmit}>
      <input type="number" value={num} onChange={handleChange} />
      <input type="submit" value="Add" />
      <p> Sum is {sum} </p>
    </form>;
  }

  function Items() {
    const [name, setName] = useState("Item");
    const [price, setPrice] = useState(0);
    const [list, setList] = useState([]);

    function handleName(e) {
      setName(e.target.value);
    }
    function handlePrice(e) {
      setPrice(e.target.value);
    }
    function handleSubmit(e) {
      setList([...list, addItem()]);
      setName("Item");
      setPrice(0);
      e.preventDefault();
    }

    function addItem() {
      return (
        <div>
          <p>
            <b>Name: </b> {name} <br />
            <b>Price: </b> {price} <br />
          </p>
        </div>
      );
    }

    return <div>
      <p>
        <h2>Items</h2>
        <form onSubmit={handleSubmit}>
          Item name: <input type="text" value={name} onChange={handleName} /> <br />
          Item price: <input type="number" value={price} onChange={handlePrice} /> <br />
          <input type="submit" value="Add item to List" />
        </form>
        <br />
        <i>Items list: </i>
        {list.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </p>
    </div>;
  }

  return (
    <>
      <Hello />
      <Items />
      <Counter />
      <Toggle />
      <Converter />
      <AddForm />
    </>
  );
}

export default App;
