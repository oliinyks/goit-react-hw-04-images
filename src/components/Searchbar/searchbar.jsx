import { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import './searchbar.scss';

export default function Searchbar({ onSubmit }) {
  const [searchName, setSearchName] = useState('');

  const handleNameChange = e => {
    setSearchName(e.currentTarget.value.toLowerCase());
  };
  const handleSearch = e => {
    e.preventDefault();

    if (searchName.trim() === '') {
      return toast.error('Please select an image');
    }
    onSubmit(searchName);
    setSearchName('');
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSearch}>
        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchName}
          onChange={handleNameChange}
        />
        <button type="submit" className="button">
          <AiOutlineSearch />
        </button>
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
