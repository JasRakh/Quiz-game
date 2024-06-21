import { useState } from 'react';
import { Button } from '@mui/material';
import './Auth.scss';
import Quiz from "../Quiz/index.js";

const Auth = () => {
    const [nickname, setNickname] = useState('');
    const [showQuiz, setShowQuiz] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (nickname) {
            const nicknames = JSON.parse(localStorage.getItem('nicknames')) || [];
            nicknames.push(nickname);
            localStorage.setItem('nicknames', JSON.stringify(nicknames));
            setShowQuiz(true);
        }else{
            alert("Вы должны ввести свой ник!!!")
        }
    }

    if (showQuiz) {
        return <Quiz />;
    }

    return (
        <div className="auth">
            <form className="auth__form" onSubmit={handleSubmit}>
                <h2 className="auth__title roboto-bold">Введите свой ник:</h2>
                <input
                    className="roboto-regular auth__input"
                    type="text"
                    value={nickname}
                    placeholder="Ник:"
                    onChange={(e) => setNickname(e.target.value)}
                />
                <Button
                    variant="contained"
                    sx={{ padding: '10px 30px' }}
                    type="submit"
                >
                    Отправить
                </Button>
            </form>
        </div>
    );
};

export default Auth;
