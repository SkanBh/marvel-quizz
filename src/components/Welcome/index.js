import { useState, Fragment, useEffect } from "react";
import { auth, user } from "../Firebase/firebaseConfig";
import { getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout/index";
import Quiz from "../Quiz/index";

const Welcome = () => {
  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const listner = onAuthStateChanged(auth, (user) => {
      user ? setUserSession(user) : navigate("/");
    });

    if (!!userSession) {

      const colRef = user(userSession.uid)

      getDoc(colRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const docData = snapshot.data() ; //objet
            setUserData(docData)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return listner();
  }, [userSession]);

  return userSession === null ? (
    <Fragment>
      <div className="loader"></div>
      <p className="loaderText">Loading...</p>
    </Fragment>
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quiz userData={userData} />
      </div>
    </div>
  );
};

export default Welcome;
