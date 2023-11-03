import { dayOfWeek } from "../components/const";

const getMonAndDate = (date, separater="/") => {
  return `${date.getMonth() + 1}${separater}${date.getDate()}`
}

const formattedTime = (param, text) => {
  if (!param){return null}

  var date = new Date(param * 1000);
  var hour = date.getHours();
  var minute = date.getMinutes();

  return (`${text || ""}${hour.toString().padStart(2,"0")}:${minute.toString().padStart(2,"0")}`)
}

const formattedDate = (date) => 
`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2,"0")}-${date.getDate().toString().padStart(2,"0")}`

const renderMonth = (period) => {
  const days = [];
  const year = period[0],
  　　　 month = period[1]-1
  const lastDay = new Date(year, month,0);

  for(let i=1;i<=lastDay.getDate();i++){
    const targetDay = new Date(year, month,i);
   
    days.push(
      {id: i,
       date: targetDay,
       dow:`(${dayOfWeek[targetDay.getDay()]})`,
       minWidth: 100
      }
    )
  }

  return days;


}

export {getMonAndDate, formattedTime, formattedDate, renderMonth};