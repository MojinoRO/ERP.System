import { Sidebar } from "./Sidebar";
import { Topbar } from "./TopBar";
import "./layout.css";

export const Layout = ({ children }: any) => {
  return (
    <div className="app">
      <Sidebar />

      <div className="main">
        <Topbar />

        <div className="content">{children}</div>
      </div>
    </div>
  );
};
