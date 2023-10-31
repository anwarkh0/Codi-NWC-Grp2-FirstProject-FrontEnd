import React, { useEffect, useState, useRef } from 'react'
import SearchBarStyle from '../style/SearchBar.module.css'
import person from '../assets/person.png'
import calendar from '../assets/calendar.png'
import position from '../assets/position.png'
import search from '../assets/search.png'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import SelectPerson from './SelectPerson'



function SearchBar() {

  const [isClicked, setIsClicked] = useState(false);
  const [counterParent, setCounterParent] = useState(0);
const [isDoneParent,setISDoneParent]=useState(true)

  const selectPeople = () => { setIsClicked(prvValue => !prvValue) }

  const datee = useRef(null);
  const datee2 = useRef(null);
  useEffect(() => {
    flatpickr(datee.current, {
      allowInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'd M Y',
      defaultDate: new Date(),
      clickOpens: true
    })
  }, [])

  useEffect(() => {
    flatpickr(datee2.current, {
      allowInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'd M Y',
      defaultDate: new Date(),
      clickOpens: true
    })
  }, [])

  return (
    <div className={`${SearchBarStyle.container}`}>

      <div className={`${SearchBarStyle.sections} ${SearchBarStyle.sectionBorder}`}>
        <div className={`${SearchBarStyle.section}`} >
          <img src={position} className={SearchBarStyle.icons} alt='position' />
          <label className={SearchBarStyle.text}>Location</label >
        </div>
        <select id="position" name="position" className={SearchBarStyle.Drop}>
          <option value="Beirut">Beirut</option>
          <option value="Tripoli">Tripoli</option>
          <option value="Jbail">Jbail</option>
          <option value="Saida">Saida</option>
        </select>
      </div>

      <div className={`${SearchBarStyle.sections} ${SearchBarStyle.sectionBorder}`}>
        <div className={`${SearchBarStyle.section}`}>
          <img src={calendar} className={SearchBarStyle.icons} alt='calendar' />
          <p className={SearchBarStyle.text}>Check in</p>
        </div>
        <input ref={datee} className={`${SearchBarStyle.Description} ${SearchBarStyle.calendar}`} />
      </div>

      <div className={`${SearchBarStyle.sections} ${SearchBarStyle.sectionBorder}`}>
        <div className={`${SearchBarStyle.section}`}>
          <img src={calendar} className={SearchBarStyle.icons} alt='calendar' />
          <p className={SearchBarStyle.text}>Check out</p>
        </div>
        <input ref={datee2} className={`${SearchBarStyle.Description} ${SearchBarStyle.calendar}`} />
      </div>


      <div className={`${SearchBarStyle.sections}`} >
        <div className={`${SearchBarStyle.section}`}>
          <img src={person} className={SearchBarStyle.icons} alt='person' onClick={selectPeople} />
          <p className={SearchBarStyle.text}>Rooms for</p>
        </div>
        <p className={SearchBarStyle.Description} onClick={selectPeople}>1 room, {counterParent}guests </p>
        {(isClicked) ? <SelectPerson counterValue={counterParent} setCounterParent={setCounterParent} setIsDoneParent={setISDoneParent}/> : ''};
        {/* {(isDoneParent) ? <SelectPerson counterValue={counterParent} setCounterParent={setCounterParent} setIsDoneParent={setISDoneParent}/> : ''}; */}
      </div>

      <div className={`${SearchBarStyle.sections} ${SearchBarStyle.Button}`}>
        <div className={`${SearchBarStyle.section}`}>
          <img src={search} className={SearchBarStyle.icon} alt='search' />
          <p>Search</p>
        </div>

      </div>


    </div>
  )
}

export default SearchBar;
