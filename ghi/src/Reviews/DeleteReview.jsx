import React from 'react';

const DeleteReview = ({ onConfirm, onCancel }) => {
    return (
        <div>
            <p>Are you sure you want to delete this review?</p>
            <button onClick={onConfirm}>Yes, Delete</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default DeleteReview;
