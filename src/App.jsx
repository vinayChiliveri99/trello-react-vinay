import { useState } from 'react';
import Boards from './components/Boards';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import BoardDisplay from './components/BoardDisplay';

function App() {
  const [createPopoverAnchor, setCreatePopoverAnchor] =
    useState(null);

  const handleCreateClick = (event) => {
    setCreatePopoverAnchor(event.currentTarget);
  };

  const handleCreateClose = () => {
    setCreatePopoverAnchor(null);
  };

  return (
    <>
      <Header
        createPopoverAnchor={createPopoverAnchor}
        handleCreateClick={handleCreateClick}
        handleCreateClose={handleCreateClose}
      />
      <Routes>
        {/* same path for both home('/') and boards ('/boards') */}
        <Route
          path="/boards"
          element={<Boards handleCreateClick={handleCreateClick} />}
        ></Route>
        <Route
          path="/"
          element={<Boards handleCreateClick={handleCreateClick} />}
        ></Route>

        <Route path="/boards/:id" element={<BoardDisplay />}></Route>
      </Routes>
    </>
  );
}

export default App;
