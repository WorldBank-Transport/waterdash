import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import T from '../utils/t';
import ChartsContainer from './charts-container';


const Polygons = React.createClass({
  propTypes: {
    children: PropTypes.node,
    params: PropTypes.shape({
      polytype: PropTypes.string.isRequired,
    }).isRequired,
  },
  render() {
    const {polytype} = this.props.params;
    return (
      <div className="main polygons">
        <h1>
          <T k={`dash.${polytype}`} />
        </h1>
        <Link to={`/${polytype}/some-id`}>to some-id</Link>
        {this.props.children}
        <ChartsContainer>
          charts for polygons...
        </ChartsContainer>
      </div>
    );
  },
});

export default Polygons;
