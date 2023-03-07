
import React, { useState } from 'react';
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shired/Loading/Loading';

const Register = () => {
    const [createUserWithEmailAndPassword, user, loading, loginError] = useCreateUserWithEmailAndPassword(auth, {sendEmailVerification: true});
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [err, setErr] = useState('');
    const [name, setName] = useState('');
    const [authUser, authUserLoading] = useAuthState(auth);
    const navigate = useNavigate();

    let error;


    if (loginError || googleError) {
        error = loginError?.message || googleError?.message;
    }

    if (loading || googleLoading || authUserLoading) {
        return <Loading></Loading>
    }

    if (user || googleUser) {
        navigate('/home');
    }
    if(authUser){
        authUser.displayName = name;
    }
   
    //email password login.....
    const handleRegister = async (e) => {
        e.preventDefault();
        setName(e.target.name.value);
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPasswrod.value;

        if (confirmPassword === password) {
            await createUserWithEmailAndPassword(email, password);
        } else {
            console.log('password not matched')
            setErr('Password not matched. Please check it');
        }

    }

    // google login....

    const handleGoogleLogin = () => {
        signInWithGoogle()
    }
    return (
        <div>
            <h2 className='text-center text-3xl p-4'>Register</h2>
            <div className="form-control w-50 mx-auto p-4 border-accent-focus">
                <form onSubmit={handleRegister}>
                    <label className="input-group input-group-vertical">
                        <input type="text" placeholder="Your Name" name='name' className="input input-bordered border-accent rounded w-100" required />
                    </label>
                    <label className="input-group input-group-vertical mt-3">
                        <input type="text" placeholder="Enter Email" name='email' className="input input-bordered border-accent rounded w-100" required />
                    </label>
                    <label className="input-group input-group-vertical mt-3">
                        <input type="Password" placeholder="Password" name='password' className="input input-bordered border-accent rounded w-100" required />
                    </label>
                    <label className="input-group input-group-vertical mt-3">
                        <input type="Password" placeholder="Confirm password" name='confirmPasswrod' className="input input-bordered border-accent rounded w-100" required />
                    </label>
                    <p className='text-danger'>{error || err}</p>
                    <input className='btn btn-accent mt-3 w-100' type="submit" value="Register" />
                </form>
                <p className='mt-3'>Already have an account? Please <Link to='/login' className='text-danger'>login</Link></p>
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

export default Register;