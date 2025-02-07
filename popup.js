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
  