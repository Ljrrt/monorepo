import { Route, Routes } from 'react-router-dom';

import { Layout } from 'app/layout';
import { Home }   from 'app/pages/home';

import { PATHS } from 'utils';

export default function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<Layout />}>

          <Route path={PATHS.home.url} index element={<Home />} />

        </Route>

      </Routes>

    </>
  );
}
