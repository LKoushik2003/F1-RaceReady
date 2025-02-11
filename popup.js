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
    
    //holding seconds part of timer
    //const seconds = String(now.getUTCSeconds()).padStart(2,'0');
    console.log(now +' '+ year+' ' + month+' ' + date+' ' + hour+' ' + minutes)
}

getUserTime();
