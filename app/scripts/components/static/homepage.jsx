import React from 'react';
import Button from '../boilerplate/button';
import Footer from '../boilerplate/footer';
import T from '../misc/t';

require('stylesheets/boilerplate/static-content');

const Homepage = React.createClass({
  render() {
    return (
      <div className="home-page">
        <div className="homebanner">
          <img src="images/home-img.png"/>
        </div>
        <div className="homecontent">
          <h2><T k="home.title" /></h2>
          <Button linkTo="/dash/points/waterpoints/">
            <T k="home.waterpoints" />
          </Button>
          <Button linkTo="dash/regions/boreholes/">
            <T k="home.boreholes" />
          </Button>
          <Button linkTo="dash/points/dams/">
            <T k="home.dams" />
          </Button>
          <p>
            <T k="home.text" />
          </p>
        </div>
        <Footer />
      </div>
    );
  },
});

export default Homepage;
