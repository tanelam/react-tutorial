import React, { Component } from 'react';

//Basic Article Component
class Article extends Component {
  constructor(props) {
    super(props);

    //initial state
    this.state = {};
  }

  //Component Lifecycle
  //https://reactjs.org/docs/react-component.html#the-component-lifecycle
  /* DEPRECATED LIFECYCLE METHODS BELOW
  UNSAFE_componentWillMount() {
    console.log('component will mount');
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('component will receive props');
  }
  UNSAFE_componentWillUpdate() {
    console.log('component will update');
  }
  */


  static getDerivedStateFromProps(props, state) {
    console.log('get derived state from props');
    return null;
  }

  componentDidMount() {
    console.log('component did mount');
  }
  shouldComponentUpdate() {
    return true;
  }
  getSnapshotBeforeUpdate(prevProps, prevState){
    console.log('get snapshot before update');
    return { foo: 'bar' };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('component did update');
  }
  componentWillUnmount() {
    console.log('component will unmount');
  }

  handleClick = (event) => {
    console.log(event.target.link)
  }
  //this fires every time a prop or state changes
  //to use any prop, use this.props.NAME_OF_PROP
  //use {} to add JS expressions
  //use className to add CSS classes
  //remember that this is not HTML!!
  //https://reactjs.org/docs/introducing-jsx.html
  render() {
    const {headline, summary, showSummary, image, link} = this.props;

    const summaryDisplay = showSummary ? <div className="summary">{summary}</div> : "";
    const imageDisplay =  image ? <img className="article-image" src={image} width="400" height="350"></img> : <img className="no-image" src="https://library.rice.edu/sites/default/files/library-news-images/WSJ.png" width="400" height="350"></img>

  return (
    <div className="article">
        <a href={link} target="_blank">{imageDisplay}</a>
        <div className="headline">
          <h3>{headline}</h3>
          {summaryDisplay}
        </div>
    </div>
  )
  }
};

//set default props here, if any
Article.defaultProps = {};

//export so others can use
export default Article;
