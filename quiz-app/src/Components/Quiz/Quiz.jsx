import React, { useRef, useState } from 'react'
import './Quiz.css'
import {data} from '../../assets/data';
const Quiz = () => {
    let [index,setIndex]=useState(0);
    let [question,setQuestion]= useState(data[index]);
    let [lock,setLock]=useState(false);
    let [score,setScore]=useState(0);
    let [result,setResult]=useState(false);
    let [reviewMode, setReviewMode] = useState(false);


    let Option1=useRef(null);
    let Option2=useRef(null);
    let Option3=useRef(null);
    let Option4=useRef(null);

    let option_array=[Option1,Option2,Option3,Option4];

    const checkAns= (e,ans) =>{
      if(lock===false){
        if(question.ans==ans){
          e.target.classList.add("correct");
          setLock(true);
          setScore(prev=>prev+1);
        } 
        else{
          e.target.classList.add("wrong");
          setLock(true);
          option_array[question.ans-1].current.classList.add("correct");
        }     
        data[index].selected = ans;
      }  
    }

    const next= ()=>{
         if(lock===true){
            if(index===data.length-1){
              setResult(true);
              return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            option_array.map((option)=>{
              option.current.classList.remove("wrong");
              option.current.classList.remove("correct");
              return null;
            })
         }
    }
    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }
  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr></hr>
      {result ? (
      reviewMode ? (
        <>
          <h2>Review Answers</h2>
          {data.map((q, idx) => (
            <div key={idx} className="review-question">
              <h3>{idx + 1}. {q.question}</h3>
              <ul>
                <li className={q.ans === 1 ? "correct" : q.selected === 1 ? "wrong" : ""}>{q.option1}</li>
                <li className={q.ans === 2 ? "correct" : q.selected === 2 ? "wrong" : ""}>{q.option2}</li>
                <li className={q.ans === 3 ? "correct" : q.selected === 3 ? "wrong" : ""}>{q.option3}</li>
                <li className={q.ans === 4 ? "correct" : q.selected === 4 ? "wrong" : ""}>{q.option4}</li>
              </ul>
              <p><strong>Your answer:</strong> {q[`option${q.selected}`] || "Not Answered"}</p>
              <p><strong>Correct answer:</strong> {q[`option${q.ans}`]}</p>
              <hr />
            </div>
          ))}
          <button onClick={reset}>Play Again</button>
        </>
      ) : (
        <>
          <h2>You scored {score} out of {data.length}</h2>
          <button onClick={reset}>Reset</button>
          <button onClick={() => setReviewMode(true)}>Review Answers</button>
        </>
      )
    ) : (
      <>
        <h2>{index + 1}. {question.question}</h2>
        <ul>
          <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
          <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
          <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
          <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
        </ul>
        <button onClick={next}>Next</button>
        <div className='index'>{index + 1} of {data.length} questions</div>
      </>
    )}
      
    </div>
  ) 
}

export default Quiz
