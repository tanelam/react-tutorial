//import react, because we want to build off a React component
import React, { Component } from 'react';

//Example HelloWorld Component
class HelloWorld extends Component {
  //this is where you put the JSX to render on the page
  render() {
    let date = new Date()
    let dateToString = date.toDateString()

    return(
    <div>
      <h1 className="logo"><img src='assets/wsj-logo.svg'/></h1>
      <p className="logo">| {dateToString} |</p>
      <hr/>
    </div>
  )
  }
};



//this is where you can define fallbacks for any props that don't get sent
HelloWorld.defaultProps = {
  message: ""
};

//export this, or other files can't use this
export default HelloWorld;
