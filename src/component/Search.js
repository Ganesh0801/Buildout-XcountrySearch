// import React,{useEffect,useState} from 'react';
// import  "./Search.css";
// import axios from "axios";

// const Search = () => {
//   const[country,setCountry]=useState([]);
//   const[search,setSearch]=useState("")
//   const[fliter,setFilter]=useState([])

//   useEffect(()=>{
//     const fetchCountry = async()=>{
//         try{
//             const response = await axios.get(`https://restcountry.com/v3.1/all`); 
//             console.log(response.data);
//             setCountry(response.data)
//         }catch(e){
//             console.log("error while fetching country",e)
//         }
//     }
//     fetchCountry()
//   },[])


//   useEffect(()=>{
//     try{
//       let filterList = country.filter((val)=>val.name.common.toLowerCase().includes(search.toLowerCase()));
//       console.log(filterList);
//       setFilter(filterList)
//     }catch(e){
//       console.log(e)
//     }
     
//   },[search,country])

 

//   const handleSearch = (e)=>{
//     setSearch(e.target.value)
//  }

//   return (
//     <div>
//     <div className="input">
//             <input
//             type='text'
//             placeholder='search for country...'
//             onChange={handleSearch}
//             />
//     </div>

//     <div className="container">
//       {search === "" ?(
//               country.map((country,id)=>(
//                       <div className="countryCard" key={id}>
//                           <img 
                        
//                           style={{ width: "70%",
//                             height: "50%"}}
//                           src={country.flags.png}
//                           alt={country.name.common}/>
          
//                           <p 
//                           style={{ fontFamily: "Times New Roman, Times, serif",
//                           fontSize: "20px",
//                           paddingBottom: "10px",
//                           fontWeight: "600"}}>{country.name.common}</p>
//                       </div>
//                   ))
//               ):(
//               fliter.map((country,id)=>(
//               <div className="countryCard" key={id}>
//                    <img 
//                         style={{ width: "70%",
//                         height: "50%"}}
//                         src={country.flags.png}
//                         alt={country.name.common}/>

//                     <p 
//                       style={{ fontFamily: "Times New Roman, Times, serif",
//                       fontSize: "20px",
//                       paddingBottom: "10px",
//                       fontWeight: "600"}}>
//                         {country.name.common}
//                     </p>
//               </div>
//           ))
//             )}
//     </div>
//   </div>
//   )
// }

// export default Search

//-------------------------------------------------------------------------------
import { useEffect, useState } from "react";
import "./Search.css"


const  Search =  ()=> {
  const [country, setCountry] = useState([]);
  const [filter, setfilter] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch("https://restcountries.com/v3.1/all");
        const data = await resp.json();
        setCountry(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const data = country.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setfilter(data);
  }, [search,country]);


  return (
    <div>
      <div className="inp">
        <input
          type="text"
          placeholder="Enter a country"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="App">
        {search === ""
          ? country.map((country) => {
              return (
                <div className="countryCard">
                  {country.name.common!==undefined && country.flags.png!==undefined &&
                  <div>
                  <img src={country.flags.png} alt={country.flag}></img>
                  <h2>{country.name.common}</h2>
                  </div>}
                </div>
              );
            })
          : filter.map((country) => {
              return (
                <div className="countryCard">
                  {country.name.common!==undefined && country.flags.png!==undefined &&
                  <div>
                  <img src={country.flags.png} alt={country.flag}></img>
                  <h2>{country.name.common}</h2>
                  </div>}
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default Search;