import { Icon } from 'leaflet';

// heavily borrowed from https://github.com/SINTEF-9012/PruneCluster/blob/master/examples/random.10000-categories.html

const ClusterIcon = Icon.extend({
  options: {
    radius: 19,
    weight: 5,
    className: 'cluster-icon leaflet-icon',
    categories: ['red', 'green', 'blue'],
    stats: [],
    bgColor: 'white',
    textColor: 'black',
    population: [],
  },

  initialize(options) {
    Icon.prototype.initialize.call(this, options);
    const { radius } = this.options;
    this.options.iconSize = [radius * 2, radius * 2];  // so that leaflet centres the icon
  },

  createIcon() {
    const cvEl = document.createElement('canvas');
    this._setIconStyles(cvEl, 'icon');
    const { radius } = this.options;
    cvEl.width = radius * 2;
    cvEl.height = radius * 2;
    this.draw(cvEl.getContext('2d'));
    return cvEl;
  },

  createShadow() {
    return null;
  },

  draw(canvas) {
    let start = 0;
    const { radius, weight, stats, population, categories, textColor, bgColor } = this.options;

    for (let i = 0; i < categories.length; i++) {
      const catSize = stats[i] / population;
      const colour = categories[i];

      if (catSize > 0) {
        canvas.beginPath();
        canvas.moveTo(radius, radius);
        canvas.fillStyle = colour;
        const end = start + catSize * Math.PI * 2;
        canvas.arc(radius, radius, radius, start, end);
        start = end;
        canvas.fill();
        canvas.closePath();
      }
    }

    canvas.beginPath();
    canvas.fillStyle = bgColor;
    canvas.arc(radius, radius, radius - weight, 0,  Math.PI * 2);  // $bg-color circle
    canvas.fill();
    canvas.closePath();

    canvas.fillStyle = textColor;
    canvas.textAlign = 'center';
    canvas.textBaseline = 'middle';
    canvas.font = 'bold 10px Open Sans';  // from type.scss in scss config
    canvas.fillText(population, radius, radius, radius * 2 - weight);
  },
});

export default ClusterIcon;
