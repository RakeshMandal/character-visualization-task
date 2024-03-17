import React, { useEffect, useState, useContext } from 'react'
import CharacterContext from '../context/CharacterContext';
import { Link } from 'react-router-dom';

const Characters = () => {

	const { setSelectedCharacterId } = useContext(CharacterContext);
	const [characters, setCharecters] = useState([]);
	const [page, setPage] = useState(1);
	const [searchtext, setSearchtext] = useState("");
	const [suggest, setSuggest] = useState([]);
	const [resfound, setResfound] = useState(true);

	useEffect(() => {
		getCharacterfromAPI();
	}, [page]);

	async function getCharacterfromAPI() {
		try {
			const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
			const data = await response.json();
			const results =  data.results;
			setCharecters(results);
		}
		catch (error) {
			console.error(error)
		}
	}

	
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

	// searching for character
	const handleChange = (e) => {
		let searchval = e.target.value;
		let suggestion = [];
		let charcterNameArr = characters.length ? characters.map(character => character.name): [];
		if(charcterNameArr.length === 0) getCharacterfromAPI();
		const ProgLang = charcterNameArr;
		if (searchval.length > 0) {
		  suggestion = ProgLang
			.sort()
			.filter((e) => e.toLowerCase().includes(searchval.toLowerCase()));
		  setResfound(suggestion.length !== 0 ? true : false);
		}
		setSuggest(suggestion);
		setSearchtext(searchval);
	};

	const suggestedText = (value) => {
	    characters.filter(item => {
			if (value === item.name) {
				setCharecters(item);
			}
		});
		setSearchtext(value);
		setSuggest([]);
	};

	const getSuggestions = () => {
        if (suggest.length === 0 && searchtext !== "" && !resfound) {
          return <p style={{color: '#f00'}}>Search Content Not Found</p>;
        }
        
        const suggestionItems = suggest.map((item, index) => (
          <li key={index} className='suggestions-list-item'>
            <div onClick={() => suggestedText(item)}>{item}</div>
          </li>
        ));
      
        return (
          <ul className='suggestions'>
            {suggestionItems}
          </ul>
        );
      };
      

	return (
		<>
			<h1 style={{ textAlign: "center", color: "#222222" }}>Character Visualization Application</h1>

			<div className='prev-next-btn'>
				<div className='search-btn'>
					<input onChange={handleChange} type='text' value={searchtext}
					 placeholder='Search your favorite Character' />
					{getSuggestions()}
				</div>
				<button onClick={prevPage} className='btn btn1'>Prev.</button>
				<button onClick={nextPage} className='btn btn1'>Next.</button>
			</div>

			<div className='showed-characters'>
				{characters.length ?
					characters.map((item, id) => (
						<div key={id} className='character-showing'>
							<Link to={`/character/${item.id}`} onClick={() => handleCharacterClick(item.id)}>

								<img src={item.image} alt={item.name} />
								<h3>{item.name}</h3>
							</Link>
						</div>
					)) 
					:
					<div className='character-showing'>
					<Link to={`/character/${characters.id}`} onClick={() => handleCharacterClick(characters.id)}>

						<img src={characters.image} alt={characters.name} />
						<h3>{characters.name}</h3>
					</Link>
				</div>
				}
			</div>
		</>
	)
}

export default Characters
