import React from 'react';

const DisplayMessCost = ({messMember}) => {
    const {name,roomCatagory, houseRant, othersCost, developmentCharge, paymentStatus} = messMember;
    const houseRantInt = parseInt(houseRant);
    const othersCostInt = parseInt(othersCost);
    const upliftCharge = parseInt(developmentCharge);
    const totalWithUplift = houseRantInt + othersCostInt + upliftCharge;
    const totalWithoutUplift = houseRantInt + othersCostInt;
    return (
        <tr>
            <td>{name}</td>
            <td>{roomCatagory}</td>
            <td>{houseRant}</td>
            <td>{othersCost}</td>
            <td>{developmentCharge}</td>
            <td>{totalWithUplift}</td>
            <td>{totalWithoutUplift}</td>
            <td className={paymentStatus === 'Paid' ? 'text-success font-bold' : 'text-warning font-bold'}>{paymentStatus}</td>
        </tr>
    );
};

export default DisplayMessCost;