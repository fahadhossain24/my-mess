import React, { useEffect, useState } from 'react';
import DisplayCurrentMember from './DisplayCurrentMember';
import ModalOfcurrentMemberDetails from './ModalOfcurrentMemberDetails';

const CurrentMessMember = () => {
    const [currentMembers, setCurrentMembers] = useState();
    const [details, setDetails] = useState({});

    useEffect(() => {
        fetch('http://localhost:5000/messMember')
        .then(res => res.json())
        .then(data => setCurrentMembers(data))
    },[])
    return (
        <div>
            <h2>Current total members {currentMembers?.length}</h2>
            <div className='flex flex-wrap gap-2'>
            {
                currentMembers?.map(currentMember => <DisplayCurrentMember key={currentMember._id} currentMember = {currentMember} setDetails = {setDetails}></DisplayCurrentMember>)
            }
            </div>
            {details && <ModalOfcurrentMemberDetails key={details._id} details={details}></ModalOfcurrentMemberDetails>}
        </div>
    );
};

export default CurrentMessMember;