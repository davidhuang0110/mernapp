import { useState, useEffect } from "react"
// useSelector is to select something from the state
// useDispatch is to dispatch function like register, async thunk function or reset function in reducer
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'         // for isLoading

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email:'',
        password:'',
        password2:''
    })

    const{name, email, password, password2} = formData

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

    // let the textbox(name, email, password, password2) to change
    const onChange =(e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    // this is where we want to dispatch our register
    const onSubmit =(e) => {
        e.preventDefault()

        // check the password match or not
        if(password !== password2) {
            toast.error('Passwords do not match')
        }
        else {
            const userData = {
                name,
                email,
                password,
            }

            // passing the register function(in authSlice.js)
            dispatch(register(userData))
        }
    }

    if(isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            name="name" 
                            value={name}
                            placeholder="Enter your name"
                            onChange={onChange}/>
                    </div>
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
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password2" 
                            name="password2" 
                            value={password2}
                            placeholder="Confirm your password"
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

export default Register