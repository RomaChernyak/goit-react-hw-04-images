import { useEffect, useState } from "react";
import { Searchbar, ImageGallery, Button, Modal, Loader } from "components";
import Notiflix from "notiflix";
import { fetchImages } from "../../Services/pixabay-api";
import css from "./App.module.css";

export const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState(0);


  useEffect(() => {
    if (!searchQuery) {
      return
    };

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetchImages(searchQuery, page);
        const total = response.totalHits;

        if (response.hits.length === 0) {
          return Notiflix.Notify.failure("Sorry, no matches were identified with your query.");
        }

        setImages(prevPhotos => [...prevPhotos, ...response.hits])
        setTotal(response.totalHits)
        setLoadMore(page < Math.ceil(total / 12))

      } catch (error) {
        setError(error.message);

      } finally {
        setIsLoading(false);

      };
    }
    
    fetchData();
  }, [searchQuery, page]);

  const handleSubmit = searchQuery => {
    if (searchQuery.toLowerCase().trim() === "") {
      return Notiflix.Notify.failure("Unfortunately, there are no more images. You've reached the last page with search results.");
    }
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
    setError(null);
  }

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showModal = largeImageURL => {
    setIsModalVisible(true);
    setModalImage(largeImageURL);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const qtyPages = total / images.length;
  const isImageGalleryVisible = images.length > 1;
  const isLoadMoreVisible = qtyPages > 1 && !isLoading && images.length !== 0;

  return (
    <div className={css.app}>

      <Searchbar onSubmit={handleSubmit} />

      {isLoading && <Loader />}

      {isImageGalleryVisible &&
        <ImageGallery
          images={images}
          showModal={showModal}
        />
      }

      {isLoadMoreVisible && (
        <Button
          onLoadMore={onLoadMore}
          text={"Load more"}
        />
      )}

      {isModalVisible && (
        <Modal
          closeModal={closeModal}
          modalImage={modalImage}
        />
      )}
      
    </div>
  );
};