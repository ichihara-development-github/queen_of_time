const timeConvert = (min, type) => {
    
    switch(type){
        case "full":
            return `${Math.floor(min/60)}時間${(min % 60)}分`
        case "colon":
            return `${Math.floor(min/60)}:${(min % 60)}`
        case "decimal":
            return `${Math.floor(min/60) + (0.25 * Math.floor((min % 60)/15))}`
    }

}


const totalingTimes = (attendances) => {

    let result = {
        workDate: 0,
        totalWorkTime: 0,
        over_time: 0,
        midnight_time: 0,
        midnight_over_time: 0

    }



    if (!attendances.length){ return result }


    const add = (key) => {
        const calc = attendances.reduce(function(sum, elm){
            return sum + elm[key];
        },0);

        return calc

    }

    result = {
        workDate: attendances.length,
        totalWorkingTime: add("working_time"),
        overtime: add("overtime"),
        midnight_time: add("midnight_time"),
        midnight_overtime: add("midnight_overtime")
    }


    return result;
}

export { totalingTimes, timeConvert }
