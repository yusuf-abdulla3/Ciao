import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";


export default function ContributorForm (props){
  const  history = useHistory();
  const [conName, setConName] = useState('');
  const [conEmail, setConEmail] = useState('');
  const [email, setEmail] = useState('');
  const cardUrl = props.cardId ? `http://localhost:3000/card/${props.cardId}`: '';
  const [conSub, setConSub] = useState('You are invited for contribution');
  const [conText, setConText] = useState(cardUrl);
  const [isError, setIsError] = useState(false);
  const [isCon, setIsCon] = useState(false);
  const renderError = () => {
    if(isError){
      return (
        <div>
          unable to send email. please try again in few minutes
        </div>
      )
    }

  }
  const renderConf = () =>{
    if(!isCon){
      return (
        <div>
          Email sent successfully.
        </div>
      )
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = 'http://localhost:3001/api/contributor/';
    const cardId = props.cardId 
    const params= {cardId}
    const Data = {conName, conEmail, conText, email, params, conSub};
    axios.post(url, Data)
    .then(res => {
      console.log('contributor send');
      console.log(res)
      setIsCon(true);
      setTimeout(()=>setIsCon(false), 4000)
      history.push(`/card/${cardId}`);
    })
      .catch(err => console.log('--->--',err.data))
      setIsError(true);
      setTimeout(()=>setIsError(false), 4000)
      history.push(`/card/${cardId}`);

  }
  return (
    <>
      <form onSubmit = {handleSubmit}>
        <input type="text"
          placeholder = "enter the contributor name"
          onChange = {(e)=>{setConName(e.target.value)}}
        />
        <input type="text"
          placeholder = "enter the contributor email"
          onChange = {(e)=>{setConEmail(e.target.value)}}
        />
        <input type="text"
          placeholder = "enter your email"
          onChange = {(e)=>{setEmail(e.target.value)}}
        />
        {/* <input type="text"
          placeholder = "enter your message"
          onChange = {(e)=>{setConText(e.target.value)}}
        /> */}
        <input type="submit"
        />
      </form>
      <div>{renderError()}</div>
    </>
  );
}