import React from 'react';
import css from './ImageGalleryItem.module.css';
// const ImageGalleryItem = ({ image }) => {
//   return (
//     <li className="gallery-item">
//       <img src={image.webformatURL} alt="" />
//     </li>
//   );
// };

// export default ImageGalleryItem;

export const ImageGalleryItem = ({
  id,
  webformatURL,
  tags,
  handleImgClick,
}) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        id={id}
        className={css.ImageGalleryItemImage}
        onClick={() => handleImgClick(id)}
      />
    </li>
  );
};
