import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shired/Loading/Loading';
import DashBoardActivity from './DashBoardActivity';

const OwnerDashboard = () => {
    const [currentUser] = useAuthState(auth);
    const [messInfo, setMessInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [messIdFromUser, setMessIdFromUser] = useState('');
    const [messMembers, setMessMembers] = useState([]);
    const [findMemberShip, setFindMemberShip] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true)
        fetch(`http://localhost:5000/mess/${currentUser?.email}`)
            .then(res => res.json())
            .then(data => {
                
                if (data._id) {
                    setMessInfo(data);
                    setIsLoading(false)
                    console.log(data);
                } else {
                    setMessInfo(data);
                    setIsLoading(false)

                }
            })
    }, [messIdFromUser])

    const handleCreateMess = (user) => {
        navigate('/createMess')
    }

    const handleLoginIntoAMess = async() => {
        const actualMember = await messMembers.find(messMember => messMember.messId === messIdFromUser);
        if(actualMember){
            setFindMemberShip(actualMember);
        }
    }
    useEffect(() => {
        fetch('http://localhost:5000/messMember')
        .then(res => res.json())
        .then(data => {
            setMessMembers(data);
        })
    }, [])
    return (
        <div className='container'>
            {
                ((isLoading) && (<Loading></Loading>)) || ((!isLoading) && (messInfo._id || findMemberShip ? <DashBoardActivity key={messInfo._id} messInfo={messInfo} actualMember={findMemberShip}></DashBoardActivity> : <>
                    <div className='text-center mt-4'>
                        <h2 className='text-error text-2xl'>{messInfo.message}</h2>
                        <p className=''>You should have access it after getting mess wonership or membership</p>
                        <div className="mt-3">
                            <button onClick={handleCreateMess} className='btn btn-accent me-4 text-2xl'>Create a mess</button>
                            <label htmlFor="login-modal"  className="btn btn-accent me-4 text-2xl">Login into a mess</label>
                        </div>
                    </div>
                </>))
            }
            <input type="checkbox" id="login-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Login into your mess</h3>
                    <input type="text" name="messId" id="" onChange={(e) => setMessIdFromUser(e.target.value)} placeholder='Mess id' className='input input-bordered input-accent rounded w-100 mt-3' />
                    <div className="modal-action">
                        <label htmlFor="login-modal" onClick={handleLoginIntoAMess} className="btn btn-accent me-4">Login</label>
                        <label htmlFor="login-modal" className="btn btn-accent me-4">Cencel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerDashboard;