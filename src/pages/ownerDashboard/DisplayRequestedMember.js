import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ModalForRequestedMemberDetails from './ModalForRequestedMemberDetails';

const DisplayRequestedMember = ({ requestedMember, setDetails, handleDeleteRequest }) => {

    const { name, messId, address, email, phone, image, parentsPhone, status, nidNumber, roomCatagory, _id } = requestedMember;
    const [isLoading, setIsLoading] = useState(false);
    const [requestedMembers, setRequestedMembers] = useState([]);

    const newMemberInfo = {
        name: name,
        phoneNumber: phone,
        emailAddress: email,
        nidNumber: nidNumber,
        // houseRant: ,
        // othersCost: ,
        // developmentCharge: ,
        // paymentStatus:,
        // memberRole: ,
        memberImage: image,
        roomCatagory: roomCatagory,
    }

    useEffect(() => {
        fetch('http://localhost:5000/requestedMember')
            .then(res => res.json())
            .then(data => {
                setRequestedMembers(data);
            })
    }, [requestedMembers])
    const deleteMemberAfterAdd = (email) => {
        const confirmedDelete = window.confirm('Are you sure you want to Add this Person?')
        if (confirmedDelete) {
            const url = `http://localhost:5000/requestedMember/${email}`
            fetch(url, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        const axistingMember = requestedMembers.filter(requestedMember => requestedMember.email !== email);
                        setRequestedMembers(axistingMember);
                    }
                })
        }
    }

    const handleRequestedMemberAdd = () => {
        setIsLoading(true);
        console.log(newMemberInfo.emailAddress)
        const url = `http://localhost:5000/addMessMember/${newMemberInfo.emailAddress}`
        fetch(url, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newMemberInfo),
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    setIsLoading(false);
                    toast.warning(data.message)
                } else {
                    if (data.upsertedId != null) {
                        setIsLoading(false);
                        deleteMemberAfterAdd(newMemberInfo.emailAddress);
                        toast.success(`${newMemberInfo.name} added successfully`);
                    } else {
                        setIsLoading(false);
                        deleteMemberAfterAdd(newMemberInfo.emailAddress);
                        toast.success(`${newMemberInfo.name} updated successfully`);
                    }
                }
            })
    }

    return (
        <div>
            {/* <h1>{name}</h1> */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <tbody>
                        <tr>
                            <td className='w-[320px]'>
                                <div className=" flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{name}</div>
                                        <div className="text-sm opacity-50">{address}</div>
                                    </div>
                                </div>
                            </td>

                            <td><label htmlFor="my-modal-6" onClick={() => setDetails(requestedMember)} className="btn btn-accent btn-xs">Details</label></td>
                            <td><button onClick={handleRequestedMemberAdd} className='btn bg-green-700 hover:bg-green-600 btn-xs'>Add</button></td>
                            <th><button onClick={() => handleDeleteRequest(requestedMember.email)} className="btn bg-amber-600 text-gray-800 hover:bg-amber-500 btn-xs">Remove</button></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DisplayRequestedMember;