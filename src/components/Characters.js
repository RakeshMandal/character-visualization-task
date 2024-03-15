import React, { useEffect, useState, useContext } from 'react'
import {API_URL} from '../constant/apiConstant'
import CharacterContext from '../context/CharacterContext';
import { Link } from 'react-router-dom';

const Characters = () => {

    const { setSelectedCharacterId } = useContext(CharacterContext);
    const [characters,setCharecters] = useState([]);

    useEffect(()=>{
       async function getCharacterfromAPI(){
            try{
                const response = await fetch(API_URL)
                const data = await response.json()
                setCharecters(data.results)
            }
            catch(error)
            {
                console.error(error)
            }
        }
        getCharacterfromAPI()
    },[]);

    const handleCharacterClick = (id) => {
        setSelectedCharacterId(id);
      };


  return (
    <>
    <h1 style={{textAlign:"center"}}>Character Visualization Application</h1>
   
    <div className='showed-characters'>
      {
        characters.map((item,id)=>(
            <div key={id}>
            <Link to={`/character/${item.id}`} onClick={() => handleCharacterClick(item.id)}>

                <img src={item.image} />
                <h3>{item.name}</h3>
             </Link>
            </div>
        ))
      }
    </div>
    </>
  )
}

export default Characters
