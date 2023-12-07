export default function Loading() {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
    };

    return (
        <div style={containerStyle}>
            <i className="fas fa-spinner fa-spin"></i>
        </div>
    );
}