import React from "react";
import PropTypes from "prop-types";
import css from "./Button.module.css";

export const Button = ({ onLoadMore, text }) => {
    return (
        <button
            className={css.button_loadmore}
            onClick={onLoadMore}>
            {text}
        </button>
    )
}

Button.propTypes = {
    onLoadMore: PropTypes.func,
    text: PropTypes.string.isRequired,
};