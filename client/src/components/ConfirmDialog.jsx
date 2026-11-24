
function ConfirmDialog({
  message = "Are you sure you want to continue?",
  onConfirm,
  onCancel
}) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirm Action</h2>

        <p>{message}</p>

        <div className="modal-actions">
          <button
            className="btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="btn-danger"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
