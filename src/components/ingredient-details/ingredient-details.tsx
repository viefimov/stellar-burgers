import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector, useDispatch } from '../../services/store';
import { setSelectedIngredient } from '../../slices/IngredientsSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const ingredientData = useSelector(
    (state) => state.ingredients.selectedIngredient
  );
  const ingredients = useSelector((state) => state.ingredients.items);

  useEffect(() => {
    if (ingredients.length > 0) {
      const selectedIngredient = ingredients.find(
        (ingredient) => ingredient._id === id
      );
      if (selectedIngredient) {
        dispatch(setSelectedIngredient(selectedIngredient));
      }
    }
  }, [id, ingredients, dispatch]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
