import { Route, Routes } from 'react-router-dom';

import { Layout }              from 'app/layouts/layout';
import { Home }                from 'app/pages/home';
import { DocumentationLayout } from 'app/layouts/documentation-layout';
import { DocumentationPage }   from 'app/pages/documentation-page';
import { PATHS }               from 'utils';

export default function App() {
  return (
    <>
      <Routes>

        <Route path={PATHS.home} element={<Layout />}>

          <Route index element={<Home />} />

          <Route path={PATHS.docs} element={<DocumentationLayout />}>
            <Route path=":slug" element={<DocumentationPage />} />
          </Route>

        </Route>

      </Routes>

    </>
  );
}
