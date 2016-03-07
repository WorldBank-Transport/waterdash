import React from 'react';
import { Link } from 'react-router';
import { connect } from 'reflux';
import T from '../misc/t';
import OpenClosed from '../../constants/open-closed';
import { Icon } from 'react-font-awesome';
import { share, pdf } from '../../actions/share';
import ShareStore from '../../stores/share';
import CopyToClipboard from 'react-copy-to-clipboard';
import PdfLoadingStore from '../../stores/loading-pdf';
import TSetChildProps from '../misc/t-set-child-props';
import SpinnerModal from '../misc/spinner-modal';

require('stylesheets/dashboard/share');

const Share = React.createClass({

  mixins: [
    connect(ShareStore, 'share'),
    connect(PdfLoadingStore, 'pdfLoading'),
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

  print() {
    const map = document.getElementById('map1').outerHTML;
    const finalMap = map.replace(/\/\/a.tile.openstreetmap.org\//g, 'http://a.tile.openstreetmap.org/').replace(/\/\/b.tile.openstreetmap.org\//g, 'http://b.tile.openstreetmap.org/').replace(/\/\/c.tile.openstreetmap.org\//g, 'http://c.tile.openstreetmap.org/');
    const links = '<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.5/leaflet.css"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">';
    const styles = '<style>#map1 {bottom: 0px;left: 0px;position: absolute;right: 0px;top: 0px;width: 100%;height:100%;}</style><link rel="stylesheet" href="http://maji.takwimu.org/style.css">';
    const htmlContent = `<html><header>${styles}</header><body id="pdf-body">${finalMap}${links}</body></html>`;
    //console.log(htmlContent);
    pdf(htmlContent);
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
                  <TSetChildProps>
                    <SpinnerModal
                        message={{k: 'loading.pdf'}}
                        retry={() => null}
                        state={this.state.pdfLoading} />
                  </TSetChildProps>
                  <ul>
                    <li className="share" onClick={share}><Icon type={`link`}/><T k="share.share" /></li>
                    <li className="feedback"><Link to="/speak-out/"><Icon type={`comments-o`}/><T k="share.feedback" /></Link></li>
                    <li className="print" onClick={this.print}><Icon type={`file-pdf-o`}/><T k="share.print" /></li>
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
