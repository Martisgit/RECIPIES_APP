import { v4 as uuidv4 } from "uuid";
import RecipeModel from "../model/recipes.js";

let recipes = [];

const INSERT_RECIPE = async (req, res) => {
  try {
    const newRecipe = {
      id: uuidv4(),
      name: req.body.name,
      ingredients: req.body.ingredients,
      description: req.body.description,
      rating: req.body.rating,
    };

    const isNameExists = recipes.some(
      (recipe) => recipe.name === req.body.name
    );

    if (isNameExists) {
      return res.status(409).json({ message: "This recipe already exists" });
    }

    const recipe = new RecipeModel(newRecipe);

    const response = await recipe.save();

    return res
      .status(201)
      .json({ response: "Recipe was added successfully", recipe: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "We have some problems" });
  }
};

const GET_ALL_RECIPES = async (req, res) => {
  try {
    const recipes = await RecipeModel.find();
    return res.status(200).json({ recipes: recipes });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "We have some problems" });
  }
};

const GET_RECIPE_BY_ID = async (req, res) => {
  try {
    const recipe = await RecipeModel.findOne({ id: req.params.id });

    if (!recipe) {
      return res
        .status(404)
        .json({ message: `No recipe with id ${req.params.id}` });
    }

    return res.status(200).json({ recipe: recipe });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "We have some problems" });
  }
};

const GET_RANDOM_RECIPE = async (req, res) => {
  try {
    const recipes = await RecipeModel.find();
    const randomIndex = Math.floor(Math.random() * recipes.length);
    const randomRecipe = recipes[randomIndex];
    return res.status(200).json({ recipe: randomRecipe });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "We have some problems" });
  }
};

const UPDATE_RECIPE_BY_ID = async (req, res) => {
  try {
    const recipe = await RecipeModel.findOneAndUpdate(
      { id: req.params.id },
      { ...req.body },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Recipe was updated", recipe: recipe });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "We have some problems" });
  }
};

const DELETE_RECIPE_BY_ID = async (req, res) => {
  try {
    const response = await RecipeModel.findOneAndDelete({ id: req.params.id });

    if (!response) {
      return res
        .status(404)
        .json({ message: `Recipe with id ${req.params.id} does not exist` });
    }

    return res
      .status(200)
      .json({ response: "Recipe was deleted", recipe: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "We have some problems" });
  }
};

//
const GET_ALL_RECIPES_WITH_INGREDIENT = async (req, res) => {
  try {
    const ingredient = req.query.ingredient;
    if (!ingredient) {
      return res.status(400).json({ message: "Please provide an ingredient" });
    }

    const recipes = await RecipeModel.find({
      ingredients: { $regex: ingredient, $options: "i" },
    });

    return res.status(200).json({ recipes: recipes });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "We have some problems" });
  }
};

export {
  INSERT_RECIPE,
  GET_ALL_RECIPES,
  GET_RECIPE_BY_ID,
  DELETE_RECIPE_BY_ID,
  UPDATE_RECIPE_BY_ID,
  GET_ALL_RECIPES_WITH_INGREDIENT,
  GET_RANDOM_RECIPE,
};
