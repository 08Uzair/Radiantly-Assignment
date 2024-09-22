import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import Loader from "./Loader";

const Home = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        ); // fetching 100 Pokémon for better demonstration
        setData(api.data.results);
        setFilteredData(api.data.results); // Initialize filtered data with full list
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Handler for search input
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query) {
      setFilteredData(
        data.filter((pokemon) => pokemon.name.toLowerCase().includes(query))
      );
    } else {
      setFilteredData(data); // Reset if no query
    }
  };

  // Handler to close the modal
  const closeModal = () => setSelectedItem(null);

  return (
    <>
      {!data.length ? (
        <Loader />
      ) : (
        <>
          <div className="min-h-screen bg-black bg-cover bg-fixed bg-blend-overlay">
            {/* Search Input */}
            <div className="flex justify-center items-center py-8">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-1/2 px-4 py-2 rounded-lg text-black"
                placeholder="Search Pokémon by name..."
              />
            </div>

            <div className="container relative flex flex-wrap justify-center items-center before:content-[' '] before:fixed before:top-0 before:left-[45rem] before:w-[53%] before:h-[31%] before:bg-[#f8094d] before:clip-path-[circle(70%_at_100%_-74%)] after:content-[' '] after:fixed after:top-0 after:left-0 after:w-full after:h-full after:bg-white after:clip-path-[circle(35%_at_0%_100%)] z-[11]">
              {filteredData?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="box w-72 h-[10vh] backdrop-blur-[15px] rounded-lg border border-white bg-[#ffffff14] flex items-center justify-evenly cursor-pointer m-4 z-[111] transition-transform transform hover:scale-105"
                    onClick={() => setSelectedItem(item)}
                  >
                    <img className="w-1/2" src={logo} alt={item.name} />
                    <h4 className="uppercase text-white text-center">
                      {item.name}
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Modal for displaying the card */}
          {selectedItem && (
            <div className="modal fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center backdrop-blur-sm z-50">
              <div className="modal-content bg-white rounded-lg p-6 relative w-80 text-center">
                <span
                  className="close absolute top-2 right-4 text-3xl cursor-pointer"
                  onClick={closeModal}
                >
                  &times;
                </span>
                <div className="content flex flex-col items-center justify-center text-white">
                  <img
                    className="side-img w-full mb-4"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                      data.indexOf(selectedItem) + 1
                    }.png`}
                    alt={selectedItem.name}
                  />
                  <h2 className="text-xl font-semibold uppercase text-[black]">
                    {selectedItem.name}
                  </h2>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
