'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _react2.default.Component;

var Resize = (function (_Component) {
    _inherits(Resize, _Component);

    function Resize(props) {
        _classCallCheck(this, Resize);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Resize).call(this, props));

        _this.state = {
            domWidth: 0,
            domHeight: 0
        };
        return _this;
    }

    _createClass(Resize, [{
        key: '_onExpand',
        value: function _onExpand() {
            this._resize();
            if (this.props.onExpand) {
                this.props.onExpand();
            }
        }
    }, {
        key: '_onShrink',
        value: function _onShrink() {
            this._resize();
            if (this.props.onShrink) {
                this.props.onShrink();
            }
        }
    }, {
        key: '_resize',
        value: function _resize() {
            var dom = _reactDom2.default.findDOMNode(this);
            var domWidth = dom.clientWidth;
            var domHeight = dom.clientHeight;
            this.setState({
                domWidth: domWidth + 1,
                domHeight: domHeight + 1
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._resize();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var expand = _reactDom2.default.findDOMNode(this.refs.expand);
            expand.scrollTop = expand.scrollHeight;
            expand.scrollLeft = expand.scrollWidth;
            var shrink = _reactDom2.default.findDOMNode(this.refs.shrink);
            shrink.scrollTop = shrink.scrollHeight;
            shrink.scrollLeft = shrink.scrollWidth;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: styles.wrapper },
                _react2.default.createElement(
                    'div',
                    { ref: 'expand', style: styles.resizeWrapper, onScroll: this._onExpand.bind(this) },
                    _react2.default.createElement('div', { style: { width: this.state.domWidth, height: this.state.domHeight } })
                ),
                _react2.default.createElement(
                    'div',
                    { ref: 'shrink', style: styles.resizeWrapper, onScroll: this._onShrink.bind(this) },
                    _react2.default.createElement('div', { style: styles.shrink })
                )
            );
        }
    }]);

    return Resize;
})(Component);

Resize.propTypes = {
    onExpand: _react2.default.PropTypes.func,
    onShrink: _react2.default.PropTypes.func
};

var styles = {
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

exports.default = Resize;
module.exports = exports['default'];
