import React from 'react';
import T from '../misc/t';


require('stylesheets/dashboard/share');

const Share = React.createClass({
  render() {
    return (
      <div className="share-wrapper">
        <ul>
          <li className="share"><img src="images/icon-share.png"/><T k="share.share" /></li>
          <li className="feedback"><img src="images/icon-feedback.png"/><T k="share.feedback" /></li>
          <li className="print"><img src="images/icon-print.png"/><T k="share.print" /></li>
        </ul>
      </div>
    );
  },
});
export default Share;
