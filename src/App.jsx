import './App.scss'
import Auth from "./components/Auth/index.js";
import {useState} from "react";
import Quiz from "./components/Quiz/index.js";
function App() {
    const [nickname, setNickname] = useState('');
    const [showQuiz, setShowQuiz] = useState(false);
    const onAuth = (nick) =>{
        setNickname(nick);
        setShowQuiz(true);
    }
  return (
    <div>
        {showQuiz ? <Quiz nickname={nickname}/> : <Auth onAuth={onAuth}/>}
    </div>
  )
}

export default App
