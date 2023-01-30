import React from 'react';

const Loader = () => {
    return (
        <div className='flex h-[100vh] justify-center items-center'>
            <h1 className='text-5xl animate-bounce text-gray-900'>Loading...</h1>
        </div>
    );
};

export default Loader;