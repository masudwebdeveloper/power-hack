import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Header/Header';

const Mian = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Mian;