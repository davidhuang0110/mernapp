import { useState, useEffect } from "react"
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'         // for isLoading
import { reset } from '../features/goals/goalSlice'

function Login() {
    const [formData, setFormData] = useState({
        email:'',
        password:'',
    })

    const{email, password} = formData

    const navigate = useNavigate()
    // used to dispatch the function
    const dispatch = useDispatch()

    // select what we want from the state
    const {user, isLoading, isError, isSuccess, message} = useSelector( 
        (state) => state.auth
    )

    useEffect(() => {
        // check for an error
        if(isError) {
            toast.error(message)
        }

        // "user" is mean if registered or logged in, then that user will include token or something
        // and redirected
        if(isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange =(e) => {
        // "setFormData" function updates the state formData with the new input value.
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit =(e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    if(isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login and start</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            name="email" 
                            value={email}
                            placeholder="Enter your email"
                            onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            name="password" 
                            value={password}
                            placeholder="Enter your password"
                            onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login