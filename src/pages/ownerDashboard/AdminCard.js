import React, { useEffect, useState } from 'react';
import Loading from '../Shired/Loading/Loading';
import { toast } from 'react-toastify';

const AdminCard = () => {
    const [messMembers, setMessMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputEmail, setInputEmail] = useState('');
    const [inputRole, setInputRole] = useState('');
    const [memberByInputEmail, setMemberByInputEmail] = useState({});
    const { name, emailAddress, phoneNumber, nidNumber, houseRant, othersCost, developmentCharge, paymentStatus, memberImage, roomCatagory } = memberByInputEmail;
    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:5000//messMember')
            .then(res => res.json())
            .then(data => {
                setMessMembers(data)
                setIsLoading(false)
            })
    }, [])
    useEffect(() => {
        setIsLoading(true);
        if (inputEmail) {
            fetch(`http://localhost:5000//messMember/${inputEmail}`)
                .then(res => res.json())
                .then(data => {
                    setMemberByInputEmail(data);
                    setIsLoading(false);
                })
        }
    }, [inputEmail])
    // console.log(memberByInputEmail)
    const handleTakeEmail = e => {
        setInputEmail(e.target.value);
    }
    const handleTakeRole = e => {
        setInputRole(e.target.value);
    }

    const handleUpdateRole = () => {
        // console.log(inputRole, inputEmail, 'role updated')
        // console.log('update', name)
        const updateMember = {
            name: name,
            emailAddress: emailAddress,
            memberImage: memberImage,
            memberRole: inputRole,
            nidNumber: nidNumber,
            phoneNumber: phoneNumber,
            roomCatagory: roomCatagory,
            houseRant: houseRant,
            othersCost: othersCost,
            developmentCharge: developmentCharge,
            paymentStatus: paymentStatus,
        }
        // update member information .............
        setIsLoading(true);
        if (inputEmail) {
            const url = `http://localhost:5000//addMessMember/${inputEmail}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updateMember),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.upsertedId === null) {
                        toast.success('Update successfull');
                    } else {
                        toast.error('Something wrong')
                    }
                    setIsLoading(false);
                })
        }
    }

    return (
        <>{
            (isLoading && <Loading></Loading>) || (!isLoading && <div>
                {/* update role by email */}
                <div className=''>
                    <h2 className='my-2 font-bold'>Update Member Role </h2>
                    <div className="w-100 lg:flex mx-auto w-full lg:gap-2">
                        <select className="select select-info w-full max-w-xs" onChange={handleTakeRole}>
                            <option disabled selected>Select a role</option>
                            <option value='Admin'>Admin</option>
                            <option value='Manager'>Manager</option>
                            <option value='Genarel Member'>Genarel Member</option>
                        </select>
                        <select className="select select-info w-full max-w-xs" onChange={handleTakeEmail}>
                            <option disabled selected>Select email address for change role</option>
                            {
                                messMembers.map(messMember => <option value={messMember?.emailAddress} key={messMember?._id}>{messMember?.emailAddress}</option>)
                            }
                        </select>
                        <button onClick={handleUpdateRole} className='btn btn-accent'>Update</button>
                    </div>
                </div>
                {/* mess description */}
                <div className='w-100 mt-2'>
                    <h2 className='mb-2 font-bold'>Mess Description</h2>
                    <textarea placeholder='Write description like rules...' id="w3review" name="w3review" rows="4" cols="20" className='w-full textarea-bordered textarea-accent'></textarea>
                </div>
            </div>)
        }</>
    );
};

export default AdminCard;