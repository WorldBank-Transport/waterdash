import React, { PropTypes } from 'react';
import T from '../misc/t';
import colours from '../../utils/colours';
import { MAX_VALUE, MIN_VALUE} from '../../stores/polygons-with-data';

require('../../../stylesheets/dashboard/legend.scss');

const Legend = React.createClass({

  propTypes: {
    ranges: PropTypes.array.isRequired,
  },

  getDefaultProps() {
    return {
      ranges: [],
    };
  },

  render() {
    return (
        <div className="legend">
          <div className="title"><T k="legend.title" /></div>
            <div className="row">
              <div className="legend-block" style={{'background': colours.unknown}}></div>
                <T k="legend.nodata" />
            </div>
            {
              this.props.ranges.map(r => {
                let legendText = '';
                if (r.min === MIN_VALUE) {
                  legendText = `< ${r.max}`;
                } else if (r.max === MAX_VALUE) {
                  legendText = `> ${r.min}`;
                } else {
                  legendText = `${r.min} - ${r.max}`;
                }
                return (
                  <div className="row">
                    <div className="legend-block" style={{'background': r.color}}></div>
                    <span className="t">{legendText}</span>
                  </div>
                );
              })
            }
          </div>
    );
  },
});

export default Legend;
