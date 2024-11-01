import NavMenu from "../Shared/NavMenu/NavMenu";
import { Outlet, useLocation } from "react-router-dom";

const Root = () => {
  const location = useLocation();
  const exist = ["gacha", "search","favorite"].some((path) =>
    location.pathname.includes(path)
  );

  return (
    <div>
      {/* Only render NavMenu on the "gacha" or "search" routes */}
      {exist && <NavMenu />}
      <Outlet />
    </div>
  );
};

export default Root;
