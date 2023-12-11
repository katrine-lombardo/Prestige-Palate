import './StarCard.css';
const StarCard = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const partialStarPercentage = (rating % 1) * 100;
    const emptyStars = 5 - Math.ceil(rating);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {[...Array(fullStars)].map((_, i) => (
                <div key={i} className="star full" />
            ))}
            {rating % 1 !== 0 && (
                <div
                    key="partial"
                    className="star partial"
                    style={
                        { backgroundImage: `linear-gradient(to right, #FFD700 ${partialStarPercentage}%, #bbbac0 ${partialStarPercentage}%)` }
                    } />
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <div key={`empty-${i}`} className="star empty" />
            ))}
        </div>
    );
};


export default StarCard;
