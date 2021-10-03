import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post from './Post';
import AddGif from "./AddGif";
import AddImg from "./AddImg";
import AddVideo from "./AddVideo";
import SendCard from "./SendCard";
import ContributorForm from "./ContributorForm";


export default function CardDetails(props) {
  const {cardId} = useParams();
  const [cardDetails,setCardDetails] = useState([]);
  const [showGif, setShowGif] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showSend, setShowSend] = useState(false);
  const [showContri, setShowContri] = useState(false);

  const userId = localStorage.getItem('userId')
  const getDetails = () => {
   
    const url = 'http://localhost:3001/api/card/'+cardId
    
    axios.get(url)
      .then(res => {
        console.log('carddetails', res)
        setCardDetails(res.data);
       
      })
      .catch(err => console.log('->-->--',err.data))
  }
  useEffect(()=>{
    getDetails();
  },[])
  const handleClick1 = () => {
    setShowGif(!showGif);
  }
  const handleClick2 = () => {
    setShowImg(!showImg);
  }
  const handleClick3 = () => {
    setShowVideo(!showVideo);
  }
  const handleSend = () => {
    // return {<SendCard cardId={cardId}/>}
    setShowSend(!showSend);
  }
  const handleContri = () => {
    setShowContri(!showContri);
  }
  return (
    <>
    <button onClick={handleClick1}>Add Gif</button>
    <button onClick={handleClick2}>Add Img</button>
    <button onClick={handleClick3}>Add video</button>
    <button onClick={handleSend}>Send</button>
    <button onClick={handleContri}>Add Contributor</button>

    {showGif && <AddGif cardId={cardId} userId={userId}/>}
    {showImg && <AddImg cardId={cardId} userId={userId}/>}
    {showVideo && <AddVideo cardId={cardId} userId={userId}/>}
    {showSend && <SendCard cardId={cardId}/> }
    {showContri && <ContributorForm cardId={cardId}/> }

      {cardDetails.map(post => (
        <div key={post.id}>
          <img src={post.gif}/>
          <p>{post.text}</p>
          <p>Created By:{post.first_name}</p>
        </div>
      ))
      
      }
    </>
  );

}