const StarCard = ({ rating }) => {
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
            <div key={i}
                className="starBox"
                style={{
                    fontSize: '140%',
                    width: '30px',
                    height: '30px',
                    lineHeight: '10px',
                    verticalAlign: 'top',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                    color: '#FFD700',
                    margin: '0 1px',
                    background: `linear-gradient(90deg, #800080
                    ${val * 100}%, #bbbac0 ${val * 100}%)`
                }}>
                ♛
            </div>
        );
    });

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {stars}
        </div>
    );
};
export default StarCard;
