import React, {useState} from 'react';
import '../dashboard/Dashboard.scss';
import axios from 'axios';
import { Link } from "react-router-dom";



function Dashboard() {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [data, setData] = useState();
    const [msg, setMsg] = useState(false);
    const [err, setErr] = useState(false);
    console.log("data", data)
    const API_KEY = "25CNI9xziO3sLFAn4S2f155k5iMc1HjnjoxdSxn5";


    function handleFirstDate(event) {
        let firstDate = new Date(event.target.value);
        let firstDateMDY = `${firstDate.getFullYear()}-${firstDate.getMonth() + 1}-${firstDate.getDate()}`;
        setStartDate(firstDateMDY);
        
    }
    function handleSecondDate(date) {
        let secondDate = new Date(date.target.value);
        let secondDateMDY = `${secondDate.getFullYear()}-${secondDate.getMonth() + 1}-${secondDate.getDate()}`;
        setEndDate(secondDateMDY);
        
    }
    async function search(){
        try{
            const start = new Date(startDate);
            const end = new Date(endDate);
            const startDay = start.setDate(start.getDate());
            const sevenDays = start.setDate(start.getDate() + 7);
            const lastday = end.setDate(end.getDate());
            console.log("seve", sevenDays, lastday)
            if(sevenDays >= lastday){
                console.log("greater")
                console.log("seveaaa", start, end)
            if(startDay <= lastday){
                console.log("true")
                setMsg(false);
                setErr(false);
                const fetch = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`);
                setData(fetch.data);
                
            }else{
                console.log("false")
                setMsg(true);
                setData();
                setErr(false);
            }
            
        }else{
            setErr(true);
            setData();
            setMsg(false);
        }

        }catch(e){
        console.log("error", e)
        }
    
    }

  return (
    <div className="container mt-4">
        
        <h2 className="text-center title">NeoWs (Near Earth Object Web Service), Search for Asteroids based on their closest approach between start and end date to Earth</h2>
       <div className="date">
           
       <input onChange={handleFirstDate} type="date"/>
      
      <input onChange={handleSecondDate} type="date"/> 
       </div>
       <div class="d-flex justify-content-center search_butn">
         <button onClick={search} class="btn btn-secondary mt-2">Search</button>
        </div>
      
       <div>
           
           {data && Object.keys(data.near_earth_objects).sort().map((item)=> (
           <div className="row">
               
               <div className="dated">{item}        
           {
               data.near_earth_objects[item].slice(0, 10).map((val) => (
                   <div className="asteroid">
                       <Link to={{ pathname: '/details', search: `?id=${val.neo_reference_id}`}}>
                       {val.name}    
                       </Link>
                   </div>
               ))
           }
           </div></div>)

            )}

            {msg == true && <div className="text-center text-warning mt-2">End Date should be greater than Start Date</div>}
            {err == true && <div className="text-center text-warning mt-2">Start Date and End Date span should not be more than 7 Days</div>}

       </div>
     
 
        
    </div>
  )
}

export default Dashboard