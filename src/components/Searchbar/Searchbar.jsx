import Notiflix from "notiflix";
import { FaSearch } from "react-icons/fa";
import PropTypes from "prop-types";
import css from "./Searchbar.module.css";

export const Searchbar = ({ handleSubmit }) => {
    const handleFormSubmit = evt => {
        evt.preventDefault();

        const { value } = evt.currentTarget.elements[1];
        const regex = /^[a-zA-Z0-9]+$/;

        if (!regex.test(value)) {
            return Notiflix.Notify.failure("The input value should contain only letters and digits!");
        }

        value === ''
            ? Notiflix.Notify.failure("Please try again. Enter a search term in the search field.")
            : handleSubmit(value.toLowerCase().trim());
        
        evt.currentTarget.reset();
    };

    return (
        <header className={css.searchbar}>
            <form className={css.searchform} onSubmit={handleFormSubmit}>
                <button type="submit" className={css.button}>
                    <FaSearch size={24} />
                </button>

                <input
                    className={css.input}
                    type="text"
                    autoComplete="off"
                    name="search"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    )
};

Searchbar.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};