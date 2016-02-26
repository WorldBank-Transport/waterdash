import React, { PropTypes } from 'react';
import T from '../misc/t';
import colours from '../../utils/colours';
import { MAX_VALUE, MIN_VALUE} from '../../stores/polygons-with-data';
import DataTypes from '../../constants/data-types';
import {FormattedNumber, IntlMixin} from 'react-intl';

require('../../../stylesheets/dashboard/legend.scss');

const Legend = React.createClass({

  propTypes: {
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),
    ranges: PropTypes.array.isRequired,
  },

  mixins: [IntlMixin],

  getDefaultProps() {
    return {
      ranges: [],
    };
  },

  render() {
    return (
        <div className="legend">
          <div className="title"><T k="legend.title" /></div>
          <div className="subtitle"><T k={`legend.subtitle.${this.props.dataType.toParam()}`} /></div>
            <div className="row">
              <div className="legend-block" style={{'background': colours.unknown}}></div>
                <div className="legend-text"><T k="legend.nodata" /></div>
            </div>
            {
              this.props.ranges.map(r => {
                let legendText = '';
                if (r.min === MIN_VALUE) {
                  legendText = (<span className="t"> &lt; <FormattedNumber value={r.max}/></span>);
                } else if (r.max === MAX_VALUE) {
                  legendText = (<span className="t"> &gt; <FormattedNumber value={r.min}/></span>);
                } else {
                  legendText = (<span className="t"><FormattedNumber value={r.min}/> - <FormattedNumber value={r.max}/></span>);
                }
                return (
                  <div className="row">
                    <div className="legend-block" style={{'background': r.color}}></div>
                    <div className="legend-text">{legendText}</div>
                  </div>
                );
              })
            }
          </div>
    );
  },
});

export default Legend;
