import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import SearchBarStyle from '../SearchBar/SearchBar.module.css'
import calendar from '../../assets/calendar.png'
import person from '../../assets/person.png'
import position from '../../assets/position.png'
import search from '../../assets/search.png'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import SelectPerson from '../Guests/SelectPerson'



function SearchBar() {

  const [isClicked, setIsClicked] = useState(false);
  const [counterParent, setCounterParent] = useState(0);
  const [isDoneParent, setISDoneParent] = useState(false)


  const selectPeople = () => { setIsClicked(!isClicked); setISDoneParent(true) }

  let date1 = useRef(null);
  let date2 = useRef(null);

  const CreateCalendar = (date) => {
    useEffect(() => {
      flatpickr(date.current, {
        allowInput: true,
        altFormat: 'F j, Y',
        dateFormat: 'd M Y',
        defaultDate: new Date(),
        clickOpens: true,
      })
    }, []);

  }
  CreateCalendar(date1);
  CreateCalendar(date2);


  return (
    <section className={`${SearchBarStyle.container}`}>

      <section className={SearchBarStyle.section}>
        <img src={position} className={SearchBarStyle.icons} alt='position' />
        <label className={SearchBarStyle.text}>Location</label >
        <select id="position" name="position" className={`${SearchBarStyle.Description} ${SearchBarStyle.Drop}`}>
          <option value="Beirut">Beirut</option>
          <option value="Tripoli">Tripoli</option>
          <option value="Jbail">Jbail</option>
          <option value="Saida">Saida</option>
        </select>
      </section>


      <section className={SearchBarStyle.section}>
        <img src={calendar} className={SearchBarStyle.icons} alt='calendar' />
        <p className={SearchBarStyle.text}>Check in</p>
        <input ref={date1} className={`${SearchBarStyle.Description} ${SearchBarStyle.calendar}`} />
      </section>


      <section className={`${SearchBarStyle.section}`}>
        <img src={calendar} className={SearchBarStyle.icons} alt='calendar' />
        <p className={SearchBarStyle.text}>Check out</p>
        <input ref={date2} className={`${SearchBarStyle.Description} ${SearchBarStyle.calendar}`} />
      </section>


      <section className={`${SearchBarStyle.section}`}>
        <img src={person} className={SearchBarStyle.icons} alt='person' onClick={selectPeople} />
        <p className={SearchBarStyle.text}>Rooms for</p>
        <p className={SearchBarStyle.Description} onClick={selectPeople}>1 room, {counterParent}guests </p>
        {(isClicked && isDoneParent)
          ? <SelectPerson counterValue={counterParent} setCounterParent={setCounterParent} setIsDoneParent={setISDoneParent} />
          : ''}
      </section>


      <button className={`${SearchBarStyle.section}`}>
        <img src={search} className={SearchBarStyle.icon} alt='search' />
        <Link to='room' className={SearchBarStyle.text}>Search</Link>
      </button>


    </section>
  )
}

export default SearchBar;
