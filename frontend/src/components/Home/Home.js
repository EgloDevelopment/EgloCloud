import React, { Component } from "react";



class App extends Component {
  constructor() {
    super();
    this.state = {
      text: "‎ ",
    };
  }

  goPremium() {
    fetch("http://localhost:3001/details", { method: "GET" })
      .then((data) => data.json())
      .then((json) => {
        const name = json.name;
        this.setState({
          text: name,
        });
      });
  }

  render() {
    return (
      <div>
        <script>
          document.addEventListener("DOMContentLoaded", function()
          {
            this.goPremium()
          }
            document.getElementById("myDIV").style.display = "none";
          );

        </script>


        <h1>{this.state.text}</h1>
      </div>
    );
  }
}

export default App;
//<button onClick={() => this.goPremium()}>Go Premium</button>