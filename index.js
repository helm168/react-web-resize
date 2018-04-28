import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1
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
    this._resize();
  }

  componentDidUpdate() {
    this.refExpand.scrollTop = this.refExpand.scrollHeight;
    this.refExpand.scrollLeft = this.refExpand.scrollWidth;
    this.refShrink.scrollTop = this.refShrink.scrollHeight;
    this.refShrink.scrollLeft = this.refShrink.scrollWidth;
  }

  _onExpand() {
    this._resize();
    if (this.props.onExpand) {
      this.props.onExpand();
    }
  }

  _onShrink() {
    this._resize();
    if (this.props.onShrink) {
      this.props.onShrink();
    }
  }

  _resize() {
    const dom = this.refNode;
    const domWidth = dom.clientWidth;
    const domHeight = dom.clientHeight;
    this.setState({
      domWidth: domWidth + 1,
      domHeight: domHeight + 1
    });
  }

  render() {
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
}

export default Resize;
