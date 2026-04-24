export function SideRails() {
  return (
    <>
      <div className="side-rail left">
        <div className="label">SCROLL</div>
        <div className="line" />
        <div className="diamond" />
        <div className="square-lime" />
      </div>
      <div className="side-rail right">
        <div style={{ width: 8, height: 8, background: '#2547E6', marginBottom: 12 }} />
        <div className="line" />
      </div>
    </>
  )
}
