import React , { Component } from 'react';
//import image from './images/index.jpg';
import firebase from './Firebase';

class NoteBook extends Component {
  constructor(props){
    super(props);

    this.state = {
        className: ' ',
        cardlist: [],
        cardTitle: 'Untitled',
        cardContent: 'Your Content Here',
        isEditing: false,
        index: 0,
        item: '',
        like:false
        };
      }

  componentDidMount(){

    firebase.database().ref(`users/${this.props.id}/cards`).on('value', (snapshot) => {
    let cardlist = snapshot.val();
    //console.log(cardlist);
    let newState = [];
    for (let cardId in cardlist) {
      newState.push({
        id:cardId,
        cardTitle: cardlist[cardId].cardTitle,
        cardContent: cardlist[cardId].cardContent
      });
    }
    //console.log(newState);
    this.setState({
      cardlist: newState
    });
    //console.log(this.state.cardlist.length);
  /*  for (var i = 0; i < this.state.cardlist.length; i++) {
                       console.log(this.state.cardlist[i]);
    }*/
    //This contains the whole list, getting ALL values and listening
    //to every change. We may or may not want that.
    //console.log(snapshot.val());
    })
    }

  onChangeHandler = (e) => {
  //console.log(e);
  this.setState({
    cardTitle: e.target.value,
    cardContent: e.target.value
    })
  //console.log(this.state.cardTitle)
  //console.log(this.state.cardContent)
}

  toggleEdit = (index, item) => {
   const { isEditing } = this.state;
    //console.log(item)
   this.setState({
     isEditing : !isEditing,
     index: index,
     item: item
   })
 //console.log(this.state.cardlist)
 }

  renderForm = (item,index) => {
    //console.log(item)
  return (
    <div className="" key={index}>
    <form onSubmit={(e) => {this.updateItem(e,item,index)}}>
      <input type="text" ref={(value) => {this.input1 = value} } defaultValue={this.state.cardTitle}/>
      <input type="text" ref={(value) => {this.input2 = value} } defaultValue={this.state.cardContent} />
      <button type="submit">Update</button>
    </form>
   </div>
    )
  }

 /*
renderLiItem = (item, index) => {
console.log(item, index)
  return (
    <li id="removeItem" className="animated lightSpeedIn effect2" key={index}>
    <div>
      <span className="spanOuter" onClick={() => {this.removeCard(item, index)}}> <span id="spanInner"> D </span> </span>
      <textarea onChange={this.onChangeHandler}  value={item.cardTitle} id="noteTitle"  />
      <textarea onChange={this.onChangeHandler}  value={item.cardContent} id="noteContent" />
      <span className="spanOuter" onClick={() => this.toggleEdit(item, index)}> <span id="spanInner"> E </span> </span>
    </div>
    </li>
  )
} */

  removeCard = (item,index) => {

  //let delCard = document.getElementById("removeItem");
   //delCard.setAttribute("class", "animated hinge")
     console.log(index, item.id);
     let id= item.id;
     let cardlist = [...this.state.cardlist];
     //console.log(cardlist);
     cardlist.splice(index,1);
     //console.log(cardlist);
     this.setState({cardlist});
     const itemRef = firebase.database().ref(`users/${this.props.id}/cards/${id}`);
     itemRef.remove();
      }

