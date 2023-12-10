const BigStarCard = ({ rating }) => {
    const fullStars = Math.floor(rating);

    const starArr = [];

    for (let i = 1; i <= fullStars; i++) {
        starArr.push(1);
    }

    if (rating < 5) {
        const partialStar = rating - fullStars;

        starArr.push(partialStar);

        const emptyStars = 5 - starArr.length;

        for (let i = 1; i <= emptyStars; i++) {
            starArr.push(0);
        }
    }

    const stars = starArr.map((val, i) => {
        return (
            <div
                key={i}
                className="starBox"
                style={{
                    fontSize: '250%',
                    width: '50px',
                    height: '50px',
                    lineHeight: '10px',
                    verticalAlign: 'top',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                    color: '#f6f4ee',
                    margin: '0 1px',
                    background: `linear-gradient(90deg, #FFD700 ${val * 100}%, #DFD5CB ${val * 100}%)`
                }}
            >
                ★
            </div>
        );
    });

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {stars}
        </div>
    );
};

export default BigStarCard;