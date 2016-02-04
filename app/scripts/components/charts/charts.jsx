import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import OpenClosed from  '../../constants/open-closed';
import WaterpointsChart from './waterpoints-charts';
import DamsChart from './dams-chart';
import BoreholesCharts from './boreholes-charts';
import HighCharts from 'highcharts';
import TSetChildProps from '../misc/t-set-child-props';

require('highcharts/modules/drilldown')(HighCharts);
require('highcharts/modules/exporting')(HighCharts);
require('stylesheets/charts/charts');

const Charts = React.createClass({
  propTypes: {
    children: PropTypes.node,
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass),
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  render() {
    return OpenClosed.match(this.props.openClosed, {
      Open: () => (
        <div className="charts">
          {DataTypes.match(this.props.dataType, {
            Waterpoints: () => (<WaterpointsChart {...this.props}/>),
            Dams: () => (<TSetChildProps><DamsChart {...this.props} subtitle={{k: 'chart.subtitle-dams'}} titleDamHeight={{k: 'chart.title-dams.height'}} titleElevation={{k: 'chart.title-dams.elavation'}} titleReservoir={{k: 'chart.title-dams.reservoir'}}/></TSetChildProps>),
            Boreholes: () => (<BoreholesCharts {...this.props}/>),
          })}
        </div>
      ),
      Closed: () => <div style={{display: 'none'}}></div>,
    });
  },
});

export default Charts;
