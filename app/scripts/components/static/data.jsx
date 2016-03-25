import React, { PropTypes } from 'react';
import { Icon } from 'react-font-awesome';
import Footer from '../boilerplate/footer';
import T from '../misc/t';

require('stylesheets/boilerplate/static-content');
require('stylesheets/boilerplate/button');

const Data = React.createClass({

  propTypes: {
    params: PropTypes.object,
  },

  getInitialState() {
    return {
      '1': true,
      '2': false,
      '3': false,
      '4': false,
      '5': false,
    };
  },

  componentDidMount() {
    const id = this.props.params.datasetId;
    if (id) {
      const element = document.getElementById(id);
      element.scrollIntoView(true);
    }
  },

  toogle(index, _this) {
    return () => {
      _this.replaceState({
        ..._this.state,
        [index]: !_this.state[index],
      });
    };
  },

  scrollTo(id) {
    return (e) => {
      e.preventDefault();
      const element = document.getElementById(id);
      element.scrollIntoView(true);
    };
  },

  render() {
    return (
      <div className="data-content">
        <div className="main secondary">
          <div className="static-content">
          <h2><T k="static.data-title" /></h2>
          <p><T k="static.data-content" /></p>
          <p><T k="static.data-content-second" /></p>
          <div className="button-wrapper-outer">
            <div className="button-wrapper-inner">
              <div className="button">
                <a href="http://www.opendata.go.tz/organization/ministry-of-water" target="_blank">
                  <T k="static.open-data-portal" />
                </a>
              </div>
              <div className="button">
                <a onClick={this.scrollTo('FAQ')}>
                  <T k="static.faq" />
                </a>
              </div>
              <div className="button">
                <a onClick={this.scrollTo('DataSources')}>
                  <T k="static.data-souces" />
                </a>
              </div>
            </div>
          </div>
          <div className="content-section" id="FAQ">
            <h3><T k="static.faq.title" /></h3>
            <div className="faq-list" role="tablist">
              {Object.keys(this.state).map(index => (
                <div>
                  <div className="panel-heading" role="tab">
                    <h4 className="panel-title">
                      <a onClick={this.toogle(index, this)}>
                        <Icon type="chevron-down"/>
                        <T k={`static.faq.q${index}`}/>
                      </a>
                    </h4>
                  </div>
                  <div className="panel-collapse collapse in" role="tabpanel" style={{display: this.state[index] ? 'block' : 'none'}}>
                    {(index === 5) ? (<a href="#/speak-out/"><T k={`static.faq.a${index}`} /></a>) : (<T k={`static.faq.a${index}`} />)}
                  </div>
                </div>)
              )}
            </div>
          </div>
          <div className="content-section" id="DataSources">
            <h3><T k="static.data-souces.title" /></h3>
            <h5 id="rural"><T k="static.data-type.rural" /></h5>
            <ul className="dataset-links">
              <li><Icon type="link"/><a href="http://opendata.go.tz/dataset/idadi-ya-watu-wanaopata-huduma-ya-maji-vijijini/resource/a23325bd-557b-46b9-b9df-5f38c64e610f"><T k="static.dataset.waterpoints" /></a></li>
            </ul>
            <h5 id="water"><T k="static.data-type.water" /></h5>
            <ul className="dataset-links">
              <li><Icon type="link"/><a href="http://opendata.go.tz/dataset/1f98a80f-f2fe-4980-91db-db683199a2d9/resource/e41299a9-d085-45e6-845e-f2af3be6dea5/download/Tanzania-All-Waterpoints-July-2015.csv "><T k="static.dataset.waterpoints" /></a></li>
            </ul>
            <h5 id="dams"><T k="static.data-type.dams" /></h5>
            <ul className="dataset-links">
              <li id=""><Icon type="link"/><a href="http://opendata.go.tz/dataset/e13b6140-abf7-4249-853e-c334da8b1d22/resource/a51ca5a1-25db-4361-a2a9-539c97a61610/download/Dams-constructed-by-nine-water-basins-board.csv "><T k="static.dataset.dams" /></a></li>
            </ul>
            <h5 id="boreholes"><T k="static.data-type.boreholes" /></h5>
            <ul className="dataset-links">
              <li><Icon type="link"/><a href="http://www.opendata.go.tz/en/dataset/visima-vilivyochimbwa-na-ddca-kwa-mwaka" target="_blank"><T k="static.dataset.boreholes" /></a></li>
            </ul>
            <h5 id="population"><T k="static.data-type.population" /></h5>
            <ul className="dataset-links">
              <p className="small"><T k="static.population.text" /></p>
              <li><Icon type="link"/><a href="http://opendata.go.tz/sw/dataset/6bd441ca-76b4-44a2-a8cd-a9075d1bf9b6/resource/a23325bd-557b-46b9-b9df-5f38c64e610f/download/Served-population-2005---June-2015-1.csv"><T k="static.dataset.served" /></a></li>
              <li><Icon type="link"/><a href="https://data.hdx.rwlabs.org/dataset/2012-census-tanzania-wards-shapefiles" target="_blank"><T k="static.dataset.tz-population" /></a></li>
            </ul>
          </div>
          </div>
        <Footer/>
      </div>
    </div>
    );
  },
});

export default Data;
