import Post from "./Post";
import { useEffect, useState } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Schedule from "./Schedule";
import Contributors from './Contributors';

export default function Card(props) { 
  const {cardId} = props;
  const [posts, setPosts] = useState([]);
  const userId = localStorage.getItem('userId')
  
  useEffect(()=>{
    const getgifdata = `http://localhost:3001/api/gif`;
    console.log('hello tesgskjdfh');
    const userId = localStorage.getItem('userId')
    console.log('!!!&&&!!!', userId);
    // const reactinfo = {userId}
    const params = {userId}
    axios.get(getgifdata, {params, withCredentials: true})
    .then((response) => {
      console.log('d',response.data.posts);
      setPosts(response.data.posts);
    })

    
  }, []);
  console.log('posttesting', posts);

  return (
    <>
      <h1>Posts created</h1>
      
      {/* <Post cardId={cardId} userId={userId}/>
      <Schedule />
      <Contributors cardId={cardId}/> */}
      <div>
        {posts.map(post=>(
          <div key={post.id} className='test'>
            <img src={post.gif}/>
            <p>
              {post.text}
            </p>
            {/* <p>{post.}</p> */}
          </div>
        ) )}
      </div>
    </>
  );
}