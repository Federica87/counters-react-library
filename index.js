//App Component
function App() {
  const [counterArray, setCounterArray] = React.useState([]);

  return React.createElement(
    "div",
    null,
    React.createElement(Header, {
      counterArray: counterArray,
      setCounterArray: setCounterArray,
    }),
    React.createElement(CounterContainer, {
      counterArray: counterArray,
      setCounterArray: setCounterArray,
    })
  );
}

ReactDOM.render(React.createElement(App), document.getElementById("root"));

//Header Component
function Header({ counterArray, setCounterArray }) {
  const [numberCounters, setNumberCounters] = React.useState(0);
  const [isValueEmpty, setIsValueEmpty] = React.useState(false);

  function createCounter() {
    setIsValueEmpty(false);
    setNumberCounters(numberCounters + 1);
    setCounterArray((old) => [...old, { id: numberCounters + 1, value: 0 }]);
  }

  function handleInputChange(e) {
    if (e.target.value !== "") {
      setIsValueEmpty(false);
      if (e.target.value.match(/^[0-9]+$/) && e.target.value >= 0) {
        let minus = e.target.value - counterArray.length;

        let tempNumberCounters = numberCounters;
        let tempCounterArray = [...counterArray];

        if (minus > 0) {
          for (let i = 0; i < minus; i++) {
            tempNumberCounters += 1;
            tempCounterArray.push({ id: tempNumberCounters, value: 0 });
          }
        } else if (minus < 0) {
          for (let i = 0; i > minus; i--) {
            tempCounterArray.pop();
          }
        }
        setNumberCounters(tempNumberCounters);
        setCounterArray(tempCounterArray);
      }
    } else setIsValueEmpty(true);
  }

  return React.createElement(
    "header",
    null,
    React.createElement(
      "h1",
      null,
      "COUNTERS OR NOT COUNTERS, THIS IS THE QUESTION"
    ),
    React.createElement(Button, {
      buttonName: "Add Counter",
      onClick: createCounter,
    }),
    React.createElement(Input, {
      value: isValueEmpty ? "" : counterArray.length,
      onChange: (e) => handleInputChange(e),
    }),
    React.createElement(Button, {
      buttonName: "Remove Counter",
      onClick: () => setCounterArray(counterArray.slice(0, -1)),
    })
  );
}

//Button Component
function Button({ buttonName, onClick }) {
  return React.createElement("button", { onClick }, `${buttonName}`);
}

//Input Component
function Input({ value, onChange }) {
  return React.createElement("input", {
    value,
    onChange,
  });
}

//Ul Container Component
function CounterContainer({ counterArray, setCounterArray }) {
  return React.createElement(
    "ul",
    null,
    counterArray.map((counter, i) =>
      React.createElement(Counter, {
        counter: counter,
        key: i,
        counterArray: counterArray,
        setCounterArray: setCounterArray,
      })
    )
  );
}

//Counter Component
function Counter({ counter, counterArray, setCounterArray }) {
  function handleCounter(operation) {
    let tempCounterArray = [...counterArray];
    let index = tempCounterArray.findIndex((x) => x.id === counter.id);
    switch (operation) {
      case "increase":
        tempCounterArray[index].value += 1;
        setCounterArray(tempCounterArray);
        break;
      case "decrease":
        tempCounterArray[index].value -= 1;
        setCounterArray(tempCounterArray);
        break;
      case "reset":
        tempCounterArray[index].value = 0;
        setCounterArray(tempCounterArray);
        break;
      case "delete":
        tempCounterArray.splice(index, 1);
        setCounterArray(tempCounterArray);
        break;
      default:
        return counter.value;
    }
  }

  return React.createElement(
    "li",
    null,
    React.createElement(
      "article",
      null,
      React.createElement(CounterName, { id: counter.id }),
      React.createElement(
        "div",
        { className: "counter-display-container" },
        React.createElement(Button, {
          buttonName: "-",
          onClick: () => handleCounter("decrease"),
        }),
        React.createElement(Display, { value: counter.value }),
        React.createElement(Button, {
          buttonName: "+",
          onClick: () => handleCounter("increase"),
        })
      ),
      React.createElement(Button, {
        buttonName: "Reset",
        onClick: () => handleCounter("reset"),
      }),
      React.createElement(Button, {
        buttonName: "Delete Counter",
        onClick: () => handleCounter("delete"),
      })
    )
  );
}

//Counter Name Component
function CounterName({ id }) {
  return React.createElement("h2", null, `COUNTER ${id}`);
}

//Display Component
function Display({ value }) {
  return React.createElement("p", null, `${value}`);
}
