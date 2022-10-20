import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, user } from "../Firebase/firebaseConfig";
import { setDoc } from "firebase/firestore" 
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, pseudo } = loginData;
    createUserWithEmailAndPassword(auth, email, password)
      .then ( authUser =>{
        return setDoc(user(authUser.user.uid), {
          pseudo,
          email
        })
        })
      // console.log(email,password)
      .then(() => {
        setLoginData({ ...data });
        navigate("/welcome");
        console.log("inscription validé");
      })
      .catch((error) => {
        setError(error);
        setLoginData({ ...data });
      });
  };

  const { pseudo, email, password, confirmPassword } = loginData;

  const btn =
    pseudo === "" ||
    email === "" ||
    password === "" ||
    password !== confirmPassword ? (
      <button disabled>Inscription</button>
    ) : (
      <button>Inscription</button>
    );

  // gestion erreurs
  const errorMsg = error !== "" && <span>{error.message}</span>;

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>
        <div className="formBoxRight">
          <div className="formContent">
          <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={pseudo}
                  type="text"
                  id="pseudo"
                  autoComplete="off"
                  required
                />
                <label htmlFor="pseudo">Pseudo</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={email}
                  type="email"
                  id="email"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={password}
                  type="password"
                  id="password"
                  autoComplete="off"
                  required
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={confirmPassword}
                  type="password"
                  id="confirmPassword"
                  autoComplete="off"
                  required
                />
                <label htmlFor="ConfirmPassword">Confirmer le password</label>
                {btn}
              </div>
            </form>
            <div className="linkcontainer">
              <Link className="simpleLink" to="/login">
                Déja inscrit ? Connectez vous !
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
