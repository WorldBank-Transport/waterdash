import React from 'react';

const ClickBar = React.createClass({
  displayName: 'ClickBar',

  propTypes: {
    data: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]).isRequired,
    fill: React.PropTypes.string.isRequired,
    height: React.PropTypes.number.isRequired,
    onDoubleClick: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    width: React.PropTypes.number.isRequired,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
  },

  render() {
    const _props = this.props;
    const x = _props.x;
    const y = _props.y;
    const width = _props.width;
    const height = _props.height;
    const fill = _props.fill;
    const data = _props.data;
    const onMouseEnter = _props.onMouseEnter;
    const onMouseLeave = _props.onMouseLeave;
    const onDoubleClick = _props.onDoubleClick;

    return React.createElement('rect', {
      className: 'bar',
      x: x,
      y: y,
      width: width,
      height: height,
      fill: fill,
      onMouseMove: (e) => onMouseEnter(e, data),
      onMouseLeave: (e) => onMouseLeave(e),
      onDoubleClick: (e) =>  onDoubleClick(e, data),
    });
  },
});

export default ClickBar;
