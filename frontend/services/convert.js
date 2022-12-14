const convertLineBreakToBr = (description) =>
  description
    ? description.split("\n").map((par, parIndex) => (
        <span key={parIndex}>
          {par}
          <br />
        </span>
      ))
    : "";

export { convertLineBreakToBr };
