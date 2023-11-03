export const  hubenyDistance = (lat1, lon1, lat2, lon2)=>
{
    const rad = (deg) => {
        return deg * (Math.PI / 180)
    }
        var lat1 = rad(lat1)
        var lat2 = rad(lat2)
        var lon1 = rad(lon1)
        var lon2 = rad(lon2)
  
        var dy = Math.abs((lat1 - lat2))
        var dx = Math.abs((lon1 - lon2))
        var rx = 6378137
        var ry = 6356775
        var ave = (lat1 + lat2)/2
  
        var eccentricity = Math.sqrt(((rx)**2 - (ry)**2) / (rx)**2)
        
  
        var w2 = Math.sqrt( 1.0 - ((eccentricity**2) * ((Math.sin(ave))**2)))
        
        var meridianRadius = rx*(1- eccentricity**2)/w2**3
       
        var boyuLine = rx / Math.sqrt(w2)
       
  
        return Math.sqrt((dy * (meridianRadius))**2 + (dx * boyuLine * (Math.cos(ave)))**2 )

}


