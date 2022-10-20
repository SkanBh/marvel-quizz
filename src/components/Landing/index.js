import { useRef, useEffect, useState, Fragment } from "react";
import {Link} from 'react-router-dom'

const Landing = () => {
  const [btn, setBtn] = useState(false);

  // console.log(btn);

  const refWolverine = useRef(null);
  // console.log(refWolverine);

  useEffect(() => {
    refWolverine.current.classList.add("startingImg");
    setTimeout(() => {
      refWolverine.current.classList.remove("startingImg");
      setBtn(true);
    }, 1500);
  }, []);

  const setleftImg = ()=>{
      // console.log('je suis dans leftButton');
      refWolverine.current.classList.add("leftImg");
  }
  const setrightImg = ()=>{
      // console.log('je suis dans rightButton');
      refWolverine.current.classList.add("rightImg");
  }

  const clearImg = ()=>{
      if(refWolverine.current.classList.contains("leftImg")){
        refWolverine.current.classList.remove("leftImg")
      }
      else if(refWolverine.current.classList.contains("rightImg")){
        refWolverine.current.classList.remove("rightImg")
      }
  }

  const displayBtn = btn && (
    <Fragment>
      <div className="leftBox">
        <Link onMouseOver={setleftImg} onMouseOut={clearImg} className="btn-welcome" to="signup">Inscription</Link>
      </div>
      <div className="rightBox">
        <Link onMouseOver={setrightImg} onMouseOut={clearImg} className="btn-welcome" to="login">Connexion</Link>
      </div>
    </Fragment>
  );

  return (
    <main ref={refWolverine} className="welcomePage">
      {displayBtn}
    </main>
  );
};

export default Landing;