  card = () => {
    const card = {
      like: this.state.like,
      cardTitle : this.state.cardTitle,
      cardContent: this.state.cardContent
    }
    const newCardList = [...this.state.cardlist];// looping through cardlist array and macking new copy
    console.log(newCardList);

   //console.log(newCardList);
    //this.setState({cardlist: newCardList});
    //console.log(this.state.cardlist);
    //console.log(newCardList);
    //console.log("pressed")
    firebase.database().ref(`users/${this.props.id}/cards`).push({
        cardTitle : this.state.cardTitle,
            cardContent: this.state.cardContent
          }).then(pushedCard => {
            card.id = pushedCard.key;
            newCardList.push(card);
            this.setState({
                cardlist: newCardList
             });
          })



         //console.log(this.state.cardlist)

  /*

    let ul = document.getElementById("notes");
    let li = document.createElement("li");
    li.setAttribute("class", "animated lightSpeedIn effect2");
    li.setAttribute("id", "removeItem");
    let div = document.createElement("div");
    let textAreaTitle = document.createElement("textarea");
    textAreaTitle.setAttribute("id", "noteTitle");
    textAreaTitle.setAttribute("maxlength", 15);
    let textAreaNote = document.createElement("textarea");
    textAreaNote.setAttribute("id", "noteContent");
    let spanOuter = document.createElement("span");
    spanOuter.setAttribute("class", "spanOuter");
    let spanInner = document.createElement("span");
    spanInner.setAttribute("id", "spanInner");
    spanInner.addEventListener("click", this.removeCard, false );
    spanOuter.appendChild(spanInner);
    div.appendChild(spanOuter);
    div.appendChild(textAreaTitle);
    div.appendChild(textAreaNote);
    li.appendChild(div);
    ul.appendChild(li);

*/

  }

  updateItem = (e,index, item) => {
    e.preventDefault()
    console.log(item);
    console.log(this.input1.value)
    console.log(this.input2.value)
    this.setState({index: index,
                    item: item})
    this.editTask(index, item);
    console.log(index);
    this.toggleEdit();
   }

  editTask =(index, item) => {
   //console.log(index);
   //console.log(this.input1.value);
   //console.log(this.input2.value);
   let cardlist= this.state.cardlist; //Assigned whole List or Array to cardlist
  //console.log(cardlist)
   let cardData= cardlist[index]  // Replacing Old data with new data
   //console.log(cardData)
      cardData = {
        id: index,
    cardTitle : this.input1.value,
    cardContent: this.input2.value
  };
  //console.log(cardData)
   cardlist[index] = cardData;
  //console.log(cardlist)
  this.setState({
    cardlist: cardData
   })
  firebase.database().ref(`users/${this.props.id}/cards/${item.id}`).set({cardTitle : this.input1.value,
  cardContent: this.input2.value});
  }

/*like = (index) => {

let cardlist = this.state.cardlist;
let card = cardlist[index];
//card.like = !card.like;
  card = {
    id: index,
    like: !card.like
  }
  cardlist[index] = card;
this.setState({
  cardlist: card
})
}*/




  render(){
    //console.log(this.state.cardlist)
   // const { isEditing } = this.state;
    const list = this.state.cardlist.map( (item, index) => {
      //  console.log(item) // Right item
          return <section key={index}>
            <li id="removeItem" className="animated lightSpeedIn effect2" key={index}>
            <div>
              <span className="spanOuter del-block" onClick={() => {this.removeCard(item, index)}}> <span id="spanInner"> D </span> </span>
              <textarea onChange={this.onChangeHandler}  value={item.cardTitle} id="noteTitle"  />
              <textarea onChange={this.onChangeHandler}  value={item.cardContent} id="noteContent" />
              <span className="spanOuter edit-inlineblock" onClick={() => this.toggleEdit(item, index)}> <span id="spanInner"> E </span> </span>

            </div>
            </li>
            </section>

          });

      let email = this.props.username;
      //console.log(email);
      let username = email.substring(0,email.indexOf('@')).toUpperCase()
      //console.log(username);
      //console.log(this.state.index)
      //console.log(this.state.item)
    return(
      <div>

        <div className="online"> Online <span className="username">{username} </span></div>

        {/*<img src={image} alt="Add Icon" /> */}
        <div> <span className='addBtn effect7' onClick={this.card}> <h1 className={'innerBtn ' + this.state.className}> + </h1> </span> </div>
        <div id="controls">
          <ul id="notes">
            { this.state.isEditing ?
              this.renderForm(this.state.item,this.state.index) : list
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default NoteBook;
