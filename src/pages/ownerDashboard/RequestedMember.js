import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DisplayRequestedMember from './DisplayRequestedMember';
import ModalForRequestedMemberDetails from './ModalForRequestedMemberDetails';
import Loading from '../Shired/Loading/Loading';

const RequestedMember = () => {
    const [requestedMembers, setRequestedMembers] = useState([]);
    const [details, setDetails] = useState({})

    useEffect(() => {
        fetch('https://my-mess-server.vercel.app/requestedMember')
            .then(res => res.json())
            .then(data => {
                setRequestedMembers(data);
            })
    }, [requestedMembers])
    const handleDeleteRequest = (email) => {
        const confirmedDelete = window.confirm('Are you sure you want to delete this request?')
        if (confirmedDelete) {
            const url = `https://my-mess-server.vercel.app/requestedMember/${email}`
            fetch(url, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        const axistingMember = requestedMembers.filter(requestedMember => requestedMember.email !== email);
                        setRequestedMembers(axistingMember);
                        toast('Delete successfull');
                    }
                })
        }
    }
    return (
        <div>
            <h2 className='text-center font-bold'>Total requested member {requestedMembers.length}</h2>
            {
                requestedMembers.map(requestedMember => <DisplayRequestedMember key={requestedMember._id} requestedMember={requestedMember} setDetails={setDetails} handleDeleteRequest={handleDeleteRequest}></DisplayRequestedMember>)
            }
            {details && <ModalForRequestedMemberDetails key={details._id} details={details}></ModalForRequestedMemberDetails>}
        </div>

    );
};

export default RequestedMember;