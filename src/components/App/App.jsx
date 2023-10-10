import React, { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { LoadMoreButton } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { Loader } from '../Loader/Loader';
import { fetchImages } from '../API/ApiFetch'; // Імпорт функції з api.js
import css from './App.module.css';

const ITEMS_PER_PAGE = 12;

export class App extends Component {

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

  componentDidUpdate(_, prevState) {
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

  updateImages = (hits, totalHits) => {
    this.setState(prev => ({
      images: [...prev.images, ...hits],
      quantityPage: Math.ceil(totalHits / ITEMS_PER_PAGE),
    }));
  };

  handleLoadMoreClick = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleSearchQuery = value => {
    this.setState({ searchQuery: value, page: 1 });
  };

  toggleModal = () => {
    this.setState(prev => ({ isModalOpen: !prev.isModalOpen }));
  };

  handleImgClick = id => {
    const targetEl = this.state.images.find(one => one.id === id);

    this.setState({ largeImageURL: targetEl.largeImageURL });
    this.toggleModal();
  };

  render() {

    const { error, isLoading, images, largeImageURL, isModalOpen } = this.state;
    return (
      <div className={css.App}>
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
