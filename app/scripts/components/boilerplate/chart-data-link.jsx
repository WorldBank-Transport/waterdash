import React, { PropTypes } from 'react';
import T from '../misc/t';
import { Link } from 'react-router';

const ChartDataLink = React.createClass({
  propTypes: {
    dataId: PropTypes.string.isRequired,
  },
  render() {
    return (
      <span>
        <T k="chart.click" /> <Link activeClassName="active" to={`/data/${this.props.dataId}`}><T k="chart.click.here" /></Link> <T k="chart.title-waterpoints-status-helptext" />
      </span>
    );
  },
});
export default ChartDataLink;
