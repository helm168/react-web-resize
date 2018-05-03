'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var supportResizeObserver = typeof ResizeObserver !== 'undefined';

var styles = {
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

var Resize = function (_Component) {
  _inherits(Resize, _Component);

  function Resize(props) {
    _classCallCheck(this, Resize);

    var _this = _possibleConstructorReturn(this, (Resize.__proto__ || Object.getPrototypeOf(Resize)).call(this, props));

    _this.state = {
      domWidth: 0,
      domHeight: 0
    };
    return _this;
  }

  _createClass(Resize, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (supportResizeObserver) {
        this._resizeObserver = new ResizeObserver(function (entries) {
          entries.forEach(function (entry) {
            _this2._onResize();
          });
        });
        this._resizeObserver.observe(this.refResizeNode.parentNode);
      } else {
        this._resize();
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextState.domWidth !== this.state.domWidth) {
        return true;
      }
      return false;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (!supportResizeObserver) {
        this.refExpand.scrollTop = this.refExpand.scrollHeight;
        this.refExpand.scrollLeft = this.refExpand.scrollWidth;
        this.refShrink.scrollTop = this.refShrink.scrollHeight;
        this.refShrink.scrollLeft = this.refShrink.scrollWidth;
      }
    }
  }, {
    key: 'componentWillUnmout',
    value: function componentWillUnmout() {
      if (this._resizeObserver) {
        this._resizeObserver.disconnect();
      }
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      if (this.props.onResize) {
        this.props.onResize();
      }
    }
  }, {
    key: '_onExpand',
    value: function _onExpand() {
      this._resize();
      if (this.props.onExpand) {
        this.props.onExpand();
      }
      this._onResize();
    }
  }, {
    key: '_onShrink',
    value: function _onShrink() {
      this._resize();
      if (this.props.onShrink) {
        this.props.onShrink();
      }
      this._onResize();
    }
  }, {
    key: '_resize',
    value: function _resize() {
      var dom = this.refNode;
      var domWidth = dom.clientWidth;
      var domHeight = dom.clientHeight;
      this.setState({
        domWidth: domWidth + 1,
        domHeight: domHeight + 1
      });
    }
  }, {
    key: 'renderResizeEl',
    value: function renderResizeEl() {
      var _this3 = this;

      return _react2.default.createElement('div', { ref: function ref(node) {
          _this3.refResizeNode = node;
        } });
    }
  }, {
    key: 'renderPolyfillEl',
    value: function renderPolyfillEl() {
      var _this4 = this,
          _React$createElement;

      var _state = this.state,
          domWidth = _state.domWidth,
          domHeight = _state.domHeight;

      return _react2.default.createElement(
        'div',
        { style: styles.wrapper, ref: function ref(node) {
            _this4.refNode = node;
          } },
        _react2.default.createElement(
          'div',
          { style: styles.resizeWrapper,
            ref: function ref(node) {
              _this4.refExpand = node;
            },
            onScroll: this._onExpand.bind(this) },
          _react2.default.createElement('div', { style: { width: domWidth, height: domHeight } })
        ),
        _react2.default.createElement(
          'div',
          (_React$createElement = { ref: 'shrink', style: styles.resizeWrapper
          }, _defineProperty(_React$createElement, 'ref', function ref(node) {
            _this4.refShrink = node;
          }), _defineProperty(_React$createElement, 'onScroll', this._onShrink.bind(this)), _React$createElement),
          _react2.default.createElement('div', { style: styles.shrink })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      if (supportResizeObserver) {
        return this.renderResizeEl();
      }
      return this.renderPolyfillEl();
    }
  }]);

  return Resize;
}(_react.Component);

Resize.propTypes = {
  onExpand: _propTypes2.default.func,
  onShrink: _propTypes2.default.func
};
exports.default = Resize;
module.exports = exports['default'];
