import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate() 

    const [formvalue, setFormvalue] = useState({
        email: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        setErrorMessage('')

        try{
            const response = await axios.post("http://localhost:5000/api/login", formvalue)

            if(response.data.status === 1) {
                localStorage.setItem('token', response.data.token)
                navigate('/user-data')
            }
            else {
                alert(response.data.message)
            }
        } catch(error) {
            const status = error.response?.status
            const serverMessage = error.response?.data?.message
            setErrorMessage(
                typeof serverMessage === 'string'
                    ? serverMessage
                    : status
                        ? `Login failed (HTTP ${status}). Check the backend logs.`
                        : 'Unable to reach the login server. Check that it is running.'
            )
        }
    }

    return (
        <>
            <hr />

            <form onSubmit={handleSubmit} method="post">

                {errorMessage && <p role="alert">{errorMessage}</p>}

                <span>Email:</span>
                <input
                    type="email"
                    name="email"
                    onChange={(e) =>
                        setFormvalue({
                            ...formvalue,
                            email: e.target.value
                        })
                    }
                />
                <br />

                <span>Password:</span>
                <input
                    type="password"
                    name="password"
                    onChange={(e) =>
                        setFormvalue({
                            ...formvalue,
                            password: e.target.value
                        })
                    }
                />
                <br />

                <button type="submit">Submit</button>

            </form>
        </>
    )
}

export default Login;