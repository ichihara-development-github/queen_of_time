
const calcAssignCount = (shifts, time) => {

  let count = {early:0, mid: 0, late:0};
   
    
  if(!shifts){return count}

  shifts.forEach(elm => {
    if(!!elm.rest){return}
    const st = Math.ceil(elm.attendance_time)
    const en = Math.ceil(elm.leaving_time)
    const shift = [...Array(en-st)].map((_, i) => i+st)

    count = {
    early: count.early + Number(shift.some(el => time.early_time.includes(el))),
    mid: count.mid + Number(shift.some(el => time.mid_time.includes(el))),
    late: count.late + Number(shift.some(el => time.late_time.includes(el)))
    }
  })

  return count;
}


const countToEvent = (shifts, time) => {
  
  const events = Object.keys(shifts).map(
    function(key){
      const count = calcAssignCount(shifts[key], time);

      return {
        title:`朝:${count.early} 日:${count.mid} 夜:${count.late}`,
        start: key,
        color: "gray"
      }
        })

  return events;
}


export {calcAssignCount, countToEvent};