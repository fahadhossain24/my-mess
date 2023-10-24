import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const MealCost = () => {
    const [currentUser] = useAuthState(auth);
    const [totalCost, setTotalCost] = useState('');
    const [totalMeal, setTotalMeal] = useState('');
    const [mealRate, setMealRate] = useState('');
    const [mealPerPerson, setMealPerPerson] = useState('');
    const [depositPerPerson, setDepositPerPerson] = useState('');
    const [mealCostPerPerson, setMealCostPerPerson] = useState('');
    const [mealCostList, setMealCostList] = useState([])
    const [given, setGiven] = useState('');
    const [take, setTake] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messId, setMessId] = useState('')
    const [allMembers, setAllMembers] = useState([])
    const [selectedMember, setSelectedMember] = useState('');
    const [ishowResult, setIsShowResult] = useState(false);




    useEffect(() => {
        setIsLoading(true)
        fetch(`http://localhost:5000/mess/${currentUser?.email}`)
            .then(res => res.json())
            .then(data => {
                if (data._id) {
                    setMessId(data._id);
                    setIsLoading(false)
                } else {
                    setMessId(data);
                    setIsLoading(false)
                }
            })
    }, [])

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:5000/messMember/${messId}`)
            .then(res => res.json())
            .then(data => {
                setAllMembers(data)
            }
            )
    }, [messId])

    const handleMemberSelect = e => {
        const selectedMember = e.target.value;

        if (selectedMember !== 'select member by email') {
            setSelectedMember(e.target.value);
        }

    }

    // console.log(selectedMember)


    const handleCalculateMealRate = () => {
        const mealRate = (parseFloat(totalCost) / parseFloat(totalMeal)).toFixed(2)
        setMealRate(mealRate);
    }


    const costResult = {
        member: selectedMember,
    }



    const handleEnter = () => {
        const mealCostPerHead = (parseFloat(mealRate) * parseFloat(mealPerPerson)).toFixed(2);
        costResult.totalCost = mealCostPerHead;
        if (parseFloat(depositPerPerson) < parseFloat(mealCostPerHead)) {
            const giveTotal = parseFloat(mealCostPerHead) - parseFloat(depositPerPerson);
            costResult.given = giveTotal;
            setGiven(giveTotal.toFixed(2));
        } else {
            const takeTotal = parseFloat(depositPerPerson) - parseFloat(mealCostPerHead);
            costResult.take = takeTotal;
            setTake(takeTotal.toFixed(2));
        }
        setMealCostList([...mealCostList, costResult])
        setMealCostPerPerson(mealCostPerHead)
    }
    const handleClear = () => {
        setMealCostPerPerson('');
        setGiven('');
        setTake('');
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date();
    const monthName = months[date.getMonth()]

    return (
        <div>
            <span className='mx-auto mt-3 w-[180px] h-[3px] bg-accent block'></span>
            <h2 className='font-bold text-center'>Calculate Meal: <span className='text-accent'></span> {monthName}</h2>
            <span className='mx-auto mt-1 mb-2 w-[180px] h-[3px] bg-accent block'></span>
            <div className='text-center'>
                <input type="text" onChange={(e) => setTotalCost(e.target.value)} placeholder='Total Cost' className='input input-bordered input-accent w-25 mx-2' name="totalMeal" id="" />
                <input type="text" onChange={(e) => setTotalMeal(e.target.value)} placeholder='Total Meal' className='input input-bordered input-accent w-25' name="totalMeal" id="" />
                <button onClick={handleCalculateMealRate} className='btn btn-accent mx-2 mb-2'>Calculate</button>
            </div>
            <h2 className='text-center font-bold'>Meal Rate: {mealRate ? mealRate : '00'}</h2>

            <label className='ml-2 font-medium text-xl mt-4'>Select A Member :</label> {' '}
            <select onChange={handleMemberSelect} className='w-72 px-3 py-1 border-2 border-accent rounded-lg'>
                <option>select member by email</option>
                {
                    allMembers.map((member, index) => (
                        <option key={index} value={member.emailAddress}>{member.name}</option>
                    ))
                }
            </select>

            <div className="overflow-x-auto mt-4">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Meal</th>
                            <th>Deposit</th>
                            <th>Total Cost</th>
                            <th>Given</th>
                            <th>Take</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <td><input type="text" onChange={(e) => setMealPerPerson(e.target.value)} placeholder='Total meal per person' className='input input-bordered input-accent w-100' name="" id="" /></td>
                            <td><input type="text" onChange={(e) => setDepositPerPerson(e.target.value)} placeholder='Total deposit per person' className='input input-bordered input-accent w-100' name="" id="" /></td>
                            <td>{mealCostPerPerson ? mealCostPerPerson : '00'}</td>
                            <td>{given ? given : '00'}</td>
                            <td>{take ? take : '00'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='w-50  flex justify-center mx-auto gap-1'>
                <button onClick={handleEnter} className='btn btn-accent mb-2 w-32 block'>Enter</button>
                <button onClick={handleClear} className='btn bg-red-400 text-white  mb-2 w-32  block'>Clear</button>
                <button onClick={() => setIsShowResult(!ishowResult)} className='btn btn-accent mb-2 w-32  block'>Show Result</button>
            </div>

            {ishowResult && <table className="min-w-full mt-3">
                <thead>
                    <tr className='bg-accent'>
                        <th className="px-6 py-3 text-left text-sm font-bold uppercase border-2 border-accent">Sl</th>
                        <th className="px-6 py-3 text-left text-sm font-bold uppercase border-2 border-accent">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-bold uppercase border-2 border-accent">Total cost</th>
                        <th className="px-6 py-3 text-left text-sm font-bold uppercase border-2 border-accent">Given</th>
                        <th className="px-6 py-3 text-left text-sm font-bold uppercase border-2 border-accent">Take</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mealCostList.map((item, index) => (
                            <tr className=''>
                                <td className="px-3 py-2 whitespace-nowrap border-2 border-accent">{index + 1}</td>
                                <td className="px-3 py-2 whitespace-nowrap border-2 border-accent">{item.member}</td>
                                <td className="px-3 py-2 whitespace-nowrap border-2 border-accent">{item.totalCost}</td>
                                <td className="px-3 py-2 whitespace-nowrap border-2 border-accent">{item.given ? (item.given).toFixed(2) : '00'}</td>
                                <td className="px-3 py-2 whitespace-nowrap border-2 border-accent">{item.take ? (item.take).toFixed(2) : '00'}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>}


        </div>
    );
};

export default MealCost;