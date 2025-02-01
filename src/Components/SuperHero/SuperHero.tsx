import React, { useEffect, useState } from "react";
import { SuperHeroInterface } from "../../types/super-hero";
import axios from "axios";
import './SuperHero.css';

export const SuperHero = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);  // State for controlling popup visibility
  const [superHeros, setSuperHeros] = useState<SuperHeroInterface[]>([]); // State to hold the list of superheroes fetched from the server
  // State to manage the form input for creating a new superhero
  const [newHero, setNewHero] = useState({
    name: '',
    superPower: '',
    humilityScore: 0,
  });

  const createSuperHero = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/superhero/create-superhero`, newHero);
      if (response && response.data) {
        getAllSuperHeros();
        // Reset form fields
        setNewHero({
          name: '',
          superPower: '',
          humilityScore: 0,
        });
        setIsPopupVisible(false);
      }
    } catch (error) {
      console.error("Error creating superhero:", error);
    }
  }

  const getAllSuperHeros = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/superhero/get-all-superheros`);
      if (response && response.data) {
        setSuperHeros(response.data);
      }
    } catch (error) {
      console.error("Error fetching superheroes:", error);
    }
  }

  //toggle Popup
  const togglePopUp = () => {
    setIsPopupVisible(true);
  }

  //close Popup
  const closePopUp = () => {
    setIsPopupVisible(false);
  }

  useEffect(() => {
    // Call the function to fetch all superheroes when the component mounts
    getAllSuperHeros();
  }, []);

  return (
    <div className="container">

      {/* Header */}
      <div className="header">
        <h1>Super Hero</h1>
        <div>
          <button className="primary-button" onClick={togglePopUp}>+ Super Hero</button>
        </div>
      </div>

      {/* Popup for creating a superhero */}
      {isPopupVisible && (
        <div className="popup">
          <form onSubmit={createSuperHero} className="superhero-form">
            <h2>Create New Superhero</h2>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newHero.name}
                onChange={(e) => setNewHero({ ...newHero, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="superPower">Super Power</label>
              <input
                type="text"
                id="superPower"
                name="superPower"
                value={newHero.superPower}
                onChange={(e) => setNewHero({ ...newHero, superPower: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="humilityScore">Humility Score</label>
              <input
                type="number"
                id="humilityScore"
                name="humilityScore"
                value={newHero.humilityScore}
                onChange={(e) => setNewHero({ ...newHero, humilityScore: +e.target.value })}
                required
              />
              {newHero.humilityScore < 0 || newHero.humilityScore > 10 ? (
                <p className="error-message">Humility score must be between 0 and 10.</p>
              ) : null}
            </div>

            <div className="buttons">
              <div>
                <button type="submit" className="primary-button sup-btn">Create Superhero</button>
              </div>
              <div>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={closePopUp}
                >
                  Cancel
                </button>
              </div>
            </div>

          </form>
        </div>
      )}

      {/* Table to display superheros data */}
      <table className="superhero-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Super Power</th>
            <th>Humility Score</th>
          </tr>
        </thead>
        <tbody>
          {superHeros.length > 0 ? (
            superHeros.map((hero, index) => (
              <tr key={index}>
                <td>{hero?.name}</td>
                <td>{hero?.superPower}</td>
                <td>{hero?.humilityScore}</td>
              </tr>
            ))
          ) : (
            <tr className="text-center">
              <td colSpan={3}>No superheroes available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
