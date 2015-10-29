import React, { PropTypes } from 'react';
import { _ } from 'results';  // catch-all for match
import { Link } from 'react-router';
import DataTypes from '../../constants/data-types';
import T from '../misc/t';
import TSetChildProps from '../misc/t-set-child-props';

require('stylesheets/boilerplate/view-mode');

const ViewMode = React.createClass({
  propTypes: {
    dataType: PropTypes.instanceOf(DataTypes.OptionClass).isRequired,
  },
  render() {
    const currentDataType = this.props.dataType.toParam();

    return (
      <div className="view-mode">
        <ul>
          <li>
            {DataTypes.match(this.props.dataType, {
              Waterpoints: () => (
                <Link activeClassName="active" to={`/dash/points/${currentDataType}/`}>
                  <T k={`view-mode.points.${currentDataType}`} />
                </Link>
              ),
              [_]: () => (
                <TSetChildProps>
                  <span className="disabled" title={{k: 'view-mode.disabled'}}>
                    <T k={`view-mode.points.${currentDataType}`} />
                  </span>
                </TSetChildProps>
              ),
            })}
          </li>
          <li>
            <Link activeClassName="active" to={`/dash/regions/${currentDataType}/`}>
              <T k="view-mode.region" />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to={`/dash/districts/${currentDataType}/`}>
              <T k="view-mode.district" />
            </Link>
          </li>
          <li>
            {DataTypes.match(this.props.dataType, {
              Waterpoints: () => (
                <Link activeClassName="active" to={`/dash/wards/${currentDataType}/`}>
                  <T k="view-mode.ward" />
                </Link>
              ),
              [_]: () => (
                <TSetChildProps>
                  <span className="disabled" title={{k: 'view-mode.disabled'}}>
                    <T k="view-mode.ward" />
                  </span>
                </TSetChildProps>
              ),
            })}
          </li>
        </ul>
      </div>
    );
  },
});

export default ViewMode;
