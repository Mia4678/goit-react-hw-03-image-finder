import React from 'react';
import css from './Button.module.css';

// function Button({ onClick, disabled }) {
//   return (
//     <button
//       type="button"
//       className="Button"
//       onClick={onClick}
//       disabled={disabled}
//     >
//       Load more
//     </button>
//   );
// }

// export default Button;

export const LoadMoreButton = ({ handleLoadMoreClick }) => {
  return (
    <button type="button" onClick={handleLoadMoreClick} className={css.Button}>
      Load more
    </button>
  );
};
