import React, {useState, useEffect} from "react";
import {useNavigate, useParams, Link  } from "react-router-dom";
import"./AddEdit.css";  
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    wines: "",
    losses: "",
    pointe_scored: "",

};

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const {wines, losses, pointe_scored} = state;

    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!wines || !losses || !pointe_scored) {
            toast.error("Please provide value into each input field");
        } else {
            axios.post("http://localhost:5000/api/post", {
                wines,
                losses,
                pointe_scored
            }).then(() =>{
                setState({wines: "", losses: "", pointe_scored: ""})
            }).catch((err) => toast.error(err.response.data));
               setTimeout(() => history.push("/"), 500);
        }
    };

    const handleInputchange = (e) => {
        const { wines, value } = e.target;
         setState({ ...state, [wines]: value });
    };
    return (
        <div style={{marginTop: "100px"}}>
          <form style={{
             margin: "auto",
             padding: "15px",
             maxWidth: "400px",
             alignContent: "center"
          }}
           onSubmit={handleSubmit}
          >
           <label htmlFor="wines">Wines</label>
           <input 
            type="number"
            id="wines"
            wines="wines"
            placeholder="Your Wines ..."
            value={wines}
            onChange={handleInputchange}
           />

          <label htmlFor="losses">losses</label>
           <input 
            type="number"
            id="losses"
            wines="losses"
            placeholder="Your losses ..."
            value={losses}
            onChange={handleInputchange}
            />

           <label htmlFor="pointe_scored">losses</label>
           <input 
            type="number"
            id="pointe_scored"
            wines="pointe_scored"
            placeholder="Your pointe_scored No..."
            value={pointe_scored}
            onChange={handleInputchange}
            />
            <input type="submit" value="Save" />
            <Link to="/">
                <input type="button" value="Go Back"/>
            </Link>
          </form>
        </div>
    );
};
export default AddEdit;