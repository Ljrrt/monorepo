import { Route, Routes } from 'react-router-dom';

import { Layout }                     from 'app/layouts/layout';
import { Home }                       from 'app/pages/home';
import { DocumentationLayout }        from 'app/layouts/documentation-layout';
import { DynamicDocumentationLoader } from 'app/pages/docs/dynamic-documentation-loader';
import { PATHS }                      from 'utils';

export default function App() {
  return (
    <>
      <Routes>

        <Route path={PATHS.home} element={<Layout />}>

          <Route index element={<Home />} />

          <Route path={PATHS.docs} element={<DocumentationLayout />}>
            <Route path=":slug" element={<DynamicDocumentationLoader />} />
          </Route>

        </Route>

      </Routes>

    </>
  );
}
