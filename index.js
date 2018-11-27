import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const supportResizeObserver = typeof ResizeObserver !== 'undefined';

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },

  wrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
    top: 0
  },

  resizeWrapper: {
    overflow: 'hidden',
    width: '100%',
    height: '100%'
  },

  shrink: {
    height: '200%',
    width: '200%'
  }
};

class Resize extends Component {
  static propTypes = {
    onExpand: PropTypes.func,
    onShrink: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      domWidth: 0,
      domHeight: 0
    };
  }

  componentDidMount() {
    if (supportResizeObserver) {
      this._resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const { target } = entry;
          // 修复某些case下target不在DOM中， 触发的width/height都为0
          if (!target.parentElement) return;
          this._onResize({ height: target.offsetHeight, width: target.offsetWidth });
        });
      });
      const resizeNode = ReactDOM.findDOMNode(this);
      this._resizeNode = resizeNode;
      if (!resizeNode) return;
      this._resizeObserver.observe(resizeNode);
    } else {
      this._resize();
    }
  }

  componentDidUpdate() {
    if (!supportResizeObserver) {
      this.refExpand.scrollTop = this.refExpand.scrollHeight;
      this.refExpand.scrollLeft = this.refExpand.scrollWidth;
      this.refShrink.scrollTop = this.refShrink.scrollHeight;
      this.refShrink.scrollLeft = this.refShrink.scrollWidth;
    }
  }

  componentWillUnmount() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }

  _onResize(rect) {
    if (this.props.onResize) {
      this.props.onResize(rect);
    }
  }

  _onExpand() {
    const domRect = this._getRect();
    this._resize(domRect);
    if (this.props.onExpand) {
      this.props.onExpand(domRect);
    }
    this._onResize(domRect);
  }

  _onShrink() {
    const domRect = this._getRect();
    this._resize(domRect);
    if (this.props.onShrink) {
      this.props.onShrink(domRect);
    }
    this._onResize(domRect);
  }

  _resize(rect) {
    rect = rect || this._getRect();
    const domWidth = rect.width;
    const domHeight = rect.height;
    this.setState({
      domWidth: domWidth + 1,
      domHeight: domHeight + 1
    });
  }

  _getRect() {
    const dom = this.refNode;
    return dom.getBoundingClientRect();
  }

  renderResizeEl() {
    const children = React.Children.only(this.props.children);
    return children;
  }

  renderPolyfillEl() {
    const { domWidth, domHeight } = this.state;
    return (
      <div style={styles.wrapper} ref={(node) => { this.refNode = node; }}>
        <div style={styles.resizeWrapper}
          ref={(node) => { this.refExpand = node; }}
          onScroll={this._onExpand.bind(this)}>
          <div style={{ width: domWidth, height: domHeight }}>
          </div>
        </div>
        <div ref="shrink" style={styles.resizeWrapper}
          ref={(node) => { this.refShrink = node; }}
          onScroll={this._onShrink.bind(this)}>
          <div style={styles.shrink}>
          </div>
        </div>
      </div>
    );
  }

  renderResizeContainer() {
    return (
      <div style={styles.container}>
        { this.props.children }
        { this.renderPolyfillEl() }
      </div>
    );
  }

  render() {
    if (supportResizeObserver) {
      return this.renderResizeEl();
    }
    return this.renderResizeContainer();
  }
}

export default Resize;
