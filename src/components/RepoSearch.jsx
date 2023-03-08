import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RepoSearch.css";

const RepoSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [sortBy, setSortBy] = useState("stars");

  useEffect(() => {
    const fetchRepos = async () => {
      const result = await axios.get(
        `https://api.github.com/search/repositories?q=${searchQuery}&sort=${sortBy}`
      );
      setRepos(result.data.items);
    };
    fetchRepos();
  }, [searchQuery, sortBy]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <>
      <div class="sort-by">
        <input
          type="text"
          placeholder="Search repositories"
          onChange={handleSearchChange}
        />
        <select value={sortBy} onChange={handleSortChange}>
          <option value="stars">Stars</option>
          <option value="watchers_count">Watchers count</option>
          <option value="score">Score</option>
          <option value="name">Name</option>
          <option value="created_at">Created at</option>
          <option value="updated_at">Updated at</option>
        </select>
      </div>
      <div className="container">
        {repos.map((repo) => (
          <div className="card" key={repo.id}>
            <div className="img">
              <img
                src={repo.owner.avatar_url}
                alt={`${repo.owner.login}'s avatar`}
              />
            </div>
            <div className="infos">
              <div className="name">
                <h2>{repo.name}</h2>
              </div>
              <p>
                {repo.description && repo.description.length > 100
                  ? `${repo.description.substring(0, 100)}...`
                  : repo.description}
              </p>
              <ul className="stats">
                <li>
                  <h3>Stars</h3>
                  <h4>{repo.stargazers_count}</h4>
                </li>
                <li>
                  <h3>Language</h3>
                  <h4>{repo.language}</h4>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RepoSearch;
