import React,{useEffect,useState} from 'react';
import styles from "./Search.module.css";
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
    <div className={styles.input}>
            <input
            type='text'
            placeholder='search for countries...'
            onChange={handleSearch}
            />
    </div>
    {search === "" ?(
            <div className={styles.container}>
            {
                country.map((country,id)=>(
                    <div className={styles.countryCard} key={id}>
                         <img 
                         className={styles.img}
                         src={country.flags.png}
                         alt={country.name.common}/>
        
                         <p className={styles.name}>{country.name.common}</p>
                    </div>
                ))
            }
             
          </div>
    ):(
        <div className={styles.container}>
    {
        fliter.map((country,id)=>(
            <div className={styles.countryCard} key={id}>
                 <img 
                 className={styles.img}
                 src={country.flags.png}
                 alt={country.name.common}/>

                 <p className={styles.name}>{country.name.common}</p>
            </div>
        ))
    }
     
  </div>
    )}
    
    
    
     
    </>
  )
}

export default Search