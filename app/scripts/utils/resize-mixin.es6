const Resize = {
  getInitialState: function() {
    return {};
  },

  handleResize: function() {
    this.setState({windowWidth: window.innerWidth});

    const newState = {
      ...this.state,
      [size]: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };
    this.replaceState(newState);
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },
};

export default Resize;
