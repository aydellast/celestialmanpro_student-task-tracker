import Topbar from "./Topbar";

import BottomNav from "./BottomNav";

import FabButton from "./FabButton";

import "../../styles/global.css";

import "../../styles/layout.css";

function MainLayout({
  children,
  onFabClick,
  showFab = false,
}) {
  return (
    
    <div className="mobile-container">

      <Topbar />

      <div className="page-content">
        {children}
      </div>

      {showFab && <FabButton onClick={onFabClick} />}

      <BottomNav />

    </div>

    

  );
}

export default MainLayout;