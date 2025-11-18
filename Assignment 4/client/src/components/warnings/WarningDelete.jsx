import '../../styles/components/warnings/WarningDelete.css';

export default function WarningDelete({ onConfirm, onCancel }) {

    return (
        <div className="warning-backdrop" onClick={(e) => e.stopPropagation()}>
            <div className="warning-delete">
                <p>Are you sure you want to delete this item?</p>
                <p>This action cannot be undone.</p>
                <div className="warning-delete-buttons">
                    <button onClick={onConfirm}>Delete</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};