import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import { Link } from 'react-router';
import DataTypes from '../../constants/data-types';
import LangStore from '../../stores/lang';
import T, { translate } from '../misc/t';

require('stylesheets/boilerplate/view-mode');

const ViewMode = React.createClass({
  propTypes: {
    dataType: PropTypes.instanceOf(DataTypes.OptionClass).isRequired,
  },
  mixins: [
    connect(LangStore, 'lang'),  // for the translated label :(
  ],
  render() {
    const currentDataType = this.props.dataType.toParam();

    // necessary to get `i` for dynamic translated points label :(
    const currentDataName = translate(this.state.lang, `data-type.${currentDataType}`);

    return (
      <div className="view-mode">
        <ul>
          <li>
            <Link activeClassName="active" to={`/dash/points/${currentDataType}/`}>
              <T i={[currentDataName]} k="view-mode.points" />
            </Link>
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
            <Link activeClassName="active" to={`/dash/wards/${currentDataType}/`}>
              <T k="view-mode.ward" />
            </Link>
          </li>
        </ul>
      </div>
    );
  },
});

export default ViewMode;
