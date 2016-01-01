import React from 'react';
import ReactDOM from 'react-dom';

let {
    Component,
} = React;

class Resize extends Component {
    propTypes: {
        onExpand: React.PropTypes.func,
        onShrink: React.PropTypes.func,
    },

    constructor(props) {
        super(props);
        this.state = {
            domWidth: 0,
            domHeight: 0,
        };
    }

    _onExpand() {
        this._resize();
        if(this.props.onExpand) {
            this.props.onExpand();
        }
    }

    _onShrink() {
        this._resize();
        if(this.props.onShrink) {
            this.props.onShrink();
        }
    }
    
    _resize() {
        var dom = ReactDOM.findDOMNode(this);
        var domWidth = dom.clientWidth;
        var domHeight = dom.clientHeight;
        this.setState({
            domWidth: domWidth + 1,
            domHeight: domHeight + 1
        });
    }

    componentDidMount() {
        this._resize();
    }

    componentDidUpdate() {
        var expand = ReactDOM.findDOMNode(this.refs.expand);
        expand.scrollTop = expand.scrollHeight;
        expand.scrollLeft = expand.scrollWidth;
        var shrink = ReactDOM.findDOMNode(this.refs.shrink);
        shrink.scrollTop = shrink.scrollHeight;
        shrink.scrollLeft = shrink.scrollWidth;
    }

    render() {
        return (
            <div style={styles.wrapper}>
                <div ref="expand" style={styles.resizeWrapper} onScroll={this._onExpand.bind(this)}>
                    <div style={{width: this.state.domWidth, height: this.state.domHeight}}>
                    </div>
                </div>
                <div ref="shrink" style={styles.resizeWrapper} onScroll={this._onShrink.bind(this)}>
                    <div style={styles.shrink}>
                    </div>
                </div>
            </div>
        );
    }
}

let styles = {
    wrapper: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'red',
        zIndex: -1,
    },

    resizeWrapper: {
        overflow: 'hidden',
        width: '100%',
        height: '100%',
    },

    shrink: {
        height: '200%',
        width: '200%',
    }
};

export default Resize;
