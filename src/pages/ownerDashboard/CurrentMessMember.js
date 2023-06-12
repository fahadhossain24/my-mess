import React, { useEffect, useState } from 'react';
import DisplayCurrentMember from './DisplayCurrentMember';
import ModalOfcurrentMemberDetails from './ModalOfcurrentMemberDetails';
import UpdateCurrentMemberModal from './UpdateCurrentMemberModal';
import Loading from '../Shired/Loading/Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const CurrentMessMember = () => {
    const [currentMembers, setCurrentMembers] = useState([]);
    const [details, setDetails] = useState({});

    const [user] = useAuthState(auth);
    const [messId, setMessId] = useState('')

    useEffect(() => {
        fetch(`https://my-mess-server.vercel.app/allMessInfo/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setMessId(data._id);
            })
    }, [user])


    useEffect(() => {
        fetch(`https://my-mess-server.vercel.app/messMember/${messId}`)
            .then(res => res.json())
            .then(data => {
                setCurrentMembers(data);
            })
    }, [currentMembers, messId])

    const hanldeDeleteCurrentMember = (memberEmail) => {
        const confirmation = window.confirm('Are You sure you want to delete this member?')
        if (confirmation) {
            const url = `https://my-mess-server.vercel.app/messMember/${memberEmail}`
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        const existingMemebers = currentMembers.filter(currentMember => currentMember.email !== memberEmail);
                        if (existingMemebers) {
                            setCurrentMembers(existingMemebers);
                        }
                    }
                })
        }
    }
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date();
    const monthName = months[date.getMonth()]

    return (
        <div>
            <div className='text-xl pb-2 font-bold flex justify-between'>
                <h2><span className='text-accent'>Current total members: </span>{currentMembers?.length}</h2>
                <h2> <span className='text-accent'>Current Month:</span> {monthName}</h2>
            </div>

            <div className='flex flex-wrap gap-2'>
                {
                    currentMembers?.map(currentMember => <DisplayCurrentMember
                        key={currentMember._id}
                        currentMember={currentMember}
                        setDetails={setDetails}
                        hanldeDeleteCurrentMember={hanldeDeleteCurrentMember}
                    ></DisplayCurrentMember>)
                }
            </div>
            {details && <ModalOfcurrentMemberDetails key={details._id} details={details}></ModalOfcurrentMemberDetails>}
            {details && <UpdateCurrentMemberModal details={details}></UpdateCurrentMemberModal>}

        </div>
    );
};

export default CurrentMessMember;