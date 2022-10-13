import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Loader from '../Loader';
import './App.scss';

export default function App() {
  const [photoName, setPhotoName] = useState('');
  const [photo, setPhoto] = useState([]);
  const [page, setPage] = useState(1);
  const [currentLargeImageURL, setCurrentLargeImageURL] = useState('');
  const [searchTotal, setSearchTotal] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
	if(!photoName){
		return;
	}

    setLoader(true);
    fetch(
      `https://pixabay.com/api/?q=${photoName}&page=${page}&key=29451917-11054f18e01d02c62ffb7517a&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error());
      })
      .then(photo => {
        setSearchTotal(photo.total);
        setPhoto(prevState => [...prevState, ...photo.hits]);
      })
      .finally(setLoader(false));
  }, [photoName, page]);

  useEffect(() => {
	setPhoto([]);
  }, [photoName]);

  const handlerFormSubmit = photoName => {
    setPhotoName(photoName);
    setPage(1);
  };

  const onOpenModalWithLargeImage = url => {
    setCurrentLargeImageURL(url);
  };

  const onModalClose = () => {
    setCurrentLargeImageURL('');
  };

  const hendlerMoreClick = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <section className="section">
      <h1 className="headerTitle">
        Photo <span>Gallery</span>
      </h1>
      <Searchbar onSubmit={handlerFormSubmit} page={page} />

      {searchTotal === 0 ? (
        <p className="error">No "{photoName}" image was found</p>
      ) : (
        <ImageGallery photoName={photo} onClick={onOpenModalWithLargeImage} />
      )}

      {loader && <Loader />}
      {currentLargeImageURL && (
        <Modal closeModal={onModalClose} url={currentLargeImageURL} />
      )}
      {searchTotal > 12 && <Button onClick={hendlerMoreClick} />}
      <ToastContainer theme="dark" autoClose={3000} />
    </section>
  );
}
