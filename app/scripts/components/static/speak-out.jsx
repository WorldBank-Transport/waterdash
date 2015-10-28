import React from 'react';
import Divider from '../boilerplate/divider';
import T from '../misc/t';

require('stylesheets/boilerplate/static-content');

const SpeakOut = React.createClass({
  render() {
    return (
      <div className="main">
        <Divider />
        <div className="static-content text-center">
          <h2><T k="static.speakout-title" /></h2>
          <p><T k="static.speakout-content" /></p>
          <div className="feedback-form-container">
            <iframe className="feedback-form" src="https://docs.google.com/forms/d/1Do2Se6uzp_MIQF_K6DIUslzu2MXashHdN0YOGCeRXPk/viewform?embedded=true"></iframe>
          </div>
        </div>
      </div>
    );
  },
});

export default SpeakOut;
