import { Slider } from "@mui/material";
import { useState } from "react"

export default function(){

    const [filters,updateFilters]=useState({
        price:{
            range:{
                min:0,
                max:100
            },
            active:false
        },
        color:{
            pallets:[
                {name:'red',id:1,active:false},
                {name:'blue',id:2,active:false}
            ]
        },
        size:{
            small:{id:1,active:false},
            medium:{id:2,active:false},
            large:{id:3,active:false},
            extralarge:{id:4,active:false},
            '2xl':{id:5,active:false},
        }
    })

    const [value, setValue] = useState([20, 37]);
    const handleChange = (event,newValue) => {
        setValue(newValue);
      };
    return (
      <div className="w-1/4">
        <div>Price:</div>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={(e)=>e}
        />
      </div>
    );
}