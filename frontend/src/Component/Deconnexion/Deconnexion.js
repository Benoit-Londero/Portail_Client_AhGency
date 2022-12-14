import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Deconnexion(props) {

    const navigate = useNavigate();
    const resetLogin = props.resetLogin;

    useEffect(() => {
        localStorage.clear();
        resetLogin();
        navigate('/')

    }, [navigate,resetLogin])

  return (
    <div></div>
  )
}
