import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";



export default function Login(props) {
  const { setLoginStatus, setFirstName, setUserId } = props;
  const history = useHistory();
  const [logEmail, setLogEmail] = useState('');
  const [logPass, setLogPass] = useState('');
  

  const handleLoginSub = (event) => {
    event.preventDefault();
    const reactLogData = {logEmail, logPass};
    const url = 'http://localhost:3001/api/login/';
    axios.post(url, reactLogData, {withCredentials: true})
    .then(res => {
      console.log('login details send');
      // console.log(res.data.rows[0].firstname);
      // console.log('what the',res.data.rows[0])
      console.log('w',res.data.message);

      if(!res.data.message){
        console.log(res.data.rows[0])
        setFirstName(res.data.rows[0].first_name)
        setLoginStatus(true);
        setUserId(res.data.rows[0].id)
      }else{
        console.log(res.data.message);
        setLoginStatus(false);
        setFirstName('');
      }
      
    })
    .catch(err => console.log('--->--',err))

    
    history.push('/');  
  }
  

  return (
    <>

      <h1>Login page</h1>
      <form onSubmit={handleLoginSub}>
        <div>
          <input
            type="text"
            placeholder = "Please enter your email"
            onChange = {e => setLogEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder = "Please enter your password"
            onChange = {e => setLogPass(e.target.value)}
          />
        </div>
        <input type="submit" value="Login"></input>
      </form>
      
      {/* <h1>{loginStatus}</h1> */}
    </>
  );
}