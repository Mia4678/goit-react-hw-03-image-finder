import React, { Component } from 'react';

// const Modal = ({ onClose, image }) => {
//   return (
//     <div className="overlay" onClick={onClose}>
//       <div className="modal">
//         <img src={image.largeImageURL} alt="" />
//       </div>
//     </div>
//   );
// };

// export default Modal;

import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyEsc);
  }

  handleKeyEsc = e => {
    if (e.code === 'Escape') this.props.toggleModal();
    //console.log('Esc');
  };

  render() {
    const { toggleModal, largeImageURL } = this.props;
    return (
      <div className={css.Overlay} onClick={toggleModal}>
        <div className={css.Modal}>
          <img
            src={largeImageURL}
            alt={largeImageURL}
            className={css.ImgModal}
          />
        </div>
      </div>
    );
  }
}
