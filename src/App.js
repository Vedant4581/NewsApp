import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state={
    progress:0,
  }
  setProgress =(progressReached)=>{
    this.setState({
      progress:progressReached
    })
  }
  render() {
    
    
    return (
      <div>
        <Router>
        <LoadingBar
            color='green'
            progress={this.state.progress}
            onLoaderFinished={() => this.setProgress(0)}
          />
          <Navbar/>
         
          <Routes>
            <Route exact path="/" element={<News loadingProgress={this.setProgress} key="general" pageSize={5} country="in" category="general" />}>
               
            </Route >
            <Route exact path="/business" element={<News loadingProgress={this.setProgress} key="business" pageSize={5} country="in" category="business" />}>
               
            </Route >
            <Route exact path="/entertainment" element={<News loadingProgress={this.setProgress} key="entertainment" pageSize={5} country="in" category="entertainment" />}>
               
            </Route >
            <Route exact path="/general" element={<News loadingProgress={this.setProgress} key="general" pageSize={5} country="in" category="general" />}>
                 
            </Route >
            <Route exact path="/health" element={<News loadingProgress={this.setProgress} key="health" pageSize={5} country="in" category="health" />}>
                
            </Route >
            <Route exact path="/science" element={<News loadingProgress={this.setProgress} key="science" pageSize={5} country="in" category="science" />}>
                 
            </Route  >
            <Route  exact path="/sports" element={<News loadingProgress={this.setProgress} key="sports" pageSize={5} country="in" category="sports" />}>
                
            </Route>
            <Route exact path="/technology" element={<News loadingProgress={this.setProgress} key="technology" pageSize={5} country="in" category="technology" />}>
                
            </Route>
        </Routes>
        </Router>
      </div>
    )
  }
}