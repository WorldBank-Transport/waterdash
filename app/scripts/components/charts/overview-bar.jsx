import React from 'react';
import DataTypes from '../../constants/data-types';
import T from '../misc/t';
import WaterpointsOverviewBar from './waterpoints-overview-bar';

require('stylesheets/boilerplate/overview-bar');

const OverviewBar = React.createClass({
  render() {
    const defaultType = (
      <div className="overview-bar">
        <T k="overview-bar" />
      </div>
    );
    const typedOverviewBar = DataTypes.match(this.props.dataType, {
      Waterpoints: () => (<WaterpointsOverviewBar {...this.props}/>), //{...propsForChildren}
      Boreholes: () => defaultType,
      Dams: () => defaultType,
    });
    return typedOverviewBar;
  },
});

export default OverviewBar;
