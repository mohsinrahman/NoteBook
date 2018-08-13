import React , { Component } from 'react';
import firebase from './Firebase';
import NoteBook from './NoteBook';

class Authentication extends Component {

  constructor(props){
    super(props);

    this.state = {
      username: "",
      password: "",
      user: ""
    };
  }

  componentDidMount(){

        firebase.auth()
        .onAuthStateChanged((user)=>{
          if(user){
            this.setState({user:user});
          }else {
            this.setState({user: ''});
          }

        })
  }

  onSubmit=(eve)=>{
       eve.preventDefault();
       firebase.auth()
       .createUserWithEmailAndPassword(this.state.username,this.state.password)
       .then((user) =>{
       firebase
       .database()
       .ref(`users/${user.uid}`)
       .set({ email: user.email, uid: user.uid })
        })
       .catch(error => console.log(error));

       this.setState({ username:'', password:''});
  }

  signIn=()=>{
        firebase.auth()
        .signInWithEmailAndPassword(this.state.username,this.state.password)
        .catch(error => console.log(error));
       console.log(this.state.username)
        this.setState({ username:'', password:''});

  }

  signOut=()=>{
        firebase.auth().signOut();
        this.setState({ username:'', password:''});
  }
  onChange(evnt){
    this.setState({ [evnt.target.name]: evnt.target.value });
    console.log(evnt.target.value);
  }

  render(){
    console.log(this.state.user)
  //username={this.state.user.email}
    return(
      <div>
      <div><h2> Welcome! </h2>{ this.state.user && <NoteBook id={this.state.user.uid} username={this.state.user.email}/>  }</div>
      { !this.state.user && <form id="user-form" onSubmit={this.onSubmit}>
      <input id="email" type="email" name="username" placeholder="Enter Your Email" onChange={this.onChange.bind(this)} value={this.state.username} /><br/>
      <input id="password" type="password" name="password" placeholder="Enter Your Password" onChange={this.onChange.bind(this)} value={this.state.password}/><br/>

      <input type="submit" value="Sign Up" />
      </form> }
      { !this.state.user && <button onClick={this.signIn}>Log In </button> }
      <button onClick={this.signOut}>Log Out </button>
      </div>
    );
  }
}



export default Authentication;
