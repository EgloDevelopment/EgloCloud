const { Button } = window['MaterialUI'];
'use strict';

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return (
      <Button onClick={() => this.setState({ liked: false }) } variant="contained">
        Unlike
      </Button>
      );
    }

    return (
      <Button onClick={() => this.setState({ liked: true }) } variant="contained">
        Like
      </Button>
    );
  }
}

let domContainer = document.querySelector('#app');
ReactDOM.render(<LikeButton />, domContainer);