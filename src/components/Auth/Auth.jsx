import {  useRef } from 'react';
import { Button } from '@mui/material';
import './Auth.scss';
import Quiz from "../Quiz/index.js";

const Auth = ({onAuth}) => {
    const nicknameInput= useRef();
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(nicknameInput.current.value){
            onAuth(nicknameInput.current.value)
        }else{
            alert("Введите ник!!!!")
        }
    }
    return (
        <div className="auth">
            <form className="auth__form" onSubmit={handleSubmit}>
                <h2 className="auth__title roboto-bold">Введите свой ник:</h2>
                <input
                    className="roboto-regular auth__input"
                    type="text"
                    placeholder="Ник:"
                    ref={nicknameInput}
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
