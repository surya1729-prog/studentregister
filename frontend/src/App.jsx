import { Routes, Route, Link } from "react-router-dom";
import StudentList from "./pages/StudentList";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import Footer from "./components/Footer";
import Sidebar from "./components/SideBar";
import DarkModeToggle from "./components/DarkModeToggle";
import ProfileArea from "./components/ProfileArea";

export default function App(){
  return (
    <div className="app-container">
      <div className="header-row">
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div className="logo-badge">SR</div>
          <div>
            <div style={{fontWeight:700}}>StudentHub</div>
            <div style={{fontSize:12,color:'var(--muted)'}}>Manage students simply</div>
          </div>
        </div>

        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <DarkModeToggle />
          <Link to="/add" className="btn btn-primary">+ Add Student</Link>
          <ProfileArea />
        </div>
      </div>

      <div className="app-with-sidebar" style={{marginTop:12}}>
        <Sidebar />
        <div className="main-area">
          <Routes>
            <Route path="/" element={<StudentList/>} />
            <Route path="/add" element={<AddStudent/>} />
            <Route path="/edit/:id" element={<EditStudent/>} />
          </Routes>
        </div>
      </div>

      <Footer />
    </div>
  );
}
