const Filter = ({ searchPhrase, handleChangePhrase }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={searchPhrase} onChange={handleChangePhrase} />
    </div>
  );
};

export default Filter;
