import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shired/Loading/Loading';
import DashBoardActivity from './DashBoardActivity';
import { toast } from 'react-toastify';

const OwnerDashboard = () => {
    const [currentUser] = useAuthState(auth);
    const [messInfo, setMessInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [messIdFromUser, setMessIdFromUser] = useState('');
    const [findedMess, setFindedMess] = useState({});
    const [errorMsg, setErrorMsg] = useState('');
    const [successLogin, setSuccessLogin] = useState(false);
    const [currentMember, setCurrentMember] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://my-mess-server.vercel.app/mess/${currentUser?.email}`)
            .then(res => res.json())
            .then(data => {

                if (data._id) {
                    setMessInfo(data);
                    setIsLoading(false)
                } else {
                    setMessInfo(data);
                    setIsLoading(false)
                }
            })
    }, [])


    useEffect(() => {
        setIsLoading(true)
        fetch(`https://my-mess-server.vercel.app/messById/${messIdFromUser}`)
            .then(res => res.json())
            .then(data => {
                if (data._id) {
                    setFindedMess(data);
                    setIsLoading(false);
                } else {
                    setErrorMsg(data.message);
                    setIsLoading(false);
                }
            })
    }, [messIdFromUser])

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://my-mess-server.vercel.app/messMemberbyEmail/${currentUser.email}`)
            .then(res => res.json())
            .then(data => {
                setCurrentMember(data);
                setIsLoading(false);
            })
    }, [])
    const handleCreateMess = (user) => {
        navigate('/createMess')
    }

    const handleLoginIntoAMess = () => {
        if (findedMess) {
            if (findedMess?._id === messIdFromUser) {
                if (currentMember?.emailAddress === currentUser?.email) {
                    setSuccessLogin(true);
                    toast.success('Successfully Login');
                } else {
                    toast.error('Sorry, You have no membership on this mess.');
                }
            } else {
                setSuccessLogin(false);
                toast.warning(errorMsg)
            }
        }
    }

    return (
        <div className='container'>
            {
                ((isLoading) && (<Loading></Loading>)) || ((!isLoading) && (messInfo?._id || successLogin ? <DashBoardActivity key={messInfo?._id} messInfo={messInfo} findedMess={findedMess}></DashBoardActivity> : <>
                    <div className='text-center mt-4'>
                        <h2 className='text-error text-2xl'>{messInfo.message}</h2>
                        <p className=''>You should have access it after getting mess wonership or membership</p>
                        <div className="mt-3 ">
                            <button onClick={handleCreateMess} className='btn btn-accent me-4 text-2xl ml-2 mb-1'>Create a mess</button>
                            <label htmlFor="login-modal" className="btn btn-accent me-4 text-2xl">Login into a mess</label>
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
                        {!isLoading && <label htmlFor="login-modal" onClick={handleLoginIntoAMess} className="btn btn-accent me-4">Login</label>}
                        <label htmlFor="login-modal" className="btn btn-accent me-4">Cencel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerDashboard;