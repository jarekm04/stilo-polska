import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { MainTemplate } from '@/pages/MainTemplate';
import { Home } from '@/pages/Home';

export const RootProvider = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainTemplate />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<div>o nas</div>} />
        <Route path="/offer" element={<div>oferta</div>} />
        <Route path="/realizations" element={<div>realizacje</div>} />
        <Route path="/video" element={<div>video</div>} />
        <Route path="/technology" element={<div>technologia</div>} />
        <Route path="/contact" element={<div>kontakt</div>} />
        <Route path="*" element={<div>Nie ma takiej strony</div>} />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
};
