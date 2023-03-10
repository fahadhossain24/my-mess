import React from 'react';

const DashBoardActivity = ({ messInfo }) => {
    console.log(messInfo)
    return (
        <div>
            <h2 className='text-center text-2xl mt-2 text-secondary font-bold'>Welcome to <span className='text-accent'>{messInfo.name}</span></h2>
            <h2>Owner dashboard for {messInfo.name}</h2>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        {/* Sidebar content here */}
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoardActivity;