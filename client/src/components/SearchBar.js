import React from 'react'
import SearchBarStyle from '../style/SearchBar.module.css'
import person from '../assets/person.png'
import calendar from '../assets/calendar.png'
import position from '../assets/position.png'
import search from '../assets/search.png'


function SearchBar() {
  return (
    <div className={SearchBarStyle.container}>
      <div className={`${SearchBarStyle.section} ${SearchBarStyle.sectionBorder}`}>
        <img src={position} className={SearchBarStyle.icons} alt='position' />
        <label className={SearchBarStyle.text}>Location
          <select id="position" name="position" className={SearchBarStyle.Drop}>
            <option value="Beirut">Beirut</option>
            <option value="Tripoli">Tripoli</option>
            <option value="Jbail">Jbail</option>
            <option value="Saida">Saida</option>
          </select>
           </label >
      </div>

      <div className={`${SearchBarStyle.section} ${SearchBarStyle.sectionBorder}`}>
        <img src={calendar} id='calendar' className={SearchBarStyle.icons} alt='calendar' />
      <label className={SearchBarStyle.text} for='calendar'>Check in
      <input type="date" id='calendar' className={SearchBarStyle.Drop}/>
        </label>
      </div>

      <div className={`${SearchBarStyle.section} ${SearchBarStyle.sectionBorder}`}>
        <img src={calendar} className={SearchBarStyle.icons} alt='calendar' /><p className={SearchBarStyle.text}>Check out
          <p className={SearchBarStyle.Description}>15 Jun 2023</p></p>
      </div>

      <div className={SearchBarStyle.section}><img src={person} className={SearchBarStyle.icons} alt='person' />
        <p className={SearchBarStyle.text}>Rooms for
          <p className={SearchBarStyle.Description}>1 room, 2 </p></p>
      </div>
      <div className={`${SearchBarStyle.section} ${SearchBarStyle.Button}`}>
        <img src={search} className={SearchBarStyle.icon} alt='search' />
        <p>Search</p> </div>
    </div>
  )
}

export default SearchBar
