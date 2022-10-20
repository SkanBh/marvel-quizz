
import {useEffect, useState} from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebaseConfig'
import { Link, useNavigate } from 'react-router-dom'




const Login = () => {

    const navigate = useNavigate()

    const [email,setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [btn,setBtn] = useState(false)
    const [error, setError] = useState('')

    useEffect(()=>{
        if(password.length > 5 && email !== ''){
            setBtn(true)
        }
        else if(btn===true){
            setBtn(false)
        }
    },[password,email,btn])

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(auth, email, password);
        signInWithEmailAndPassword(auth, email, password)
        .then(user=>{
            console.log('test'); /* ce console.log() ne marche pas */
            setEmail('')
            setPassword('')
            navigate('/welcome', {replace: true} )
        })
        .catch((error) => {
            setError(error)
            setEmail('')
            setPassword('')
            const errorCode = error.code;
            const errorMessage = error.message;
          });
       
    }

    // gestion erreurs
    const errorMsg = error !== "" && <span>{error.message}</span>;


  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
            {errorMsg}
          <h2>Connexion</h2>
          <div className="formContent">
            <form onSubmit={handleSubmit}>
              
              <div className="inputBox">
                <input
                  onChange={(e)=>{setEmail(e.target.value)}}
                  value={email}
                  type="email"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={(e)=>{setPassword(e.target.value)}}
                  value={password}
                  type="password"
                  autoComplete="off"
                  required                      
                />
                <label htmlFor="password">Password</label>
              </div>
              {btn ? <button >Connexion</button> : <button disabled>Connexion</button> }
            </form>
            <div className="linkContainer">
                <Link className="simpleLink" to="/signup">Nouveau sur Marve Quiz ? Inscrivez vous maintenant !</Link>
                <br/>
                <Link className="simpleLink" to="/forgetpassword">Mot de passe oublié ?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
