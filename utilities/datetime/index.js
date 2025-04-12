
import moment from 'moment-timezone';
export const getTimezoneOffsetInHours = (timezone) =>{
    const now = moment.utc(); // current time in UTC
    const local = now.clone().tz(timezone); // same moment in the given timezone
  
    const utcOffsetMinutes = local.utcOffset(); // offset in minutes
    const utcOffsetHours = utcOffsetMinutes / 60;
  
    return utcOffsetHours;
  };

