export function convertTime(t) {
    const seconds = Math.floor(t % 3600 % 60);
    const minutes = Math.floor(t % 3600 / 60);
    const hours = Math.floor(t % 86400 / 3600);
    const days = Math.floor(t % 604800 / 86400);	
    const weeks = Math.floor(t % 2629799.8272 / 604800);
    const months = Math.floor(t % 31557597.9264 / 2629799.8272);
    const years = Math.floor(t / 31557597.9264);

    const sYears = years > 0 ? years + ((years== 1) ? "y" : "y") : "";
    const sMonths = months > 0 ? ((years > 0) ? " " : "") + months + ((months== 1) ? "mo" : "mo") : "";
    const sWeeks = weeks > 0 ? ((years > 0 || months > 0) ? " " : "") + weeks + ((weeks== 1) ? "w" : "w") : "";
    const sDays = days > 0 ? ((years > 0 || months > 0 || weeks > 0) ? " " : "") + days + ((days== 1) ? "d" : "d") : "";
    const sHours = hours > 0 ? ((years > 0 || months > 0 || weeks > 0 || days > 0) ? " " : "") + hours + (hours== 1 ? "h" : "h") : "";
    const sMinutes = minutes > 0 ? ((years > 0 || months > 0 || weeks > 0 || days > 0 || hours > 0) ? " " : "") + minutes + (minutes == 1 ? "m" : "m") : "";
    const sSeconds = seconds > 0 ? ((years > 0 || months > 0 || weeks > 0 || days > 0 || hours > 0 || minutes > 0) ? " " : "") + seconds + (seconds == 1 ? "s" : "s") : ((years < 1 && months < 1 && weeks < 1 && days < 1 && hours < 1 && minutes < 1 ) ? " Few milliseconds" : "");
    if (seconds > 0) return sYears + sMonths + sWeeks + sDays + sHours + sMinutes + sSeconds;
    else return 'unknown';
}