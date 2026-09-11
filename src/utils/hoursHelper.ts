import { BUSINESS_HOURS } from '../data/salonData';

export interface CurrentStatus {
  isOpen: boolean;
  isClosingSoon: boolean;
  statusText: string;
  nextEventText: string;
  todayHours: string;
  currentDayName: string;
}

export function getLondonSalonStatus(): CurrentStatus {
  // Compute current London time
  const now = new Date();
  
  // Format to London time parts
  const londonDateStr = now.toLocaleDateString('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const dayOfWeekIndex = new Date(
    now.toLocaleString('en-US', { timeZone: 'Europe/London' })
  ).getDay();

  const londonTimeParts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(now);

  let currentHour = 0;
  let currentMinute = 0;
  for (const part of londonTimeParts) {
    if (part.type === 'hour') currentHour = parseInt(part.value, 10);
    if (part.type === 'minute') currentMinute = parseInt(part.value, 10);
  }

  const currentMinutesFromMidnight = currentHour * 60 + currentMinute;

  const todaySchedule = BUSINESS_HOURS.find((h) => h.dayIndex === dayOfWeekIndex) || BUSINESS_HOURS[1];

  const [openHour, openMin] = todaySchedule.openTime.split(':').map(Number);
  const [closeHour, closeMin] = todaySchedule.closeTime.split(':').map(Number);

  const openMinutes = openHour * 60 + openMin;
  const closeMinutes = closeHour * 60 + closeMin;

  let isOpen = false;
  let isClosingSoon = false;
  let statusText = 'Closed';
  let nextEventText = '';

  if (currentMinutesFromMidnight >= openMinutes && currentMinutesFromMidnight < closeMinutes) {
    isOpen = true;
    const remainingMinutes = closeMinutes - currentMinutesFromMidnight;
    if (remainingMinutes <= 60) {
      isClosingSoon = true;
      statusText = 'Closing Soon';
      nextEventText = `Closes in ${remainingMinutes} min (at ${formatTime12(todaySchedule.closeTime)})`;
    } else {
      statusText = 'Open Now';
      nextEventText = `Until ${formatTime12(todaySchedule.closeTime)} today`;
    }
  } else if (currentMinutesFromMidnight < openMinutes) {
    isOpen = false;
    statusText = 'Closed Now';
    nextEventText = `Opens at ${formatTime12(todaySchedule.openTime)} today`;
  } else {
    // Already closed for today, check tomorrow
    const nextDayIndex = (dayOfWeekIndex + 1) % 7;
    const tomorrowSchedule = BUSINESS_HOURS.find((h) => h.dayIndex === nextDayIndex) || BUSINESS_HOURS[1];
    isOpen = false;
    statusText = 'Closed Now';
    nextEventText = `Opens tomorrow at ${formatTime12(tomorrowSchedule.openTime)}`;
  }

  return {
    isOpen,
    isClosingSoon,
    statusText,
    nextEventText,
    todayHours: todaySchedule.formatted,
    currentDayName: todaySchedule.day,
  };
}

function formatTime12(time24: string): string {
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 === 0 ? 12 : h % 12;
  const displayM = m === 0 ? '' : `:${m < 10 ? '0' + m : m}`;
  return `${displayH}${displayM} ${period}`;
}
