import './cardsCss.css';

const CardGrid = ({ gridItems = null }) => {
  return (
    <section className="p-4 w-full flex flex-col items-center gap-2">
      {gridItems?.map((o) => o)}
    </section>
  );
};

export default CardGrid;
