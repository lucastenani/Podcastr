export function convertDurationToTimeString(duration: number) {
  // Turning seconds to hours 
  // Minutes * hours  60*60 = 3600
  const hours = Math.floor(duration / 3600);
  // As the hours have been rounded up, we take what's left to convert to minutes
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  // Now I need to transform these results into a string in the format '00: 00: 00 '
  const timeString = [hours, minutes, seconds]
    .map(unit => String(unit).padStart(2, '0'))
    .join(':')
  return timeString;
}