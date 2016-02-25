import React from 'react';
import Button from '../boilerplate/button';
import Footer from '../boilerplate/footer';
import T from '../misc/t';
import TChildProps from '../misc/t-set-child-props';

require('stylesheets/boilerplate/static-content');

const Homepage = React.createClass({
  render() {
    return (
      <div className="home-page">
        <div className="homebanner">
          <TChildProps>
            <img alt={{k: 'site-name'}} src="images/home-img.png" title={{k: 'site-name'}}/>
          </TChildProps>
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
