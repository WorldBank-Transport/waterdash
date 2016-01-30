import React from 'react';
import T from '../misc/t';
import OpenClosed from '../../constants/open-closed';
import { Icon } from 'react-font-awesome';
import { share } from '../../actions/share';
import ShareStore from '../../stores/share';

require('stylesheets/dashboard/share');

const Share = React.createClass({

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
                    <li className="feedback"><Icon type={`comments-o`}/><T k="share.feedback" /></li>
                    <li className="print"><Icon type={`file-pdf-o`}/><T k="share.print" /></li>
                  </ul>
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
