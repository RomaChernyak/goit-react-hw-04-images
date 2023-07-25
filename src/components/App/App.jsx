import React, { Component } from "react";
import { Searchbar, ImageGallery, Button, Modal, Loader } from "components";
import Notiflix from "notiflix";
import { fetchGalleryImg } from "../../Services/pixabay-api";
import css from "./App.module.css";

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    isLoading: false,
    loadMore: false,
    page: 1,
    error: null,
    total: 0,

    isModalVisible: false,
    modalImage: ''
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const response = await fetchGalleryImg(searchQuery, page);
        const total = response.totalHits;

        if (response.hits.length === 0) {
          return Notiflix.Notify.failure("Sorry, no matches were identified with your query.");
        }

        this.setState(({ images }) => ({
          images: [...images, ...response.hits],
          total,
          loadMore: this.state.page < Math.ceil(total / 12 )
        }));
      }
      catch (error) {
        this.setState({ error });
      }
      finally {
        this.setState({ isLoading: false });
      };
    };
  };

  handleSubmit = value => {
    if (value.toLowerCase().trim() === "") {
      return Notiflix.Notify.failure("Unfortunately, there are no more images. You've reached the last page with search results.");
    }
    
    this.setState({
      searchQuery: value,
      images: [],
      page: 1,
    })
  };

  onLoadMore = () => {
    this.setState(prevState => ({
        page: prevState.page + 1,
    }));
  };

  showModal = largeImageURL => {
    this.setState({
      isModalVisible: true,
      modalImage: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  render() {
    const { images, isModalVisible, modalImage, isLoading, total } = this.state;
    const qtyPages = total / images.length;
    const isImageGalleryVisible = images.length > 1;
    const isLoadMoreVisible = qtyPages > 1 && !isLoading && images.length !== 0;

    return (
      <div className={css.app}>

        <Searchbar handleSubmit={this.handleSubmit} />

        {isLoading && <Loader />}

        {isImageGalleryVisible &&
          <ImageGallery
            images={images}
            showModal={this.showModal}
          />
        }

        {isLoadMoreVisible && (
          <Button
            onLoadMore={this.onLoadMore}
            text={"Load more"}
          />
        )}

        {isModalVisible && (
          <Modal
            closeModal={this.closeModal}
            modalImage={modalImage}
          />
        )}
        
      </div>
    );
  }
};