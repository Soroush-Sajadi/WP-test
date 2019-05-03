import React, { Component } from 'react';
class App extends React.Component {
    constructor(props){
      super(props);
  
      this.state = {
        data: null
      };
    }
    loadData(){
      fetch('https://messenger.wappia.tech/accounts')
        .then(response => response.json())
        .then(data => this.setState({data}));
    }
        render(){
            return(
                null
            );
        }
    
        
   
    
  }
  
  
  
  export default App;
  