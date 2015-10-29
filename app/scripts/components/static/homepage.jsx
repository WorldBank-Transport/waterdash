import React from 'react';
import Button from '../boilerplate/button';

require('stylesheets/boilerplate/static-content');

const Homepage = React.createClass({
  render() {
    return (
      <div className="home-page">
        <div className="homebanner">
          <img src="images/home-img.png"/>
        </div>
        <div className="homecontent">
          <h2>Locate water projects throughout the country, your region, your district, or your ward. Use the Water Dashboard to examine water resources to make a difference in your community.</h2>
          <Button linkTo="/dash/points/waterpoints/">
            Water Points
          </Button>
          <p>
            This Water Dashboard is a public open data portal to view the latest national water resource data and monitor the information that is important to you. You can also use the menu options above to see original data and speak out about missing or wrong data.
          </p>
        </div>
      </div>
    );
  },
});

export default Homepage;
