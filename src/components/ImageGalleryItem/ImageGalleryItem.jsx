import PropTypes from "prop-types";
import css from "./ImageGalleryItem.module.css";

export const ImageGalleryItem = ({smallImg, showModal, alt}) => {
    return (
        <li className={css.gallery_item} onClick={showModal}>
            <img src={smallImg} alt={alt} />
        </li>
    )
}

ImageGalleryItem.propTypes = {
    showModal: PropTypes.func.isRequired,
    smallImg: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};