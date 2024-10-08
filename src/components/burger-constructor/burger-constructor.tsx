import { BurgerConstructorUI } from '@ui';
import {
  clearIngredients,
  getConstructorItems
} from '../../slices/ConstructorSlice';

import { FC, useLayoutEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { userSelectors } from '../../slices/UserSlice';
import {
  clearCurrentOrder,
  clearData,
  getOrder,
  getOrderLoading,
  postOrder
} from '../../slices/OrderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(userSelectors.getUser);
  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getOrderLoading);
  const orderModalData = useSelector(getOrder);
  useLayoutEffect(() => {
    dispatch(clearCurrentOrder());
  }, [dispatch]);
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!userData) {
      navigate('/login');
      return;
    }
    const ingredientsId = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(postOrder(ingredientsId))
      .unwrap()
      .then(() => {
        dispatch(clearIngredients());
      });
  };

  const closeOrderModal = () => {
    dispatch(clearData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      data-cy='constructor'
      data-cy-order-button='order-button'
    />
  );
};
