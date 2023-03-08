import React from 'react';
import RepoSearch from './components/RepoSearch';
import './App.css';

const App = () => {
  return (
    <div className="main-container">
      <h1>Search for Github repositories</h1>
      <RepoSearch />
    </div>
  );
};

export default App;
