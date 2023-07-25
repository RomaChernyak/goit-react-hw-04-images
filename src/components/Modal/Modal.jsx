import { useEffect } from "react";
import PropTypes from "prop-types";
import css from "./Modal.module.css";

export const Modal = ({ closeModal, modalImage }) => {
    useEffect(() => {
        const handleKeyDown = evt => {
            if (evt.code === "Escape") {
                closeModal();
            };
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
        
    }, [closeModal]);
    
    const handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            closeModal();
        }
    };

    return (
        <div className={css.overlay} onClick={handleBackdropClick}>
            <div className={css.modal}>
                <img src={modalImage} alt={modalImage} />
            </div>
        </div>
    );
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    modalImage: PropTypes.string.isRequired,
};