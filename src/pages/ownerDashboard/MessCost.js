import React, { useEffect, useState } from 'react';
import Loading from '../Shired/Loading/Loading';
import DisplayMessCost from './DisplayMessCost';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';


const MessCost = () => {
    const [messMembers, setMessMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [user] = useAuthState(auth);
    const [messId, setMessId] = useState('')

    useEffect(() => {
        fetch(`http://localhost:5000/allMessInfo/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setMessId(data._id);
            })
    }, [user])

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:5000/messMember/${messId}`)
            .then(res => res.json())
            .then(data => {
                setMessMembers(data);
                setIsLoading(false);
            })
    }, [messId])

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date();
    const monthName = months[date.getMonth()]

    return (
        <>{
            (isLoading && <Loading></Loading>) || (!isLoading && <div>
                <span className='mx-auto mt-3 w-[150px] h-[3px] bg-accent block'></span>
                <h2 className='text-center font-bold'>Cost Details: <span className='text-accent'></span> {monthName}</h2>
                <span className='mx-auto mt-1 w-[150px] h-[3px] bg-accent block'></span>
                <div className="overflow-x-auto">
                    <table className="table table-compact w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>R/C</th>
                                <th>H/R</th>
                                <th>Others</th>
                                <th>Uplift</th>
                                <th>TWU</th>
                                <th>TWOU</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                messMembers.map(messMember => <DisplayMessCost key={messMember._id} messMember={messMember}></DisplayMessCost>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>)
        }</>
    );
};

export default MessCost;