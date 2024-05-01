function CheckIfOpen(venue, checkIns) {
  //console.log(venue.name + " is being checked for open status");

  const nowUtc = new Date();

  //console.log(checkIns);

  // Define periods for checking check-ins
  const startPeriod = new Date(nowUtc);
  startPeriod.setUTCHours(10, 0, 0, 0); 
  if (nowUtc.getUTCHours() < 10) {
      startPeriod.setUTCDate(startPeriod.getUTCDate() - 1); 
  }
  const endPeriod = new Date(startPeriod);

  endPeriod.setUTCDate(endPeriod.getUTCDate() + 1);

  // console.log(startPeriod.toISOString());
  // console.log(endPeriod.toISOString());

  if (checkIns.length > 0) 
  {
    const mostRecentCheckIn = checkIns[0];
    const checkInDate = new Date(mostRecentCheckIn.created);

    // Check if the most recent check-in is within the defined time period
    if (checkInDate >= startPeriod && checkInDate < endPeriod) 
    {
      if (mostRecentCheckIn.open) {
        console.log(`${venue.name} is checked in as open based on the most recent check-in.`); 
        return true;
      } else {
        console.log(`${venue.name} is checked in as closed based on the most recent check-in.`);
        return false;
      }
    }
  }

  // console.log(venue.name + " is defaulting to hours");

  // Get today's hours based on current UTC day
  const currentDayIndex = nowUtc.getUTCDay();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const todaysHours = venue.hours.find(hourEntry => hourEntry.day === daysOfWeek[currentDayIndex]);

  if (!todaysHours || todaysHours.open === null) {
    return false;
  }

  // Construct open and close times
  const openTimeParts = todaysHours.open.split('T')[1].split(':');
  const closeTimeParts = todaysHours.close.split('T')[1].split(':');
  const openTime = new Date(nowUtc);
  openTime.setUTCHours(parseInt(openTimeParts[0]), parseInt(openTimeParts[1]), parseInt(openTimeParts[2]), 0);

  const closeTime = new Date(openTime); 


  if (nowUtc < openTime  && nowUtc.getUTCHours() <= 10) {
    openTime.setUTCDate(openTime.getUTCDate() - 1);
  }
   
  
  // Check if we need to adjust open time to the previous day, hours refer to previous day as business is open past midnight
  if (parseInt(closeTimeParts[0]) <= parseInt(openTimeParts[0]) && nowUtc.getUTCHours() >= 10) {
    closeTime.setUTCDate(closeTime.getUTCDate() + 1);  // Add a day if closes after midnight
  }
  
  closeTime.setUTCHours(parseInt(closeTimeParts[0]), parseInt(closeTimeParts[1]), parseInt(closeTimeParts[2]), 0);

  const isOpenNow = nowUtc >= openTime && nowUtc <= closeTime;


  // console.log(`Open Time: ${openTime.toISOString()}`);
  // console.log(`Adjusted Close Time: ${closeTime.toISOString()}`);
  // console.log(`Current UTC Time: ${nowUtc.toISOString()}`);
  // console.log('Is Open Now:', isOpenNow);

  return isOpenNow;
}

export default CheckIfOpen;
