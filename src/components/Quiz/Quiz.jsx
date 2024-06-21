import './Quiz.scss'
import { data } from '../../assets/data.js'
import { useEffect, useState , useRef} from "react";
import { Button } from "@mui/material";

const Quiz = () => {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0)
    let [result, setResult] = useState(false)

    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(true)

    const timeHandler = useRef();

    useEffect(() => {
        if(running){
            timeHandler.current = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timeHandler.current);
    }, [running]);

    const format = (time) => {
        let minutes = Math.floor(time / 60 % 60);
        let seconds = Math.floor(time % 60);

        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds
        return `${minutes}:${seconds}`
    }

    useEffect(() => {
        setQuestion(data[index]);
        setLock(false);
    }, [index]);

    const handleNext = () => {
        if(lock === true){
            if (index < data.length - 1) {
                setIndex(index + 1);
                resetOptions();
            }else{
                setResult(true)
                setRunning(!running)
            }
        }else{
            alert("Вы должны выбрать ответ!!!")
        }
    };

    const checkAnswer = (e, ans) => {
        if (!lock) {
            if (question.answer === ans) {
                e.target.classList.add('correct');
                setScore((prevScore) => prevScore + 1);
            } else {
                e.target.classList.add('wrong');
            }
            setLock(true);
        }
    };

    const resetOptions = () => {
        const options = document.querySelectorAll('.quiz__option-item');
        options.forEach(option => {
            option.classList.remove('correct', 'wrong');
        });
    };

    const reset = () => {
        setIndex(0)
        setQuestion(data[index])
        setResult(false)
        setLock(false)
        setScore(0)
        setTime(0)
        setRunning(true)
    }
    return (
        <div className="quiz">
            <h2 className="quiz__title roboto-bold">Quiz</h2>
            <hr />
            <p className="quiz__timer roboto-regular">Таймер: {format(time)}</p>
            {result ?
                <>
                    <h2 className="roboto-regular">Вы нашли {score} ответа из {data.length} вопросов</h2>
                    <Button variant="contained" type="submit" onClick={reset}>Заново</Button>
                </> :
                <>
                    <h3 className="quiz__question roboto-regular">{index + 1}. {question.question}</h3>
                    <ul className="quiz__option">
                        {question.option.map((item, i) => (
                            <li className="quiz__option-item roboto-regular"
                                onClick={(e) => checkAnswer(e, item)}
                                key={i}>{item}</li>
                        ))}
                    </ul>
                    <Button variant="contained" type="submit" onClick={handleNext}>Следующий</Button>
                    <div className="index roboto-regular">{index + 1} из {data.length}</div>
                </>
            }

        </div>
    );
}

export default Quiz;
