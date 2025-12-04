export default function Footer() {
  return (
    <footer>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "10px 20px"
      }}>
        
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{
            width: 42, height: 42,
            borderRadius: 8,
            background: "linear-gradient(135deg,#2dd4bf,#06b6d4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontWeight: 700
          }}>
            SR
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>StudentHub</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>
              Made with ❤️ by Surya
            </div>
          </div>
        </div>

        <div style={{ color: "#6b7280", fontSize: 13 }}>
          © {new Date().getFullYear()} • All Rights Reserved
        </div>

      </div>
    </footer>
  );
}
