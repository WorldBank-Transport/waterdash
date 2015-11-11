const _extends = Object.assign || function(target) {
  for (let i = 1; i < arguments.length; i++) {
    const source = arguments[i];
    for (let key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};

import React from 'react';
import ClickBar from './click-bar';
import Chart from 'react-d3-components/lib/Chart';
import Axis from 'react-d3-components/lib/Axis';
import Tooltip from 'react-d3-components/lib/Tooltip';

import DefaultPropsMixin from 'react-d3-components/lib/DefaultPropsMixin';
import HeightWidthMixin from 'react-d3-components/lib/HeightWidthMixin';
import ArrayifyMixin from 'react-d3-components/lib/ArrayifyMixin';
import StackAccessorMixin from 'react-d3-components/lib/StackAccessorMixin';
import StackDataMixin from 'react-d3-components/lib/StackDataMixin';
import DefaultScalesMixin from 'react-d3-components/lib/DefaultScalesMixin';
import TooltipMixin from 'react-d3-components/lib/TooltipMixin';

const DataSet = React.createClass({
  displayName: 'DataSet',

  propTypes: {
    colorScale: React.PropTypes.func.isRequired,
    data: React.PropTypes.array.isRequired,
    groupedBars: React.PropTypes.bool,
    label: React.PropTypes.func.isRequired,
    onDoubleClick: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    tooltipHtml: React.PropTypes.func,
    values: React.PropTypes.func.isRequired,
    x: React.PropTypes.func.isRequired,
    xScale: React.PropTypes.func.isRequired,
    y: React.PropTypes.func.isRequired,
    y0: React.PropTypes.func.isRequired,
    yScale: React.PropTypes.func.isRequired,
  },

  render() {
    const _props = this.props;
    const data = _props.data;
    const xScale = _props.xScale;
    const yScale = _props.yScale;
    const colorScale = _props.colorScale;
    const values = _props.values;
    const label = _props.label;
    const x = _props.x;
    const y = _props.y;
    const y0 = _props.y0;
    const onMouseEnter = _props.onMouseEnter;
    const onMouseLeave = _props.onMouseLeave;
    const onDoubleClick = _props.onDoubleClick;
    const groupedBars = _props.groupedBars;

    let bars = undefined;
    if (groupedBars) {
      bars = data.map((stack, serieIndex) => {
        return values(stack).map((e, index) => {
          return React.createElement(ClickBar, {
            key: `${label(stack)}.${index}`,
            width: xScale.rangeBand() / data.length,
            height: yScale(yScale.domain()[0]) - yScale(y(e)),
            x: xScale(x(e)) + xScale.rangeBand() * serieIndex / data.length,
            y: yScale(y(e)),
            fill: colorScale(label(stack)),
            data: e,
            onMouseEnter: onMouseEnter,
            onMouseLeave: onMouseLeave,
            onDoubleClick: onDoubleClick,
          });
        });
      });
    } else {
      bars = data.map((stack) => {
        return values(stack).map((e, index) => {
          return React.createElement(ClickBar, {
            key: `${label(stack)}.${index}`,
            width: xScale.rangeBand(),
            height: yScale(yScale.domain()[0]) - yScale(y(e)),
            x: xScale(x(e)),
            y: yScale(y0(e) + y(e)),
            fill: colorScale(label(stack)),
            data: e,
            onMouseEnter: onMouseEnter,
            onMouseLeave: onMouseLeave,
            onDoubleClick: onDoubleClick,
          });
        });
      });
    }

    return React.createElement(
      'g',
      null,
      bars
    );
  },
});

const ClickBarChart = React.createClass({
  displayName: 'ClickBarChart',

  propTypes: {
    children: React.PropTypes.node,
    colorScale: React.PropTypes.func.isRequired,
    data: React.PropTypes.array.isRequired,
    label: React.PropTypes.func.isRequired,
    onDoubleClick: React.PropTypes.func.isRequired,
    tooltipHtml: React.PropTypes.func,
    values: React.PropTypes.func.isRequired,
    x: React.PropTypes.func.isRequired,
    xScale: React.PropTypes.func.isRequired,
    y: React.PropTypes.func.isRequired,
    y0: React.PropTypes.func.isRequired,
    yScale: React.PropTypes.func.isRequired,
  },

  mixins: [DefaultPropsMixin, HeightWidthMixin, ArrayifyMixin, StackAccessorMixin, StackDataMixin, DefaultScalesMixin, TooltipMixin],

  getDefaultProps() {
    return {};
  },

  _tooltipHtml(d) {
    const xScale = this._xScale;
    const yScale = this._yScale;

    const html = this.props.tooltipHtml(this.props.x(d), this.props.y0(d), this.props.y(d));

    const midPoint = xScale.rangeBand() / 2;
    const xPos = midPoint + xScale(this.props.x(d));

    const topStack = this._data[this._data.length - 1].values;
    let topElement = null;

    // TODO: this might not scale if dataset is huge.
    // consider pre-computing yPos for each X
    for (let i = 0; i < topStack.length; i++) {
      if (this.props.x(topStack[i]) === this.props.x(d)) {
        topElement = topStack[i];
        break;
      }
    }
    const yPos = yScale(this.props.y0(topElement) + this.props.y(topElement));

    return [html, xPos, yPos];
  },

  onDoubleClick(e, data) {
    e.preventDefault();
    const _props = this.props;
    this.props.onDoubleClick(e, data, _props);
  },

  render() {
    const _props = this.props;
    const height = _props.height;
    const width = _props.width;
    const margin = _props.margin;
    const colorScale = _props.colorScale;
    const values = _props.values;
    const label = _props.label;
    const y = _props.y;
    const y0 = _props.y0;
    const x = _props.x;
    const xAxis = _props.xAxis;
    const yAxis = _props.yAxis;
    const groupedBars = _props.groupedBars;
    const data = this._data;
    const innerWidth = this._innerWidth;
    const innerHeight = this._innerHeight;
    const xScale = this._xScale;
    const yScale = this._yScale;

    return React.createElement(
      'div',
      null,
      React.createElement(
        Chart,
        { height: height, width: width, margin: margin },
        React.createElement(DataSet, {
          data: data,
          xScale: xScale,
          yScale: yScale,
          colorScale: colorScale,
          values: values,
          label: label,
          y: y,
          y0: y0,
          x: x,
          onMouseEnter: this.onMouseEnter,
          onMouseLeave: this.onMouseLeave,
          onDoubleClick: this.onDoubleClick,
          groupedBars: groupedBars,
        }),
        React.createElement(Axis, _extends({
          className: 'x axis',
          orientation: 'bottom',
          scale: xScale,
          height: innerHeight,
          width: innerWidth,
        }, xAxis)),
        React.createElement(Axis, _extends({
          className: 'y axis',
          orientation: 'left',
          scale: yScale,
          height: innerHeight,
          width: innerWidth,
        }, yAxis)),
        this.props.children
      ),
      React.createElement(Tooltip, this.state.tooltip)
    );
  },
});

export default ClickBarChart;
