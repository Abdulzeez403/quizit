import React from 'react';
import { ColorRing } from 'react-loader-spinner';

const RingSpinner = () => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-800 opacity-30 z-50">
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
            // colors={["#003333",'#003333']}
            />
        </div>
    );
};

export default RingSpinner;
