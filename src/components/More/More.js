import './More.css'
function More({ handleLoadMore }) {
  return (
    <div className="more">
      <button className="more__button" onClick={handleLoadMore}>
        Ещё
      </button>
    </div>
  );
}
export default More;