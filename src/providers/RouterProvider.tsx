import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { MainTemplate } from '@/pages/MainTemplate';
import { Home } from '@/pages/Home';
import { Video } from '@/pages/Video';
import { Contact } from '@/pages/Contact';
import { Realizations } from '@/pages/Realizations';
import { Offer } from '@/pages/Offer';
import { Error } from '@/pages/Error';

export const RootProvider = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainTemplate />}>
        <Route path="/" element={<Home />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/realizations" element={<Realizations />} />
        <Route path="/video" element={<Video />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error />} />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
};
