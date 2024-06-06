import React from 'react';
import { Bars } from 'react-loader-spinner';

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Bars
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
};

export default LoadingSpinner;
