function getUserTimeZone() {
    try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
        console.log("User timezone:", timezone);
        return timezone;
    } catch (error) {
        console.error("Error getting timezone:", error);
        return "UTC";
    }
}
  
  
  // To call timezone function
  
  const userTimeZone = getUserTimeZone(); 
  
function getUserTime(){
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth()+1).padStart(2,'0');
    const date = String(now.getUTCDate()).padStart(2,'0');
    const hour = String(now.getUTCHours()).padStart(2,'0');
    const minutes = String(now.getUTCMinutes()).padStart(2,'0');
    const seconds = String(now.getUTCSeconds()).padStart(2,'0');

    const dateString = `${year}-${month}-${date}`;
    const timeString = `${hour}:${minutes}:${seconds}`;
    
    return {
        date: dateString,
        time: timeString,
        dateAndTime: new Date(`${dateString}T${timeString}Z`)
    };
}


getUserTime();

async function selectRaceWeekend(data){
    try{
        const response = await fetch("data.json");
        const scheduleJson = await response.json();
    } catch(error){

    }
}


