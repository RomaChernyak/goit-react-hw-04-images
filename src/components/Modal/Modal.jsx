import React, { Component } from "react";
import PropTypes from "prop-types";
import css from "./Modal.module.css";

export class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = event => {
        if (event.code === 'Escape') {
            this.props.closeModal();
        }
    };

    handleClick = event => {
        if (event.currentTarget === event.target) {
            this.props.closeModal();
        }
    };

    render() {
        const { modalImage } = this.props;
        
        return (
            <div className={css.overlay} onClick={this.handleClick}>
                <div className={css.modal}>
                    <img src={modalImage} alt={modalImage} />
                </div>
            </div>
        );
    };
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    modalImage: PropTypes.string.isRequired,
};