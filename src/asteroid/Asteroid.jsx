import React, {useState, useEffect} from 'react';
import '../asteroid/Asteroid.scss';
import {useSearchParams, useNavigate} from "react-router-dom";
import axios from 'axios';
const API_KEY = "25CNI9xziO3sLFAn4S2f155k5iMc1HjnjoxdSxn5";


function Asteroid() {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState([]);
    const id = searchParams.get("id")
    const navigate = useNavigate();
    if(data.length == 0){
        navigate('/')
    }

    async function fetchMyAPI() {
        const fetch =  await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${API_KEY}`);
        setData(fetch.data);
    } 
    function back(){
        navigate('/')
    }
    
    useEffect(() => {
        fetchMyAPI()
      }, []);

  return (
    <div className='container mt-5'>
        <div className='row'>
            <div className='col-md-4'>
            <button type="button" onClick={back} class="btn btn-outline-light">&#8249; Back</button>
            <h2 className='text-center mt-5 title'> {data.name} Asteroid</h2>
            </div>
            <div className='col-md-8'>
                <div className='block'>
                <table>
                    

  <tr>
    <td>Absolute Mangitude</td>
    <td className="head">{data.absolute_magnitude_h}</td>
  </tr>
  <tr>
    <td>First Observation Date</td>
    <td className="head">{data?.orbital_data?.first_observation_date}</td>
  </tr>
  <tr>
    <td>Last Observation Date</td>
    <td className="head">{data?.orbital_data?.last_observation_date}</td>
  </tr>
  <tr>
    <td>Eccentricity</td>
    <td className="head">{data?.orbital_data?.eccentricity}</td>
  </tr>
  <tr>
    <td>Orbit class description</td>
    <td className="head">{data?.orbital_data?.orbit_class?.orbit_class_description}</td>
  </tr>
  <tr>
    <td>Orbit class range</td>
    <td className="head">{data?.orbital_data?.orbit_class?.orbit_class_range}</td>
  </tr>
  <tr>
    <td>Orbit class type</td>
    <td className="head">{data?.orbital_data?.orbit_class?.orbit_class_type}</td>
  </tr>
  <tr>
    <td>MAX diameter (km)</td>
    <td className="head">{data?.estimated_diameter?.kilometers?.estimated_diameter_max}</td>
  </tr>
  <tr>
    <td>MIN diameter (km)</td>
    <td className="head">{data?.estimated_diameter?.kilometers?.estimated_diameter_min}</td>
  </tr>
</table>
                </div>
                
            </div>
        </div>
   
    </div>
  )
}

export default Asteroid