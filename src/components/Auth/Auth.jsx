import React, { useState } from 'react';
import { Button } from '@mui/material';
import './Auth.scss';
import Quiz from "../Quiz/index.js";

const Auth = () => {
    const [nickname, setNickname] = useState('');
    const [showQuiz, setShowQuiz] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (nickname) {
            const existingNicknames = JSON.parse(localStorage.getItem('nicknames')) || [];
            existingNicknames.push(nickname);
            localStorage.setItem('nicknames', JSON.stringify(existingNicknames));
            setShowQuiz(true);
        }else{
            alert("You have to enter your name!!!!")
        }
    }

    if (showQuiz) {
        return <Quiz />;
    }

    return (
        <div className="auth">
            <form className="auth__form" onSubmit={handleSubmit}>
                <h2 className="auth__title roboto-bold">Enter your nickname:</h2>
                <input
                    className="roboto-regular auth__input"
                    type="text"
                    value={nickname}
                    placeholder="Nickname:"
                    onChange={(e) => setNickname(e.target.value)}
                />
                <Button
                    variant="contained"
                    sx={{ padding: '10px 30px' }}
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default Auth;
