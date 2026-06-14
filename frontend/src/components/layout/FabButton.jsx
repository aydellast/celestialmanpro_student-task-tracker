function FabButton({
  onClick,
}) {
  return (
    <button
      className="fab-button"
      onClick={onClick}
    >
      +
    </button>
  );
}

export default FabButton;