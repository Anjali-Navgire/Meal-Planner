import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateRecipe() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/recipes", {
        name,
        description,
        ingredients: ingredients.split(",").map((i) => i.trim()),
        image,
      });
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  return (
    <div >
      <h2>Create New Recipe</h2>
      <form className="create-recipe" onSubmit={handleSubmit} >
        <div className="recipeName">
        <input
          type="text"
          placeholder="Recipe Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        </div>
        <div className="description">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </div>
        <div className="ingredients">
        <input
          type="text"
          placeholder="Ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        </div>
        <div className="image">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && <img src={image} alt="Preview" width="150" />}
        </div>
        <div className="submit">
        <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}
