import PropTypes from "prop-types";
import { ImageGalleryItem } from "components";
import css from "./ImageGallery.module.css";

export const ImageGallery = ({ images, showModal }) => {
    return (
        <ul className={css.gallery}>
            {images.map(img => {
                const { largeImageURL, id, webformatURL, tags } = img;
                return (
                    <ImageGalleryItem
                        showModal={() => showModal(largeImageURL)}
                        key={id}
                        smallImg={webformatURL}
                        alt={tags}
                    />
                );
            })}
        </ul>
    )
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    })),
};