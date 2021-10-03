import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const history = useHistory();
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    const reactRegData = {regFirstName, regLastName, regEmail, regPass};
    const url = 'http://localhost:3001/api/signup/';
    axios.post(url, reactRegData)
    .then(res => {
      console.log('registration details send');
      console.log(res)
    })
    .catch(err => console.log('--->--',err.data))

    
    history.push('/');  
  }
  
  return (
    <>
      <h1>SignUp page</h1>
      <form onSubmit={handleRegisterSubmit}>
        <div>
        <input
          type="text"
          placeholder = "Please enter your firstname"
          onChange = {e => setRegFirstName(e.target.value)}
        />
        </div>
        <div>
        <input
          type="text"
          placeholder = "Please enter your lastname"
          onChange = {e => setRegLastName(e.target.value)}
        />
        </div>
        <div>
        <input
          type="text"
          placeholder = "Please enter your email"
          onChange = {e => setRegEmail(e.target.value)}
        />
        </div>
        <div>
        <input
          type="text"
          placeholder = "Please enter your password"
          onChange = {e => setRegPass(e.target.value)}
        />
        </div>
        <input type="submit" value="Sign Up"></input>

      </form>
    </>
  );
}