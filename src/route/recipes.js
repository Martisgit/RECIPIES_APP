import express from "express";
import {
  INSERT_RECIPE,
  GET_ALL_RECIPES,
  GET_RECIPE_BY_ID,
  GET_RANDOM_RECIPE,
  GET_ALL_RECIPES_WITH_INGREDIENT,
  UPDATE_RECIPE_BY_ID,
  DELETE_RECIPE_BY_ID,
} from "../controller/recipes.js";

const router = express.Router();

router.post("/recipes", INSERT_RECIPE);
router.get("/recipes", GET_ALL_RECIPES);
router.get("/recipes/random", GET_RANDOM_RECIPE);
router.get("/recipes/search", GET_ALL_RECIPES_WITH_INGREDIENT);
router.get("/recipes/:id", GET_RECIPE_BY_ID);
router.put("/recipes/:id", UPDATE_RECIPE_BY_ID);
router.delete("/recipes/:id", DELETE_RECIPE_BY_ID);

export default router;
