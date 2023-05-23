import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shired/Loading/Loading';

const AddAsMember = () => {
    const [memberImage, setMemberImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const handleAddAsMember = (event) => {
        setIsLoading(true);
        event.preventDefault();
        const stroageKey = '4b5472fce12747e20b36dc45deec2313';
        const formData = new FormData();
        formData.append('image', memberImage);
        fetch(`https://api.imgbb.com/1/upload?key=${stroageKey}`, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const requestedMemberInformation = {
                        messName: event.target.messName.value,
                        messId: event.target.id.value,
                        name: event.target.name.value,
                        phone: event.target.phone.value,
                        email: event.target.email.value,
                        nidNumber: event.target.nidNumber.value,
                        status: event.target.status.value,
                        address: event.target.address.value,
                        parentsPhone: event.target.parentsPhone.value,
                        roomCatagory: event.target.roomCatagory.value,
                        image: data?.data?.url,
                    }
                    // send requested member information to database by server
                    const url = `http://localhost:5000//requestedMember/${requestedMemberInformation.email}`
                    fetch(url, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(requestedMemberInformation),
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.upsertedId != null) {
                                setIsLoading(false);
                                toast.success(`${requestedMemberInformation.email} request successfully sended. Please wait`);
                                navigate('/home');
                            } else {
                                setIsLoading(false);
                                toast.success(`${requestedMemberInformation.email} request successfully updated. Please wait`);
                                navigate('/home');
                            }
                        })
                    event.target.reset()
                }
            })
    }

    const handleImageChange = (event) => {
        setMemberImage(event.target.files[0])
    }
    return (
        <>{((isLoading) && (<Loading></Loading>)) || ((!isLoading) && (<div className='container'>
            <h2 className='text-center text-3xl font-bold mt-3 text-secondary'>Member <span className='text-accent'>Request</span></h2>
            <div className="form-control w-50 mx-auto p-4 border-accent-focus">
                <form onSubmit={handleAddAsMember}>
                    <input type="text" placeholder="Mess Name" name='messName' className="input input-bordered border-accent rounded w-100" required />
                    <input type="text" placeholder="Mess Id" name='id' className="input input-bordered border-accent rounded w-100 mt-3" required />
                    <input type="text" placeholder="Your Name" name='name' className="input input-bordered border-accent rounded w-100 mt-3" required />
                    <input type="text" placeholder="Phone Number" name='phone' className="input input-bordered border-accent rounded w-100 mt-3" required />
                    <input type="email" placeholder="Email Address" name='email' className="input input-bordered border-accent border-dotted rounded w-100 mt-3" style={{ background: '#eee', borderColor: 'cyan' }} value={user?.email} disabled required />
                    <input type="text" placeholder="NID Number" name='nidNumber' className="input input-bordered border-accent rounded w-100 mt-3" required />
                    <input type="text" placeholder="Status" name='status' className="input input-bordered border-accent rounded w-100  mt-3" required />
                    <input type="text" placeholder="Address" name='address' className="input input-bordered border-accent rounded w-100  mt-3" required />
                    <input type="text" placeholder="Parents Phone" name='parentsPhone' className="input input-bordered border-accent rounded w-100  mt-3" required />
                    <select name="roomCatagory" className="input input-bordered border-accent rounded w-100  mt-3" id="" required>
                        <option value="">Select Room Catagory</option>
                        <option value="Hign Clss">High class</option>
                        <option value="Mid Class">Mid class</option>
                        <option value="Low Class">Low class</option>
                    </select><br />
                    <label htmlFor="memberImage" className='mt-2'>Upload Your Image</label><br />
                    <input type="file" onChange={handleImageChange} name="memberImage" className='mt-1' id="" required />
                    <input className='btn btn-accent mt-3 w-100 capitalize ' type="submit" value="Send Request" />
                </form>
            </div>
        </div>))}</>
    );
};

export default AddAsMember;