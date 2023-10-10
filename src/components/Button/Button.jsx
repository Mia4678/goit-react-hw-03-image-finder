import React from 'react';
import css from './Button.module.css';

export const LoadMoreButton = ({ handleLoadMoreClick }) => {
  return (
    <button type="button" onClick={handleLoadMoreClick} className={css.Button}>
      Load more
    </button>
  );
};
