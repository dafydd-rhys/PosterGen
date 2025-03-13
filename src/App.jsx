import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero';
import Anchor from './components/Anchor';
import Searchbar from './components/Searchbar';
import { useState, useEffect } from 'react';
import Loading from './components/Loading';
import Footer from './components/Footer';
import Grid from './components/Grid';
import PosterEditor from './components/PosterEditor/PosterEditor'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [albumId, setAlbumId] = useState(null);

  function onClickAlbum(id){
    setAlbumId(id);
  }

  function handleClickBack(){
    setAlbumId(null);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const onSearch = (newQuery) => {
    setQuery(newQuery);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <Hero />
          <Anchor text={t('anchorArt')} type={1} />
          
          {albumId ? (
            <PosterEditor albumID={albumId} handleClickBack={handleClickBack}/>
          ) : (
            <>
              <Searchbar onSearch={onSearch} />
              {query && <Grid query={query} onclick={onClickAlbum} />}

              <div style={{ display: query ? 'none' : 'block' }}>
                <Anchor text={t('TryTrend')} type={2}/>
                <Grid onclick={onClickAlbum} />
              </div>
            </>
          )}

          <Footer />
        </>
      )}
    </>
  );
}

export default App;
