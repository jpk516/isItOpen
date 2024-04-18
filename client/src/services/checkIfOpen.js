function CheckIfOpen(venue, allCheckIns) {

  //console.log(allCheckIns);
  const now = new Date(); //gets date and utc date
  const nowUtc = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()));

  const startPeriod = new Date(nowUtc); //sets start period to 3 AM
  startPeriod.setUTCHours(3, 0, 0, 0); 
  if (nowUtc.getUTCHours() < 3) {
      startPeriod.setUTCDate(startPeriod.getUTCDate() - 1); 
  }
  const endPeriod = new Date(startPeriod);
  endPeriod.setUTCDate(endPeriod.getUTCDate() + 1);  //sets end time to 3 AM the next day


  const isReportedOpen = Array.isArray(allCheckIns) && allCheckIns.some(checkIn => { //checks for check ins 
    const checkInDate = new Date(checkIn.created);
    
    return checkIn.venue === venue._id && checkInDate >= startPeriod && checkInDate < endPeriod && checkIn.open !== false; //returns true if check in is recent and open and within the 3AM-3AM window
  });
  
  const isReportedClosed = Array.isArray(allCheckIns) && allCheckIns.some(checkIn => {
    const checkInDate = new Date(checkIn.created);
    return checkIn.venue === venue._id && checkInDate >= startPeriod && checkInDate < endPeriod && checkIn.open === false; // //returns false if check in is recent and closed and within the 3AM-3AM window
  });
  
  if (isReportedOpen) 
  {
      //console.log(venue.name + " is checked in as open in checkIFOpen");
      return true;  //returns true if open
  } 
  else if (isReportedClosed) 
  {
      //console.log(venue.name + " is checked in as closed in checkIFOpen");
      return false; //returns false if closed
  }

  //console.log(venue.name + " is defaulting to hours");

 
  const currentDay = nowUtc.getUTCDay();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const todaysHours = venue.hours.find(hourEntry => hourEntry.day === daysOfWeek[currentDay]); //gets current day and venue hours

  if (!todaysHours || todaysHours.open === null) {
      return false;  //if no hours posted return false
  }

  const openTimeParts = todaysHours.open.split('T')[1].split(':'); //set up open and closed times
  const closeTimeParts = todaysHours.close.split('T')[1].split(':');

  const openTime = new Date(nowUtc);
  openTime.setUTCHours(parseInt(openTimeParts[0]), parseInt(openTimeParts[1]), 0, 0); 

  const closeTime = new Date(nowUtc);
  closeTime.setUTCHours(parseInt(closeTimeParts[0]), parseInt(closeTimeParts[1]), 0, 0);

  if (closeTime < openTime) {
      closeTime.setUTCDate(closeTime.getUTCDate() + 1); 
  }

  return nowUtc >= openTime && nowUtc <= closeTime; //returns true if current time is between open and close, and false if not
}

export default CheckIfOpen;