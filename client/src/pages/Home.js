import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";


const Home = () => {
    const [data, setData] = useState([]);

    const loadData = async  () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };

    useEffect(() => {
      loadData();

    }, []);
    return(
        <div style={{marginTop: "150px"}}>
            <Link to="/addContact">
                 <button className="btn btn-contact">Add contact</button>
            </Link>
           <table className="styled-table">
               <thead>
                 <tr>
                     <th style={{textAlign: "center"}}>No.</th>
                     <th style={{textAlign: "center"}}>Wines</th>
                     <th style={{textAlign: "center"}}>Losses</th>
                     <th style={{textAlign: "center"}}>Pointe_scored</th>
                     <th style={{textAlign: "center"}}>Action</th>

                 </tr>
               </thead>
               <tbody>
                   
               {data.map((item, index) => {
                return(
                    <tr key={item.id}>
                        <th scope="row"> {index+1} </th>
                        <td>{item.wines}</td>  
                        <td>{item.losses}</td>
                        <td>{item.pointe_scored}</td> 
                         <td>
                            <Link to={`/update/${item.id}`}>
                             <button className="btn btn-edit">Edit</button>
                            </Link>
                            <button className="btn btn-delete">Delete</button>
                            <Link to={`/view/${item.id}`}>
                             <button className="btn btn-view">view</button>
                            </Link>
                         </td>

                    </tr>
                )

                    })
                   }
               </tbody>
           </table>
        </div>
    );
};

export default Home;