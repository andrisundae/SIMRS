import React from 'react';

export default function LoadingCellRenderer({ loadingMessage}) {
    return (
        <div className="ag-custom-loading-cell" style={{ paddingLeft: '10px', lineHeight: '25px' }}>
            <i className="fas fa-spinner fa-pulse"></i> <span> {loadingMessage}</span>
        </div>
    );
}