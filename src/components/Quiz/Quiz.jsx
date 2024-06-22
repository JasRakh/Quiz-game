import './Quiz.scss'
import { data } from '../../assets/data.js'
import { useEffect, useState , useRef} from "react";
import { Button } from "@mui/material";

const Quiz = ({nickname}) => {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0)
    const [result, setResult] = useState(false)
    const [showLeaderboard, setShowLeaderboard] = useState(false)

    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(true)

    const timeHandler = useRef();
    const saveResult = () => {
        const results = JSON.parse(localStorage.getItem('results')) || [];
        const newResult = {
            nickname : nickname,
            score,
            time,
        }
        results.push(newResult);
        results.sort()
        localStorage.setItem('results', JSON.stringify(results));
    };
    const getResults = () => {
        return JSON.parse(localStorage.getItem('results'))
    }
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
                saveResult()
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
        setShowLeaderboard(false)
    }
    const toggleShowLeaderboard = () => {
        setShowLeaderboard(!showLeaderboard);
    }
    return (
        <div className="quiz">
            <h2 className="quiz__title roboto-bold">Quiz</h2>
            <hr />
            <p className="quiz__timer roboto-regular">Таймер: {format(time)}</p>
            {result ?
                <>
                    <h2 className="roboto-regular">Вы нашли {score}/{data.length} вопросов</h2>
                    <div className="quiz__btns">
                        <Button  variant="contained" type="submit" sx ={{
                            marginBottom: 3
                        }}  onClick={reset}>Заново</Button>
                        <Button variant="contained" type="submit" onClick={toggleShowLeaderboard}>{showLeaderboard ? 'Скрыть лидеров' : 'Показать лидеров'}</Button>
                    </div>
                    {showLeaderboard && (
                        <div className="quiz__leaderboard">
                            <h2 className="quiz__leaderboard-title roboto-bold">Лидеры</h2>
                            <table className="quiz__leaderboard-table">
                                <thead>
                                <tr>
                                    <th className="roboto-bold">Ник</th>
                                    <th className="roboto-bold">Счет</th>
                                    <th className="roboto-bold">Время</th>
                                </tr>
                                </thead>
                                <tbody>
                                {getResults().sort((a, b) => (b.score / b.time) - (a.score / a.time)).map((result, index) => (
                                    <tr key={index}>
                                        <td className="roboto-regular">{result.nickname}</td>
                                        <td className="roboto-regular">{result.score}</td>
                                        <td className="roboto-regular">{format(result.time)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </> :
                <>
                    <h3 className="quiz__question roboto-regular">{index + 1}. {question.question}</h3>
                    {question.src && <img src={question.src} alt={`Question ${index + 1}`} className="quiz__image"/>}
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
