import React, { useEffect, useState } from "react";
import { TfiCup } from "react-icons/tfi";
import Loader from "../Loader";
import Modal from "../Modal";
import axios from "axios";

const QuizOver = React.forwardRef((props, ref) => {
  const {
    levelNames,
    score,
    maxQuestions,
    quizLevel,
    percent,
    loadLevelQuestions,
  } = props;

  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
  const hash = "f9c275163646f66252d1b90573ab1ca2";

  const [asked, setAsked] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [charctersInfos, setCharctersInfos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAsked(ref.current);

    if (localStorage.getItem("marvelStorageDate")) {
      const date = localStorage.getItem("marvelStorageDate");
      checkDataAge(date);
    }
  }, [ref]);

  const checkDataAge = (date) => {
    const today = Date.now();
    const timeDifference = today - date;

    const daysDifference = timeDifference / (1000 * 3600 * 24);

    if (daysDifference >= 15) {
      localStorage.clear();
      localStorage.setItem("marvelStorageDate", Date.now());
    }
  };

  const showModal = (id) => {
    setOpenModal(true);

    if (localStorage.getItem(id)) {
      setCharctersInfos(JSON.parse(localStorage.getItem(id)));
      setLoading(false);
    } else {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash${hash}`
        )
        .then((response) => {
          setCharctersInfos(response.data);
          setLoading(false);

          localStorage.setItem(id, JSON.stringify(response.data));
          if (!localStorage.getItem("marvelStorageDate")) {
            localStorage.setItem("marvelStorageDate", Date.now());
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const hideModal = () => {
    setOpenModal(false);
    setLoading(true);
  };

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const averageGrade = maxQuestions / 2;

  if (score < averageGrade) {
    // setTimeout(() => loadLevelQuestions(0),3000)
    setTimeout(() => loadLevelQuestions(quizLevel), 3000);
  }

  const decision =
    score >= averageGrade ? (
      <>
        <div className="stepsBtnContainer">
          {quizLevel < levelNames.length ? (
            <>
              <p className="successMsg">BRAVO! passez au niveau suivant!</p>
              <button
                onClick={() => loadLevelQuestions(quizLevel)}
                className="btnResult success"
              >
                Niveau Suivant
              </button>
            </>
          ) : (
            <>
              <p className="successMsg">
                <TfiCup size="50px" /> BRAVO! vous etes un expert!
              </p>
              <button
                onClick={() => loadLevelQuestions(0)}
                className="btnResult gameOver"
              >
                Accueil
              </button>
            </>
          )}
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite: {percent} %</div>
          <div className="progressPercent">
            Note:{score}/{maxQuestions}
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="stepsBtnContainer">
          <p className="failureMsg">Vous avez échoué !</p>
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite: {percent} %</div>
          <div className="progressPercent">
            Note: {score}/{maxQuestions}
          </div>
        </div>
      </>
    );

  const questionAnswer =
    score >= averageGrade ? (
      asked.map((question) => {
        return (
          <tr key={question.id}>
            <td>{question.question}</td>
            <td>{question.answer}</td>
            <td>
              <button
                className="btnInfo"
                onClick={() => showModal(question.heroId)}
              >
                Infos
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="3">
          <Loader
            loadingMsg={"Pas de réponses"}
            styling={{ textAlign: "center", color: "red" }}
          />
        </td>
      </tr>
    );

  const resultInModal = !loading ? (
    <>
      <div className="modalHeader">
        <h2>{charctersInfos.data.results[0].name}</h2>
      </div>
      <div className="modalBody">
        <div className="comicImage">
          <img 
            src={charctersInfos.data.results[0].thumbnail.path+'.'+charctersInfos.data.results[0].thumbnail.extension} 
            alt={charctersInfos.data.results[0].name}
          />
          <p> { charctersInfos.attributionText } </p>
        </div>
        <div className="comicDetails">
          <h3>Description</h3>
          {
            charctersInfos.data.results[0].description ?
            <p>{charctersInfos.data.results[0].description}</p>
            :<p>Description indisponnible ...</p>
          }
          <h3>Plus d'infos</h3>
          {
            charctersInfos.data.results[0].urls && 
            charctersInfos.data.results[0].urls.map((url,index)=>{
              return <a 
                key={index}
                href={url.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {capitalizeFirstLetter(url.type)}
              </a>
            })
          }
        </div>
      </div>
      <div className="modalFooter">
        <button className="modalBtn" onClick={hideModal}>Fermer</button>
      </div>
    </>
  ) : (
    <>
      <div className="modalHeader">
        <h2>Réponse de Marvel ...</h2>
      </div>
      <div className="modalBody">
        <Loader />
      </div>
    </>
  );

  return (
    <>
      {decision}
      <hr />
      <p>Les réponses aux questions posées</p>
      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Questions</th>
              <th>Réponses</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>{questionAnswer}</tbody>
        </table>
      </div>

      <Modal showModal={openModal} hideModal={hideModal}>
        {resultInModal}
      </Modal>
    </>
  );
});

export default React.memo(QuizOver);
