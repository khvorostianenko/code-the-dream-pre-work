import {Route, Routes} from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import ArtworksPage from "./pages/ArtworksPage.jsx";
import ArtworkDtailPage from "./pages/ArtworkDtailPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ArtistDetailPage from "./pages/ArtistDetailPage.jsx";

export default function App() {
  return (
      <Layout>
          <Routes>
              <Route path='/' element={<ArtworksPage />}/>
              <Route path='/artworks/:id' element={<ArtworkDtailPage />}/>
              <Route path='/artists/:id' element={<ArtistDetailPage />}/>
              <Route path='*' element={<NotFoundPage />}/>
          </Routes>
      </Layout>
  );
}