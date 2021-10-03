import { Link } from "react-router-dom";
import axios from 'axios';
import { useHistory } from "react-router-dom";
export default function Navbar(props) {
  const { loginStatus, firstName, setLoginStatus, userId, sentCards} = props;
  const history = useHistory();
  const loggedOut = () => {
    console.log('clicked on testing');
    const url = 'http://localhost:3001/api/logout/';
    axios.get(url, {withCredentials: true})
    .then(res => {
      console.log('login details send', res);
      setLoginStatus(false);
      localStorage.removeItem('userId');
    })
    .catch(e => console.log('err', e))
    history.push('/');
  }
  


  return (
    <div>
      <h1>Navbar page</h1>
      <nav className="navbar">
        <div>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/createcard'>Create Card</Link></li>
            {loginStatus &&
              <>
              <li>logged in as -- {firstName}</li>
              <li><Link to='/sent/' onClick={sentCards}>List</Link></li>
              <li><button onClick={loggedOut}>Logout</button></li>
              </>
            }
            {!loginStatus &&
              <>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/signup'>SignUp</Link></li>
              </> 
            }
            
          </ul>
        </div>
      </nav>
    </div>
  );
}