import React from "react";
import locationModule from "../styles/location.module.css";
function Location() {
  return (
    <div className={locationModule.location}>
      <iframe
        className={locationModule.frame}
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=lebanon,%20tripoli+(HotelXpress)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      >
        <a href="https://www.maps.ie/population/">Population mapping</a>
      </iframe>
    </div>
  );
}

export default Location;
