import React from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../Loading/Loading';
import './Header.css'

const Header = () => {
    const [user, loading] = useAuthState(auth);
    const [signOut, signOutLoading] = useSignOut(auth);
    const navigate = useNavigate();

    if(loading || signOutLoading){
        return <Loading></Loading>;
    }

    const handleSignOut = async() => {
        const success = await signOut();
        if(success){
            navigate('/login');
        }
    }

    const menuItem = <>
        <li><Link to='/home'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
        {
            user ? <li onClick={handleSignOut}><Link to=''>Signout</Link></li> : <li><Link to='/login'>Login</Link></li>
        }
    </>

    return (
        <div className='bg-accent sticky top-0'>
            <div className="navbar container text-base-300 ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItem}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost normal-case text-xl">MyMess</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {menuItem}
                    </ul>
                </div>
                
            </div>
        </div>
    );
};

export default Header;