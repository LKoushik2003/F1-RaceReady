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
  
const userTimeZone = getUserTimeZone(); 
  
function getCurrentTime(){
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


getCurrentTime();

async function selectRaceWeekend(data){
    try{
        const response = await fetch("data.json");
        const scheduleJson = await response.json();
        const { date: currentUTCDate, time: currentUTCTime } = getCurrentTime();

        for (const race of scheduleJson.RaceTable.Races) {
            const sessions = [
              { date: race.date, time: race.time },
              race.FirstPractice,
              race.SecondPractice,
              race.ThirdPractice,
              race.Qualifying
            ];
      
            for (const session of sessions) {
                if (session.date > currentUTCDate ||(session.date === currentUTCDate && session.time >= currentUTCTime)) {
                    return race;
                }
            }
          }
        return null;
        
    } catch(error){
        console.error("Error", error);
        return null;
    }
}

async function updateTable(){
    const race = await selectRaceWeekend(getCurrentTime);

    const tableBody = document.querySelector("#raceTable tbody");
    tableBody.innerHTML = "";

    const sessions = [
        { name: "Race", date: race.date, time: race.time },
        { name: "Practice 1", ...race.FirstPractice },
        { name: "Practice 2", ...race.SecondPractice },
        { name: "Practice 3", ...race.ThirdPractice },
        { name: "Qualifying", ...race.Qualifying }
      ];
    
      sessions.forEach((session) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${session.name}</td>
          <td>${session.date}</td>
          <td>${session.time} UTC</td>
          <td><button class="notify-btn" data-date="${session.date}" data-time="${session.time}">🔔</button></td>
          <td class="status">Upcoming</td>
        `;
        tableBody.appendChild(row);
      });
    
      document.getElementById("raceName").innerHTML = `${race.raceName}`;

}

document.addEventListener("DOMContentLoaded", () => {
    updateTable();
    countdownTimer();
  });


  function getEndTime() {
    return "March 14, 2025 01:30:00";
  }

//function for countdown timer
//takes input as date+time and id of element where timer should be added
function countdownTimer(nextTime){
    
    //getEndTime placeholder for function to get time of the next session
    const endDate = new Date(getEndTime()).getTime();
    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endDate - now;
        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("countdown").innerHTML = "Session Over";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("countdown").innerHTML =`${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}
