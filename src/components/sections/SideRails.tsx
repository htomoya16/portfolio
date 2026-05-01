// Server component — side rails inside the hero section

export default function SideRails() {
  return (
    <>
      <div className="side-rail left" aria-hidden="true">
        <span className="label">SCROLL</span>
        <div className="line" />
        <div className="diamond" />
      </div>
      <div className="side-rail right" aria-hidden="true">
        <div className="square-lime" />
        <div className="line" />
        <div className="diamond" />
      </div>
    </>
  )
}
