import React, { PropTypes } from 'react';
import ReactSlider from 'react-slider';

require('stylesheets/filters/range');

const Range = React.createClass({
  propTypes: {
    defaultValue: PropTypes.array.isRequired,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    step: PropTypes.number,
  },
  getInitialState() {
    const [ low, high ] = this.props.defaultValue;
    return { low, high };
  },
  change([ newMin, newMax ]) {
    this.replaceState({
      low: newMin,
      high: newMax,
    });
    this.props.onChange([newMin, newMax]);
  },
  render() {
    return (
      <div className="range">
        <span className="number low">{this.state.low}</span>
        <ReactSlider
            defaultValue={this.props.defaultValue}
            max={this.props.max}
            min={this.props.min}
            onChange={this.change}
            step={this.props.step}
            withBars={true} />
        <span className="number high">{this.state.high}</span>
      </div>
    );
  },
});

export default Range;
