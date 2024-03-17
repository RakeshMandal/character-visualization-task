import React, { useEffect, useState, useContext } from 'react'
import CharacterContext from '../context/CharacterContext';
import { Link } from 'react-router-dom';

const Characters = () => {

    const { setSelectedCharacterId } = useContext(CharacterContext);
    const [characters,setCharecters] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(()=>{
       async function getCharacterfromAPI(){
            try{
                const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
                const data = await response.json()
                setCharecters(data.results)
            }
            catch(error)
            {
                console.error(error)
            }
        }
        getCharacterfromAPI()
    },[page]);

    const handleCharacterClick = (id) => {
        setSelectedCharacterId(id);
      };

      const nextPage = () => {
        setPage(prevPage => prevPage + 1);
      };
    
      const prevPage = () => {
        if (page > 1) {
          setPage(prevPage => prevPage - 1);
        }
      };


  return (
    <>
    <h1 style={{textAlign:"center",color:"#222222"}}>Character Visualization Application</h1>
    <div className='prev-next-btn'>
    <button onClick={prevPage} className='btn'>Previous Page</button>
    <button onClick={nextPage} className='btn nextbtn'>Next Page</button>
    </div>
   
    <div className='showed-characters'>
      {
        characters.map((item,id)=>(
            <div key={id} className='character-showing'>
            <Link to={`/character/${item.id}`} onClick={() => handleCharacterClick(item.id)}>

                <img src={item.image} alt={item.name}/>
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
