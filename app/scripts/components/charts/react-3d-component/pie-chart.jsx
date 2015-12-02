/*eslint-disable */
import React from 'react';
import Chart from 'react-d3-components/lib/Chart';
import Tooltip from 'react-d3-components/lib/Tooltip';

import DefaultPropsMixin from 'react-d3-components/lib/DefaultPropsMixin';
import HeightWidthMixin from 'react-d3-components/lib/HeightWidthMixin';
import AccessorMixin from 'react-d3-components/lib/AccessorMixin';
import TooltipMixin from 'react-d3-components/lib/TooltipMixin';

const Wedge = React.createClass({
  displayName: 'Wedge',

  propTypes: {
    d: React.PropTypes.string.isRequired,
    fill: React.PropTypes.string.isRequired,
  },

  render: function render() {
    const _props = this.props;
    const fill = _props.fill;
    const d = _props.d;
    const data = _props.data;
    const onMouseEnter = _props.onMouseEnter;
    const onMouseLeave = _props.onMouseLeave;

    return React.createElement('path', {
      fill: fill,
      d: d,
      onMouseMove: (evt) => onMouseEnter(evt, data),
      onMouseLeave: (evt) => onMouseLeave(evt),
    });
  },
});

const DataSet = React.createClass({
  displayName: 'DataSet',

  propTypes: {
    arc: React.PropTypes.func.isRequired,
    colorScale: React.PropTypes.func.isRequired,
    fill: React.PropTypes.string,
    opacity: React.PropTypes.number,
    outerArc: React.PropTypes.func.isRequired,
    pie: React.PropTypes.array.isRequired,
    radius: React.PropTypes.number.isRequired,
    stroke: React.PropTypes.string,
    strokeWidth: React.PropTypes.number,
    x: React.PropTypes.func.isRequired,
  },

  getDefaultProps: function getDefaultProps() {
    return {
      strokeWidth: 2,
      stroke: '#000',
      fill: 'none',
      opacity: 0.3,
    };
  },

  render: function render() {
    const _props = this.props;
    const pie = _props.pie;
    const arc = _props.arc;
    const outerArc = _props.outerArc;
    const colorScale = _props.colorScale;
    const radius = _props.radius;
    const strokeWidth = _props.strokeWidth;
    const stroke = _props.stroke;
    const fill = _props.fill;
    const opacity = _props.opacity;
    const x = _props.x;
    const y = _props.y;
    const onMouseEnter = _props.onMouseEnter;
    const onMouseLeave = _props.onMouseLeave;

    const wedges = pie.map((e, index) => {
      const midAngle = (d) => d.startAngle + (d.endAngle - d.startAngle) / 2;
      const textAngle = (d) => (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90);

      const d = arc(e);

      const labelPos = outerArc.centroid(e);
      //labelPos[0] = radius * (midAngle(e) < Math.PI ? 1 : -1);

      const textAnchor = midAngle(e) < Math.PI ? 'start' : 'end';

      const linePos = outerArc.centroid(e);
      //linePos[0] = radius * 0.95 * (midAngle(e) < Math.PI ? 1 : -1);
      const pos = d3.svg.arc().innerRadius(radius + 2).outerRadius(radius + 2)
      const transform = `translate(${pos.centroid(e)}) rotate(${textAngle(e)})`;
      //const transform = `rotate(${textAngle(e)})`;
      return React.createElement(
        'g',
        { key: `${x(e.data)}.${y(e.data)}.${index}`, className: 'arc' },
        React.createElement(Wedge, {
          data: e.data,
          fill: colorScale(x(e.data)),
          d: d,
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave,
        })
        // React.createElement('polyline', {
        //   opacity: opacity,
        //   strokeWidth: strokeWidth,
        //   stroke: stroke,
        //   fill: fill,
        //   points: [arc.centroid(e), outerArc.centroid(e), linePos],
        // }),
        // React.createElement(
        //   'text',
        //   {
        //     dy: '5',
        //     textAnchor: 'start',
        //     transform: transform },
        //   x(e.data)
        // )
      );
    });

    return React.createElement(
      'g',
      null,
      wedges
    );
  },
});

const PieChart = React.createClass({
  displayName: 'PieChart',

  propTypes: {
    children: React.PropTypes.node,
    cornerRadius: React.PropTypes.number,
    innerRadius: React.PropTypes.number,
    labelRadius: React.PropTypes.number,
    outerRadius: React.PropTypes.number,
    padRadius: React.PropTypes.string,
    sort: React.PropTypes.any,
    tooltipHtml: React.PropTypes.func,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
  },

  mixins: [DefaultPropsMixin, HeightWidthMixin, AccessorMixin, TooltipMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      innerRadius: null,
      outerRadius: null,
      labelRadius: null,
      padRadius: 'auto',
      cornerRadius: 0,
      sort: undefined,
    };
  },

  _tooltipHtml: function _tooltipHtml(d) {
    const html = this.props.tooltipHtml(this.props.x(d), this.props.y(d));

    return [html, 0, 0];
  },

  render: function render() {
    const _props = this.props;
    const data = _props.data;
    const width = _props.width;
    const height = _props.height;
    const margin = _props.margin;
    const colorScale = _props.colorScale;
    let innerRadius = _props.innerRadius;
    let outerRadius = _props.outerRadius;
    let labelRadius = _props.labelRadius;
    const padRadius = _props.padRadius;
    const cornerRadius = _props.cornerRadius;
    const sort = _props.sort;
    const x = _props.x;
    const y = _props.y;
    const values = _props.values;
    const innerWidth = this._innerWidth;
    const innerHeight = this._innerHeight;

    let pie = d3.layout.pie().value((e) => {
      return y(e);
    });

    if (typeof sort !== 'undefined') {
      pie = pie.sort(sort);
    }

    const radius = Math.min(innerWidth, innerHeight) / 2;
    if (!innerRadius) {
      innerRadius = radius * 0.8;
    }

    if (!outerRadius) {
      outerRadius = radius * 0.4;
    }

    if (!labelRadius) {
      labelRadius = radius * 0.9;
    }

    const arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius).padRadius(padRadius).cornerRadius(cornerRadius);

    const outerArc = d3.svg.arc().innerRadius(labelRadius).outerRadius(labelRadius);

    const pieData = pie(values(data));

    const translation = `translate(${innerWidth / 2},${innerHeight / 2})`;
    return React.createElement(
      'div',
      null,
      React.createElement(
        Chart,
        { height: height, width: width, margin: margin },
        React.createElement(
          'g',
          { transform: translation },
          React.createElement(DataSet, {
            width: innerWidth,
            height: innerHeight,
            colorScale: colorScale,
            pie: pieData,
            arc: arc,
            outerArc: outerArc,
            radius: radius,
            x: x,
            y: y,
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
          })
        ),
        this.props.children
      ),
      React.createElement(Tooltip, this.state.tooltip)
    );
  },
});

module.exports = PieChart;
