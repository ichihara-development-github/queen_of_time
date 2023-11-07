import { useEffect, useState, useContext } from "react"
import { ConfigContext } from "../contexts/config";


const useTextFilter = (state,param,text) => {

const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (!state){return}
    const newList = state.filter((m) => {
      return m[param].toLowerCase().indexOf(text) !== -1 
    });
    setFiltered(newList); 
  }, [text]);
    return filtered;
}

const useDateFilter = (list, date) => {
 
  const [filtered, setFiltered] = useState([]);
  const formattedDate = `${date.getFullYear()}-${( '00' + (date.getMonth()+1)).slice( -2 )}-${('00'+date.getDate()).slice(-2)}`

  useEffect(() =>{
    const newList = list.filter(elm => elm.date == formattedDate);
    newList.sort((k, v) => k.date - k.date);
    setFiltered(newList);
  },[date,list]
  );

  return filtered;
}

const useMonthFilter = (list, month) => {
 
  const [filtered, setFiltered] = useState([]);

  useEffect(() =>{
    const newList = list.filter(elm => {
      return (new Date(Date.parse(elm.date)).getMonth() + 1) === month;
    })
    newList.sort((a, b) => a.date - b.date);
    setFiltered(newList);
  },[month]
  );

  return filtered;
}



export {useTextFilter, useDateFilter, useMonthFilter};