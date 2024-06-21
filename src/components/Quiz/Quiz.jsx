import Question from "../Question/index.js";
import './Quiz.scss'
const questions = [
    {
        question: "How many time zones are there in Russia?",
        option: ["10","11","12","13"],
        answer: "11",
    },
    {
        question: "What’s the national flower of Japan?",
        option: ["Japanese iris","Chrysanthemum","Japanese hydrangea","Cherry blossom"],
        answer: "Cherry blossom"
    },
    {
        question: "What’s the national animal of Australia?",
        option: ["Red Kangaroo","Dingos","Wallabies","Koala"],
        answer: "Red Kangaroo"
    },
    {
        question: "How many days does it take for the Earth to orbit the Sun?",
        option: ["123","366","365","360"],
        answer: "365"
    },
    {
        question: "What’s the smallest country in the world?",
        option: ["The Vatican","Russia","Canada","Japan"],
        answer: "The Vatican",
    },
    {
        question: "Name the longest river in the world?s",
        option: ["Yangtze River","Mississippi River","Amazon River","The Nile"],
        answer: "The Nile"
    },
    {
        question: "How many stripes are there on the US flag?",
        option: ["12","13","14","15"],
        answer: "13"
    },
]
const Quiz = () => {

    return(
        <div className="quiz">
            <h2 className="quiz__title roboto-bold">Quiz</h2>
            <p className="quiz__timer roboto-regular">Timer: 0</p>
        </div>
    )
}
export default Quiz