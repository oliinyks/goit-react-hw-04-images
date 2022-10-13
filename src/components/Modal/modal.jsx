import { useEffect } from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

export default function Modal ({ url, closeModal }) {
//   const [url, setUrl] = useState(url);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  useEffect(()=> {
	window.addEventListener('keydown', handleKeyDown);
	return () => {
		window.removeEventListener('keydown', handleKeyDown)
	}
  })

  return (
    <div className="overlay" onClick={handleBackdropClick}>
      <div className="modal">
        <img className="img" src={url} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
