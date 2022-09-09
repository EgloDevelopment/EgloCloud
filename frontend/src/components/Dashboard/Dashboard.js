import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: "Welcome to Geeksforgeeks",
    };
  }

  goPremium() {
    fetch("http://localhost:3001/details", { method: "GET" })
      .then((data) => data.json())
      .then((data2) => {
        const name = data2.name;
        this.setState({
          text: name,
        });
      });
  }

  render() {
    return (
      <div>
        <h1>{this.state.text}</h1>
        <button onClick={() => this.goPremium()}>Go Premium</button>
      </div>
    );
  }
}

export default App;
