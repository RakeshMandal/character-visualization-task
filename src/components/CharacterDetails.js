import React, { useEffect,useContext,useState } from 'react'
import CharacterContext from '../context/CharacterContext';
import { Link } from 'react-router-dom';
import {API_URL} from '../constant/apiConstant'

const CharacterDetails = () => {
    const { selectedCharacterId } = useContext(CharacterContext);
    const [character, setCharacter] = useState(null);

  useEffect(()=>{

    if(selectedCharacterId){
        async function getCharacterDetails(){
            try{
                const response = await fetch(`${API_URL}/${selectedCharacterId}`)
                const data = await response.json()
                setCharacter(data)
            }
            catch(error)
            {
                console.error(error)
            }
        }
        getCharacterDetails()
        
    }

  },[selectedCharacterId]);

  if (!character) {
    return <div>Loading...</div>;
  }

  /* for-applying css on status condition */

  let className;
  if(character.status === 'Alive'){
    className = 'active-status'
  }
  else if(character.status === 'Dead'){
    className = 'dead-status'
  }
  else{
    className = 'unknown-status'
  }
    
  return (
    <>
    <h1 style={{textAlign:"center"}}> Character information..</h1>
    <div className='character-details'>
        <div className='char-image'><img src={character.image} alt={character.name} /></div>
     <div className='cd-all'>
        <h2><span className='char-datas'>Name:</span> {character.name}</h2>
            <p><span className='char-datas'>Species:</span> {character.species}</p>
            <p><span className='char-datas'>Gender:</span> {character.gender}</p>
            <p><span className='char-datas'>Status:</span> 
            <span className= {className}> {character.status}</span></p>
            <p><span className='char-datas'>Last location: </span> {character.origin.name}</p>
            <p><span className='char-datas'>First Location:</span>  {character.location.name}</p>
               
        </div>
    </div>
    <div className='back-to-home-btn'>
    <Link to='/'><button className='btn'>Home</button></Link>
    </div>
    </>
  )
}

export default CharacterDetails
