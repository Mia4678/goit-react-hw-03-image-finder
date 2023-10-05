import React, { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { LoadMoreButton } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { Loader } from '../Loader/Loader';
import { fetchImages } from '../API/ApiFetch'; // Імпорт функції з api.js

export class App extends Component {
  // state = {
  //   query: '',
  //   images: [],
  //   page: 1,
  //   showModal: false,
  //   selectedImage: {},
  //   isLoading: false,
  // };
  state = {
    page: 1,
    images: null,
    searchQuery: '',
    isLoading: false,
    error: '',
    isModalOpen: false,
    largeImageURL: '',
  };

  handleSubmit = query => {
    this.setState({ query, images: [], page: 1 }, this.fetchImages);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.searchQuery !== prevState.searchQuery
    ) {
      this.fetchPhotos(prevState);
    }
  }

  fetchPhotos = async prevState => {
    try {
      this.setState({ isLoading: true });

      const data = await fetchImages(this.state.searchQuery, this.state.page);

      this.state.page === 1
        ? this.setState({ images: data.hits })
        : this.setState({ images: [...prevState.images, ...data.hits] });
    } catch (error) {
      this.setState({ isLoading: true });
      this.setState({ error: error.response.data });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  // fetchImages = () => {
  //   const { query, page } = this.state;

  //   this.setState({ isLoading: true });

  //   fetchImages(query, page) // Виклик функції з api.js
  //     .then(data => {
  //       this.setState(prevState => ({
  //         images: [...prevState.images, ...data],
  //         page: prevState.page + 1,
  //       }));
  //     })
  //     .catch(error => console.error('Error fetching images:', error))
  //     .finally(() => {
  //       this.setState({ isLoading: false });
  //     });
  // };

  handleLoadMoreClick = () => {
    let newPage = this.state.page + 1;
    this.setState({ page: newPage });
  };

  handleSearchQuery = value => {
    this.setState({ searchQuery: value, page: 1 });
  };

  // openModal = image => {
  //   this.setState({ showModal: true, selectedImage: image });
  // };

  // closeModal = () => {
  //   this.setState({ showModal: false, selectedImage: {} });
  // };
  toggleModal = () => {
    this.setState(prev => ({ isModalOpen: !prev.isModalOpen }));
  };

  handleImgClick = id => {
    const targetEl = this.state.images.find(one => one.id === id);

    this.setState({ largeImageURL: targetEl.largeImageURL });
    this.toggleModal();
  };

  render() {
    // const { images, showModal, selectedImage, isLoading } = this.state;

    // return (
    //   <div>
    //     <Searchbar onSubmit={this.handleSubmit} />
    //     <ImageGallery>
    //       {images.map(image => (
    //         <ImageGalleryItem
    //           key={image.id}
    //           image={image}
    //           onClick={() => this.openModal(image)}
    //         />
    //       ))}
    //     </ImageGallery>
    //     {isLoading && <Loader />}
    //     {images.length > 0 && !isLoading && (
    //       <Button onClick={this.fetchImages} />
    //     )}
    //     {showModal && <Modal image={selectedImage} onClose={this.closeModal} />}
    //   </div>
    // );
    const { error, isLoading, images, largeImageURL, isModalOpen } = this.state;
    return (
      <div className="App">
        {error && <h1>{error}</h1>}

        <Searchbar submit={this.handleSearchQuery} />

        {images &&
          (!images.length ? (
            <h1>No data found</h1>
          ) : (
            <ImageGallery
              images={images}
              handleImgClick={this.handleImgClick}
              toggleModal={this.toggleModal}
            />
          ))}

        {images &&
          (!images.length ? null : images.length % 12 ? (
            <h1>End of results</h1>
          ) : (
            <LoadMoreButton handleLoadMoreClick={this.handleLoadMoreClick} />
          ))}

        {isLoading && <Loader />}

        {isModalOpen && (
          <Modal toggleModal={this.toggleModal} largeImageURL={largeImageURL} />
        )}
      </div>
    );
  }
}
