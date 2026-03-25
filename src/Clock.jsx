import { useState } from 'react';
import { useEffect } from 'react';

function Clock(){
    const [Init_Data, setTime] = useState(new Date());
    useEffect(function() { setInterval(function(){
        setTime(new Date());
    },1000)}, [])
    return (
        <p>{Init_Data.toLocaleTimeString()}</p>
    );
}

export default Clock; 