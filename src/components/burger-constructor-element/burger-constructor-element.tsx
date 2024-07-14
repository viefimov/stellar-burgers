import { FC, memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import {
  changeIngredientsOrder,
  removeIngredients
} from '../../slices/ConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = useCallback(() => {
      if (index < totalItems - 1) {
        dispatch(
          changeIngredientsOrder({
            initialIndex: index,
            finishIndex: index + 1
          })
        );
      }
    }, [dispatch, index, totalItems]);

    const handleMoveUp = useCallback(() => {
      if (index > 0) {
        dispatch(
          changeIngredientsOrder({
            initialIndex: index,
            finishIndex: index - 1
          })
        );
      }
    }, [dispatch, index]);

    const handleClose = useCallback(() => {
      dispatch(removeIngredients(ingredient.id));
    }, [dispatch, ingredient.id]);

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
