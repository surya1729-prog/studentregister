import React from "react";

export default function ProfileArea(){
  return (
    <div className="profile-pill">
      <div style={{width:36, height:36, borderRadius:8, background:"linear-gradient(135deg,#2dd4bf,#06b6d4)", color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700}}>S</div>
      <div style={{fontSize:13}}>
        <div style={{fontWeight:600}}>Surya</div>
        <div style={{fontSize:12, color:"var(--muted)"}}>surya@example.com</div>
      </div>
    </div>
  );
}
