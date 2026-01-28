import { Outlet } from 'react-router-dom';

export function Layout() {
  return (

    <div className="bg-neutral-1 text-neutral-12 fixed flex h-dvh w-dvw overflow-hidden">

      <div className="size-full overflow-auto">

        <Outlet />

      </div>

    </div>

  );
}
