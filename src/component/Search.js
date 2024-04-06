import React,{useEffect,useState} from 'react';
import  "./Search.css";
import axios from "axios";

const Search = () => {
  const[country,setCountry]=useState([]);
  const[search,setSearch]=useState("")
  const[fliter,setFilter]=useState([])

  useEffect(()=>{
    const fetchCountry = async()=>{
        try{
            const response = await axios.get(`https://restcountries.com/v3.1/all`); 
            console.log(response.data);
            setCountry(response.data)
        }catch(e){
            console.log("error while fetching country")
        }
    }
    fetchCountry()
  },[])


  useEffect(()=>{
    try{
      let filteredList = country.filter((val)=>val.name.common.toLowerCase().includes(search.toLowerCase()));
      console.log(filteredList);
      setFilter(filteredList)
    }catch(e){
      console.log(e)
    }
     
  },[search,country])

 

  const handleSearch = (e)=>{
    setSearch(e.target.value)
 }

  return (
    <div>
    <div className="input">
            <input
            type='text'
            placeholder='search for countries...'
            onChange={handleSearch}
            />
    </div>

    <div className="container">
        {search === "" ?(
                country.map((country,id)=>{
                  return(
                    <div className="countryCard" key={id}>
                    {country.name.common!==undefined && country.flags.png!==undefined &&
                    <div>
                    <img src={country.flags.png} alt={country.flag}></img>
                    <h2>{country.name.common}</h2>
                    </div>}
                  </div>
                  )
                })
                ):(
                  fliter.map((country,id) => {
                    return (
                      <div className="countryCard" key={id}>
                        {country.name.common!==undefined && country.flags.png!==undefined &&
                        <div>
                        <img src={country.flags.png} alt={country.flag}></img>
                        <h2>{country.name.common}</h2>
                        </div>}
                      </div>
                    );
                  })
              )}
    </div>
  </div>
  )
}

export default Search