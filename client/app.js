// import React, { Component } from 'react';
//
// //import any other components here
// import HelloWorld from '../src/helloworld';
//
// //import CSS here, so webpack knows to include in bundle
// import style from '../client/style/main.css';
//
// //this is the component that generates the body of the page
// class App extends Component {
//
//   render() {
//     return (
//       <div>
//         <HelloWorld />
//       </div>
//     );
//   }
// }
//
// export default App;

//STEP 2, MORE COMPLICATED CODE FOLLOWS:

import React, { Component } from 'react';

//import any other components here
import HelloWorld from '../src/helloworld';
import Article from '../src/article';

//import CSS here, so webpack knows to include in bundle
import style from '../client/style/main.css';

//this is the component that generates the body of the page
class App extends Component {
  constructor(props) {
    super(props);

    this.toggleSummaries = this.toggleSummaries.bind(this);

    //default state
    //this keeps track of "live" data on the browser
    this.state = {
      articles: null,
      error: null,
      loaded: false,
      showSummaries: false,
      selectedCategory: "All"
    };
  }

  componentDidMount() {
    //fetching data clientside
    fetch('/api/articles').then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);

      //send data to our state
      //which will trigger render()
      this.setState({
        articles: data.items,
        loaded: true
      });
    }).catch((error) => {
      console.log(error);

      this.setState({
        error: error,
        loaded: true
      });
    });
  }

  //click handler for button
  toggleSummaries() {
    // console.log('toggle button clicked');
    this.setState((prevState, props) => ({
      showSummaries: !prevState.showSummaries
    }));
    // this.setState({
    //   showSummaries: !this.state.showSummaries
    // })
  }

  handleChange = (event) => {
    // console.log(event.target.value)
    this.setState({
      selectedCategory: event.target.value
    })
  }

  filterCategory = () => {
    // console.log(this.state.articles)
    if(this.state.selectedCategory === "All"){
      return this.state.articles
    }else{
      const articles = [...this.state.articles]
      return articles.filter(article => article.category === this.state.selectedCategory)
    }
  }

  render() {

    const filterCategories = this.filterCategory()

    const {loaded, error, articles, showSummaries} = this.state;
    //  code above is equal to this:
    //  const loaded = this.state.loaded;
    //  const error = this.state.error;
    //  const articles = this.state.articles;

    if (error) {
      //render this when there's error getting data
      return <div>Sorry! Something went wrong</div>
    } else if (!loaded) {
      //render while content is loading
      return <div>Loading...</div>
    } else {
      //render articles
      let articleJSX = [];

      filterCategories.map((article, idx) => {
        articleJSX.push(
          <Article
            key={idx}
            headline={article.headline}
            summary={article.summary}
            showSummary={showSummaries}
            image={article.image}
            link={article.share_link}
            byline={article.byline}
            category={article.category}
          />
        );
      });
      // code above is equal to this:
      // for (let i = 0; i < articles.length; i++) {
      //   articleJSX.push(
      //     <Article key={i} headline={articles[i].headline}></Article>
      //   );
      // }

      return (
        <div>
          <HelloWorld />
          <button onClick={this.toggleSummaries}>{showSummaries ? "Hide" : "Show"} Summaries</button>
          <select name="select" onChange={this.handleChange} className="dropdown">
            <option value="All">All</option>
            <option value="Markets">Markets</option>
            <option value="Mobile">Mobile</option>
            <option value="MoneyBeat">MoneyBeat</option>
            <option value="Politics">Politics</option>
            <option value="Tech">Tech</option>
            <option value="Business">Business</option>
            <option value="US">US</option>
            <option value="Economy">Economy</option>
            <option value="Real Time Economics">Real Time Economics</option>
            <option value="Life">Life</option>
            <option value="Opinion">Opinion</option>
            <option value="World">World</option>
            <option value="Page One">Page One</option>
          </select>
          <p></p>
          <div className="container">
            {articleJSX}
          </div>
        </div>
      );

    }
  }
}

export default App;
