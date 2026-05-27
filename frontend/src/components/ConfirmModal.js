const ConfirmModal = ({ isOpen, title, message, confirmLabel = "Confirm", onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onCancel} data-testid="confirm-modal">
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="modal-actions">
                    <button className="modal-cancel" onClick={onCancel} data-testid="cancel-delete">
                        Cancel
                    </button>
                    <button className="modal-confirm" onClick={onConfirm} data-testid="confirm-delete">
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
