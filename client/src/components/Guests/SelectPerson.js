import React, { useState } from 'react'
import SelectPersonStyle from '../Guests/SelectPerson.module.css'


function SelectPerson({ counterParent, setCounterParent, setIsDoneParent }) {
    const [counter, setCounter] = useState(0);
    const [isDone, setIsDone] = useState(false);
    // const [counterParent, setCounterParent] = useState(0);
    // const [isDoneParent, setISDoneParent] = useState(false)
   
    const Increase = () => {
        setCounter(prev => prev + 1);
    }

    const Decrease = () => {
        setCounter(prev => prev - 1);
    }

    const sendDataToParent = () => {
        setCounterParent(counter);
        setIsDone(prev => !prev)
        setIsDoneParent(isDone);
    }

    return (
            <div className={SelectPersonStyle.card}>
                <h3>Room</h3>
                <div className={SelectPersonStyle.selection}>
                    <p>guests</p>
                    <div className={SelectPersonStyle.container}>
                        <div className={SelectPersonStyle.counterButton} onClick={Decrease}>-</div>
                        <p className={SelectPersonStyle.counterValue}>{counter}</p>
                        <div className={SelectPersonStyle.counterButton} onClick={Increase}>+</div>
                    </div>
                </div>
                <button className={SelectPersonStyle.DoneButton} onClick={sendDataToParent}>Done</button>
            </div>
    )
}

export default SelectPerson;