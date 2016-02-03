import React, { PropTypes } from 'react';
import ReactSlider from 'react-slider';
import { changeRange } from '../../actions/range';

require('stylesheets/filters/range');

const Range = React.createClass({
  propTypes: {
    defaultValue: PropTypes.array.isRequired,
    field: PropTypes.string.isRequired,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    step: PropTypes.number,
  },

  change(field) {
    return ([ newMin, newMax ]) => {
      changeRange(field, [ newMin, newMax ]);
    };
  },
  render() {
    const [low, hight] = this.props.defaultValue;
    return (
      <div className="range">
        <span className="number low">{low}</span>
        <ReactSlider
            defaultValue={this.props.defaultValue}
            max={this.props.max}
            min={this.props.min}
            onChange={this.change(this.props.field)}
            step={this.props.step}
            withBars={true} />
        <span className="number high">{hight}</span>
      </div>
    );
  },
});

export default Range;
