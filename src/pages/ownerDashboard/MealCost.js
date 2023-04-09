import React, { useState } from 'react';

const MealCost = () => {
    const [totalCost, setTotalCost] = useState('');
    const [totalMeal, setTotalMeal] = useState('');
    const [mealRate, setMealRate] = useState('');
    const [mealPerPerson, setMealPerPerson] = useState('');
    const [depositPerPerson, setDepositPerPerson] = useState('');
    const [mealCostPerPerson, setMealCostPerPerson] = useState('');
    const [given, setGiven] = useState('');
    const [take, setTake] = useState('');


    const handleCalculateMealRate = () => {
        const mealRate = (parseFloat(totalCost) / parseFloat(totalMeal)).toFixed(2)
        setMealRate(mealRate);
    }



    const handleEnter = () => {
        const mealCostPerHead = parseFloat(mealRate) * parseFloat(mealPerPerson).toFixed(2);
        if (parseFloat(depositPerPerson) < parseFloat(mealCostPerHead)) {
            const giveTotal = parseFloat(mealCostPerHead) - parseFloat(depositPerPerson);
            setGiven(giveTotal.toFixed(2));
        } else {
            const takeTotal = parseFloat(depositPerPerson) - parseFloat(mealCostPerHead);
            setTake(takeTotal.toFixed(2));
        }
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
            <div className='w-50 mx-auto flex gap-1'>
                <button onClick={handleEnter} className='btn btn-accent mx-2 mb-2 w-50 mx-auto block'>Enter</button>
                <button onClick={handleClear} className='btn btn-accent mx-2 mb-2 w-50 mx-auto block'>Clear</button>
            </div>
        </div>
    );
};

export default MealCost;