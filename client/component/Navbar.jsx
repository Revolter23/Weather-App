import React from "react";
import CloudIcon from '@mui/icons-material/Cloud';

export default function Navbar() {
    return (
        <div className="nav">
            <CloudIcon sx={{ fontSize: '1.8em' }} className='Icon' />
            <p>Weather App</p>
        </div>
    );
};