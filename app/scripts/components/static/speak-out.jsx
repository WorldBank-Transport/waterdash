import React from 'react';
import FooterStatic from '../boilerplate/footer-static';
import T from '../misc/t';

require('stylesheets/boilerplate/static-content');

const SpeakOut = React.createClass({
  render() {
    return (
      <div className="main">
        <div className="static-content text-center">
          <h2><T k="static.speakout-title" /></h2>
          <p className="text-center"><T k="static.speakout-content" /></p>
          <div className="feedback-form-container">
            <iframe className="feedback-form" src="https://docs.google.com/forms/d/1jbbd3jCr97JW5g9lNjHkC-ANf9ZjD-J6cLkIPpyiV14/viewform"></iframe>
          </div>
        </div>
        <FooterStatic/>
      </div>
    );
  },
});

export default SpeakOut;
