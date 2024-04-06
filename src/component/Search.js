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
    <>
    <div className="input">
            <input
            type='text'
            placeholder='search for countries...'
            onChange={handleSearch}
            />
    </div>

    <div className="container">
    {search === "" ?(
            country.map((country,id)=>(
                    <div className="countryCard" key={id}>
                         <img 
                         className="img"
                         src={country.flags.png}
                         alt={country.name.common}/>
        
                         <p className="name">{country.name.common}</p>
                    </div>
                ))
            ):(
            fliter.map((country,id)=>(
            <div className="countryCard" key={id}>
                 <img 
                 className="img"
                 src={country.flags.png}
                 alt={country.name.common}/>

                 <p className="name">{country.name.common}</p>
            </div>
        ))
  )}
    </div>
  </>
  )
}

export default Search