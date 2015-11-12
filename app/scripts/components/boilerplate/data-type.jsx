import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ViewModes from '../../constants/view-modes';
import T from '../misc/t';

require('stylesheets/boilerplate/data-type');

const DataType = React.createClass({
  propTypes: {
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass).isRequired,
  },
  render() {
    //const currentView = this.props.viewMode.toParam();
    return (
      <div className="data-type">
        <ul>
          <li>
            <Link activeClassName="active" to="/dash/points/waterpoints/">
              <T k="data-type.waterpoints" />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/dash/regions/boreholes/">
              <T k="data-type.boreholes" />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/dash/points/dams/">
              <T k="data-type.dams" />
            </Link>
          </li>
          {/*
          <li>
            <Link activeClassName="active" to={`/dash//dams`} query={{....}}>
              <T k="view-type.dams-by-ddca" />
            </Link>
          </li>
          */}
        </ul>
      </div>
    );
  },
});

export default DataType;
