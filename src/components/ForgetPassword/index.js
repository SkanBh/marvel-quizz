import { useState } from "react";
import { auth } from "../Firebase/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // console.log('test');
        setError(null);
        setSuccess(
          `Consultez votre email ${email} pour changer le mot de passe`
        );
        setEmail("");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        setError(error);
        setEmail("");
      });
  };

  const disabled = email === "";

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {success && (
              <span
                style={{
                  border: "1px solid",
                  background: "success",
                  color: "white",
                }}
              >
                {success}
              </span>
            )}

            {
              error && <span>{error.message}</span>
            } 

            <h2>Mot de passe oublié</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  type="email"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <button type="submit" disabled={disabled}>Récupérer</button>
            </form>
            
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Deja inscrit ? connectez vous !
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
