
import moment from 'moment-timezone';
import Timezones from '../../constants/Timezones';
export const getTimezoneOffsetInHours = (currentTz, targetTz) =>{
    const now = moment.utc();
    const _currentTz =now.clone().tz(currentTz); 
    const _targetTz = now.clone().tz(targetTz);
 
    const utcOffsetMinutes = _targetTz?.utcOffset() - _currentTz?.utcOffset() ;
    const utcOffsetHours = utcOffsetMinutes / 60;
  
    return utcOffsetHours;
  };

  export const getTimeSlots = (slot,targetTz=null) => {
    if (!slot?.startTime) return null;
    const { startTime, endTime, breakDuration, slotDuration } = slot;
    let _startTime = moment(startTime);
    let _endTime = moment(endTime);
    let currentTz = slot.timeZone;
    let _targetTz= targetTz ? Timezones.find(t=> t.value == targetTz)?.label : null;

    if (_targetTz && _targetTz != currentTz) {
      const offset = getTimezoneOffsetInHours(currentTz, _targetTz);
      _startTime = _startTime.clone().add(offset, 'hours');
      _endTime = _endTime.clone().add(offset, 'hours');
    };
    const slots = [];
  
    while (_startTime.clone().add(slotDuration, 'minutes').isSameOrBefore(_endTime)) {
      const slotStart = _startTime.clone();
      const slotEnd = _startTime.clone().add(slotDuration, 'minutes');
  
      slots.push({
        start: slotStart.format('HH:mm'),
        end: slotEnd.format('HH:mm'),
      });
      _startTime = slotEnd.clone().add(breakDuration, 'minutes');
    }
    return slots;
  };


  export const filterSlots = (
    date,               // e.g. '2025-04-24'
    slots,              // array of { start, end }
    bufferDuration,     // in minutes
    currentDeviceTime,   // e.g. '10:15'
  
  ) => {
   
    let now = moment();
    const isToday = now.isSame(date, 'day');
    let deviceTimeMoment = moment(`${date} ${currentDeviceTime}`, 'YYYY-MM-DD HH:mm');

    let currentTime;
    if (isToday) {
      currentTime = deviceTimeMoment.isAfter(now) ? deviceTimeMoment : now.clone();
    } else {
      currentTime = moment(`${date} ${currentDeviceTime}`, 'YYYY-MM-DD HH:mm');
    };
    
    const bufferedTime = now.clone().add(bufferDuration, 'minutes');
  
    return slots?.map(slot => {
      let slotTime = moment(`${date} ${slot.start}`, 'YYYY-MM-DD HH:mm');
      
      let available = false;
      if (isToday) {
        available = currentTime.isSameOrBefore(slotTime) && bufferedTime.isSameOrBefore(slotTime);
      } else {
        available = currentTime.isSameOrBefore(slotTime);
      }
  
      return {
        ...slot,
        available,
      };
    });
  };
