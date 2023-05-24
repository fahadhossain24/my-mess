import React, { useState } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shired/Loading/Loading';

const Login = () => {
    const [signInWithEmailAndPassword, user, loading, loginError] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const location = useLocation();

    const navigate = useNavigate();

    let error;
    const from = location.state?.from?.pathname || '/';


    if (loginError || googleError) {
        error = loginError?.message || googleError?.message;
    }

    if (loading || googleLoading) {
        return <Loading></Loading>
    }

    if (user || googleUser) {
        navigate(from, {replace: true});
    }

    //email password login.....
    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        await signInWithEmailAndPassword(email, password);

    }

    // google login....

    const handleGoogleLogin = () => {
        signInWithGoogle()
    }

    return (
        <div>
            <h2 className='text-center text-3xl p-4'>Login</h2>
            <div className="form-control w-full lg:w-[50%]  mx-auto p-4 border-accent-focus">
                <form onSubmit={handleLogin}>
                    <label className="input-group input-group-vertical">
                        <input type="text" placeholder="Enter Email" name='email' className="input input-bordered border-accent rounded w-100" required />
                    </label>
                    <label className="input-group input-group-vertical mt-3">
                        <input type="Password" placeholder="Password" name='password' className="input input-bordered border-accent rounded w-100" required />
                    </label>
                    <p className='text-danger'>{error}</p>
                    <input className='btn btn-accent mt-3 w-100' type="submit" value="Login" />
                </form>
                <p className='mt-3'>Don't have any account? Please <Link to='/register' className='text-danger'>create an account</Link></p>
                <div className="w-100 mx-auto d-flex justify-center items-center mt-3">
                    <span className='bg-accent w-40 h-[1px]'></span>
                    <span className='mx-[15px]'>Or</span>
                    <span className='bg-accent w-40 h-[1px]'></span>
                </div>
                <div className="d-flex flex-col lg:flex-row w-100 justify-center gap-2 mt-3">
                    <button onClick={handleGoogleLogin} className='btn btn-accent'>Continue With Google</button>
                    <button className='btn btn-accent'>Continue With Facebook</button>
                </div>
            </div>
        </div>
    );
};

export default Login;