# react-web-resize
an react resize component can detect dom resize.

### Example
```npm i react-web-resize -S```
```
import React  from 'react';
import Resize from 'react-web-resize';
  
class Scroller extends React.Component {
  render() {
    return(
      <div style={styles.wrapper}>
        <Resize onExpand={() => {//do something}}
          onShrink={() => {//do something}}/>
        {{this.props.children}}
      </div>
    );
  }
}
  
let styles = {
  wrapper: {
    width: 300,
    height: 200,
    position: 'relative',
  }
};
  
export default Scroller;
```

### Note
1. wrapper's css position need to no static. ```relative``` or ```absolute```
