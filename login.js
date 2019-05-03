import React, { Component } from 'react';
import axios from 'axios';


const Username = 'Soroush';
var user1;
var post;
var newKey;
class Loading extends Component {
    constructor(){
        super();
        this.textInput = React.createRef();
        this.state={
            text: '' ,data :null , showMe :true, hideMe : false, message: ''  , 
            dat :null ,value :'', error:'' 
        };
        
        
    }
    
    clicked(){
        this.setState({text:this.refs.textBox.value}); /* Function send request for friends list */
        
        if(this.refs.textBox.value==Username){
            fetch('https://messenger.wappia.tech/accounts')
        .then(response => response.json())
        .then(data => this.setState({data}));
        
        this.setState({
            showMe:false,
            hideMe:true

        })
        
        }else{
            this.setState({
                error:'Your name is not identified, try again.'   /*error if name is undefind */
            })
        }
        
        
    }
    

    clicked_chat(e){
       
        this.setState({message:this.state.message+"\n"+this.refs.Message.value});  /* Function for posting message */
        
        
        
        
        
        
        axios.post('https://messenger.wappia.tech/conversations/from/Soroush/to/'+post, {
            
            message:this.refs.Message.value,
            timestamp:Date
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          
    }
   
    choose_friend(user1,user2,index){
        /** request to the server */
        fetch('https://messenger.wappia.tech/conversations/from/'+ user1 +'/to/'+ user2) 
        .then(response => response.json())
        .then(dat => this.setState({dat}));
        post = index;
    }

    logout(){
        this.setState({
            showMe: true,
            hideMe:false
        })

    }
    

render(){
    /*loop to get the name of accounts*/
    const { data } = this.state;
    
    var blocks =[];
    if (data != null){

    const friends =data.accounts;

    
    for (let i =0 ; i< friends.length;i++){
        
       
       
        
        blocks.push(<div className="block" key ={friends[i].name} onClick={() => {this.choose_friend(Username,friends[i].name,friends[i].name)}}  
        style={{  backgroundColor: '#436aa5', width:'190px',height:'36px', marginTop:'40px',marginLeft:'20px',cursor: 'pointer'}}><div style={{color: "black", marginTop:"20px", marginLeft:'65px'}}>{data.accounts[i].name}</div></div>)
        
        
    }
    
    }
    
    return(
        
        <div>
            
            <div className="Bar_Logedin"><a className="Icon">{this.state.text}</a></div>
            <div></div>
            
            
            {this.state.showMe?
            <div className="Login" >
            <a className="text"> MY CHAT BOX</a>
            <input className="Login_input" ref="textBox" type ="text" placeholder="Enter your name"/>
            <button className="Login_Butt" onClick={(e)=>{this.clicked();}}>Login</button>
            <a className="Error">{this.state.error}</a>
            </div>
            :null
            
        }
        
            {this.state.hideMe?
            <div>
            <input className="Chat_input" ref ="Message" type="text" placeholder="Enter your message and press ENTER"></input>
            <button className="Send_Butt" key={newKey} onClick={(e)=>{this.clicked_chat(post);}} >Send</button>
            <div className="Chat_Box"><div className="Message">{this.state.message}</div></div>
            <button className="Logout" onClick={(e)=>{this.logout();}}>Logout</button>
            <div className="Selected">Write to:{post}</div>
            <div >{blocks}
            </div>
            </div>
            
            :null
            
        }
        
        
            
           
            
           
            
        </div>
    )


}


}
export default Loading;