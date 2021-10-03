import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {useParams} from "react-router-dom";
export default function NewCard (props) {
  
  const { loginStatus, userId, setCardId } = props;
  console.log('propropriopo',props)
  const [title, setTitle] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const { id } = useParams();
  const history = useHistory();

  const handleCardSubmit = (event) => {
    event.preventDefault();
    const url = 'http://localhost:3001/api/newcard/';
    console.log('userid', userId);
    const reactData = {title, fName, lName, email, userId }
    axios.post(url, reactData)
    .then(res => {
      console.log('card details send');
      console.log(res)
      setCardId(res.data.cardId);
    })
    .catch(err => console.log('--->--',err.data))

    
    history.push('/post');  
    // history.push(`/cards/${id}`);
  }
  
  

  return (
    <>
      { loginStatus && 
        <form onSubmit={handleCardSubmit}>
          <input
            type="text"
            placeholder = "Please enter the title of the card"
            onChange = {e => setTitle(e.target.value)}
            
          />
          <input
            type="text"
            placeholder = "Please enter the firstname of the recipent"
            onChange = {e => setFName(e.target.value)}
          />
          <input
            type="text"
            placeholder = "Please enter the lastname of the recipent"
            onChange = {e => setLName(e.target.value)}
          />
          <input
            type="text"
            placeholder = "Please enter the email of the recipent"
            onChange = {e => setEmail(e.target.value)}
          />
          <input type="submit" value="Create New Card"></input>
        </form>   
      
      }
      {!loginStatus && 
        <p>Please Login inorder to create a card</p>
      }
    </>
  );
}

