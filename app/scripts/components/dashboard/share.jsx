import React from 'react';

require('stylesheets/dashboard/share');

const Share = React.createClass({
  render() {
    return (
      <div className="share-wrapper">
        <ul>
          <li className="share"><img src="images/icon-share.png"/>Share</li>
          <li className="feedback"><img src="images/icon-feedback.png"/>Feedback</li>
          <li className="print"><img src="images/icon-print.png"/>Print</li>
        </ul>
      </div>
    );
  },
});
export default Share;
