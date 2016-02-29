import React from 'react';
import { Link } from 'react-router';
import { connect } from 'reflux';
import T from '../misc/t';
import OpenClosed from '../../constants/open-closed';
import { Icon } from 'react-font-awesome';
import { share } from '../../actions/share';
import ShareStore from '../../stores/share';
import CopyToClipboard from 'react-copy-to-clipboard';

require('stylesheets/dashboard/share');

const Share = React.createClass({

  mixins: [
    connect(ShareStore, 'share'),
  ],

  getInitialState() {
    return {openClosed: OpenClosed.Closed()};
  },

  toggle(e) {
    e.preventDefault();
    this.replaceState({
      ...this.state,
      openClosed: this.state.openClosed.toggle(),
    });
  },

  render() {
    const direction = OpenClosed.match(this.state.openClosed, {
      Open: () => 'up',
      Closed: () => 'down',
    });
    return (
      <div className="share-selector">
        <div className="menu-item">
          <a onClick={this.toggle}>
            <T k="share.share"/> <Icon type={`sort-${direction}`}/>
          </a>
        </div>
        {
          OpenClosed.match(this.state.openClosed, {
            Open: () => (
              <div className="floating-div">
                <div className="share-wrapper">
                  <ul>
                    <li className="share" onClick={share}><Icon type={`link`}/><T k="share.share" /></li>
                    <li className="feedback"><Link to="/speak-out/"><Icon type={`comments-o`}/><T k="share.feedback" /></Link></li>
                    <li className="print"><Icon type={`file-pdf-o`}/><T k="share.print" /></li>
                  </ul>
                  <input style={{'display': this.state.share ? 'block' : 'none'}} value={this.state.share} />
                  <CopyToClipboard style={{'display': this.state.share ? 'block' : 'none'}} text={this.state.share}>
                    <span className="copy-url">Copy</span>
                  </CopyToClipboard>
                </div>
              </div>),
            Closed: () => <div style={{display: 'none'}}></div>,
          })
        }
      </div>
    );
  },
});
export default Share;
