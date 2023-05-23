import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shired/Loading/Loading';

const AddMember = () => {
    const navigate = useNavigate();
    const [currentUser] = useAuthState(auth);
    const [messInfo, setMessInfo] = useState({});
    const [paymentStatus, setPaymentStatus] = useState('');
    const [memberRole, setMemberRole] = useState('');
    const [memberImage, setMemberImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);



    const handleAddMember = (event) => {
        setIsLoading(true);
        event.preventDefault();
        //upload image file to imagebb and getting image internet url for send image to database by server.
        const stroageKey = '4b5472fce12747e20b36dc45deec2313';
        const formData = new FormData();
        formData.append('image', memberImage);
        fetch(`https://api.imgbb.com/1/upload?key=${stroageKey}`, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success || data.status_code === 400) {
                    const newMemberInfo = {
                        name: event.target.name.value,
                        phoneNumber: event.target.phoneNumber.value,
                        emailAddress: event.target.memberEmail.value,
                        nidNumber: event.target.nidNumber.value,
                        houseRant: event.target.houseRant.value,
                        othersCost: event.target.othersCost.value,
                        developmentCharge: event.target.developmentCharge.value,
                        paymentStatus: paymentStatus,
                        memberRole: memberRole,
                        memberImageUrl: event.target.imageUrl.value,
                        memberImage: data?.data?.url,
                    }
                    // send newMemberInfo to database by server
                    const url = `http://localhost:5000//addMessMember/${newMemberInfo.emailAddress}`
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
                                    toast.success(`${newMemberInfo.name} added successfully`);
                                } else {
                                    setIsLoading(false);
                                    toast.success(`${newMemberInfo.name} updated successfully`);
                                }
                            }
                            event.target.reset();
                        })
                }
            })
    }

    const onImageChange = (e) => {
        setMemberImage(e.target.files[0]);
    }

    // load mess information................
    useEffect(() => {
        fetch(`http://localhost:5000//mess/${currentUser.email}`)
            .then(res => res.json())
            .then(MessData => {
                setMessInfo(MessData);
            })
    }, [])

    return (
        <>
            {((isLoading) && (<Loading></Loading>)) || ((!isLoading) && (<div className='container'>
                <h2 className='text-center text-xl font-bold mt-3 mb-2 text-secondary'>Add or Update <span className='text-accent'>{messInfo.name}</span> Member</h2>
                <div className="form-control w-50 mx-auto p-4 border-accent-focus">
                    <form onSubmit={handleAddMember}>
                        <input type="text" placeholder="Member Name" name='name' className="input input-bordered border-accent rounded w-100" required />
                        <input type="text" placeholder="Phone Number" name='phoneNumber' className="input input-bordered border-accent rounded w-100 mt-3" required />
                        <input type="email" placeholder="Email Address" name='memberEmail' className="input input-bordered border-accent rounded w-100 mt-3" required />
                        <input type="text" placeholder="NID Number" name='nidNumber' className="input input-bordered border-accent rounded w-100 mt-3" required />
                        <input type="text" placeholder="House Rant" name='houseRant' className="input input-bordered border-accent rounded w-100 mt-3" required />
                        <input type="text" placeholder="Others Cost" name='othersCost' className="input input-bordered border-accent rounded w-100 mt-3" required />
                        <input type="text" placeholder="Development Charge" name='developmentCharge' className="input input-bordered border-accent rounded w-100 mt-3" required />
                        <select onChange={(event) => { setPaymentStatus(event.target.value) }} name="paymentStatus" className="input input-bordered border-accent rounded w-100 mt-3" id="" required>
                            <option value="">Select Payment Status</option>
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                        </select>
                        <select onChange={(event) => { setMemberRole(event.target.value) }} name="memberRole" className="input input-bordered border-accent rounded w-100 mt-3" id="" required>
                            <option value="">Select Member Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Manager">Manager</option>
                            <option value="Genarel Member">Genarel Member</option>
                        </select>
                        <input className='input input-bordered border-accent rounded w-100 mt-3' type="text" placeholder='Member image url' name="imageUrl" id="" /><p className='text-center pt-2'>Or</p>
                        <label htmlFor="memberImage" className='mt-2'>Upload Image</label>
                        <input type="file" onChange={onImageChange} name="memberImage" id="memberImage" className="input input-bordered border-accent rounded w-100 p-2 " />
                        <input className='btn btn-accent mt-3 w-100 capitalize ' type="submit" value="Add" />
                    </form>
                </div>
            </div>))}
        </>
    );
};

export default AddMember;