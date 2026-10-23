import { Navigate, Route, createBrowserRouter, createRoutesFromElements, useParams, RouterProvider } from 'react-router-dom';
import { MainTemplate } from '@/templates/MainTemplate';
import { Home } from '@/pages/Home';
import { Video } from '@/pages/Video';
import { Contact } from '@/pages/Contact';
import { Realizations } from '@/pages/Realizations';
import { Offer } from '@/pages/Offer';
import { ErrorPage } from '@/pages/ErrorPage';
import { Details } from '@/pages/Details';

/** Stary adres szczegółów oferty (/offer/:id) – przenosimy razem z identyfikatorem. */
const LegacyOfferDetails = () => {
  const { id } = useParams();
  return <Navigate to={`/oferta/${id}`} replace />;
};

export const RootProvider = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainTemplate />}>
        <Route path="/" element={<Home />} />
        <Route path="/oferta" element={<Offer />} />
        <Route path="/oferta/:id" element={<Details />} />
        <Route path="/realizacje" element={<Realizations />} />
        <Route path="/video" element={<Video />} />
        <Route path="/kontakt" element={<Contact />} />

        {/* przekierowania z poprzednich, angielskich adresów – zapisane linki dalej działają */}
        <Route path="/offer" element={<Navigate to="/oferta" replace />} />
        <Route path="/offer/:id" element={<LegacyOfferDetails />} />
        <Route path="/realizations" element={<Navigate to="/realizacje" replace />} />
        <Route path="/contact" element={<Navigate to="/kontakt" replace />} />

        <Route path="*" element={<ErrorPage />} />
      </Route>,
    ),
    {
      basename: import.meta.env.BASE_URL,
    },
  );
  return <RouterProvider router={router} />;
};
