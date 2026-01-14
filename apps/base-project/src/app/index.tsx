import { CommonHelpers } from '@monorepo/common';

import { Route, Routes } from 'react-router-dom';

import { Layout } from 'app/layout';
import { Home }   from 'app/pages/home';

import { NAVBAR_PATHS } from 'utils';

export default function App() {
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const tab       = pathParts.length >= 2 ? pathParts[pathParts.length - 2] : null;
  const appName   = 'TWISTERS';

  CommonHelpers.setTabName(tab ? (tab).toUpperCase() : appName);
  return (
    <>
      <Routes>

        <Route path="/" element={<Layout />}>

          <Route path={NAVBAR_PATHS.home.url} index element={<Home />} />

        </Route>

      </Routes>

    </>
  );
}
