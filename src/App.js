import './App.css';
import { useState } from 'react';
import CharacterContext from './context/CharacterContext';
import CharacterDetails from './components/CharacterDetails';
import Characters from './components/Characters';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  return (
    <>
    <CharacterContext.Provider value={{ selectedCharacterId, setSelectedCharacterId }}>
        <Router>
        <Routes>
          <Route path="/" exact element={<Characters />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
        </Router>
      </CharacterContext.Provider>
    </>
  );
}

export default App;
