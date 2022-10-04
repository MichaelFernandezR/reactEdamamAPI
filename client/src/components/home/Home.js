import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import axios from "axios";
import "../../App.css";

function Home() {

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("chicken");

    useEffect(() => {
        getRecipes();
    }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

    const getRecipes = async () => {
        const response = await axios.get(`http://localhost:5000/recipes/${query}`);
        setRecipes(response.data);
        console.log(response.data);
       
    };

    const updateSearch = (e) => {
        setSearch(e.target.value);
    };

    const getSearch = (e) => {
        e.preventDefault();
        setQuery(search);
        setSearch("");
    };

    return (
        <div className="App">
            <form onSubmit={getSearch} className="search-form">
                <input
                    className="search-bar"
                    type="text"
                    value={search}
                    onChange={updateSearch} />
                <button className="search-button" type="submit">
                    Search
                </button>
            </form>
            <div className="recipes">
                {recipes.map((recipe) => (
                    <Recipe
                        key={recipe.recipe.label}
                        title={recipe.recipe.label}
                        image={recipe.recipe.image}
                        ingredients={recipe.recipe.ingredients} />
                ))}
            </div>
        </div>
    );
}

export default Home;
