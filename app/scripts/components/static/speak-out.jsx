import React from 'react';
import Divider from '../boilerplate/divider';
import waterpointstatusOptions from '../dashboard/charts/waterpoint-status-options';

const SpeakOut = React.createClass({
  render() {
    return (
      <div className="main">
        <Divider />
        <h1>Speak Out Page</h1>
        <waterpointstatusOptions />
      </div>
    );
  },
});

export default SpeakOut;
