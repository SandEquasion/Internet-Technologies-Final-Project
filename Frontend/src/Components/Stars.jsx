const Stars = ({ rating = 0, maxStars = 5, size = 20 }) => {

  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    // full star
    if (rating >= i) {
      stars.push("full");
    // half star
    } else if (rating >= i - 0.5) {
      stars.push("half");
    // empty star
    } else {
      stars.push("empty");
    }
  }

  return (
    <div className="flex items-center gap-0.5">
      {stars.map((type, index) => (
        <svg
          key={index}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/*transparent but stroked background star always rendered */}
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            stroke="currentColor" fill="#00000000" className="stroke-2"
          />
          {/* pink fill - full, half, or none */}
          {type !== "empty" && (
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="currentColor"
              clipPath={type === "half" ? "url(#half-clip)" : undefined}
            />
          )}
          {/* half clip definition */}
          {type === "half" && (
            <defs>
              <clipPath id="half-clip">
                <rect x="0" y="0" width="12" height="24" />
              </clipPath>
            </defs>
          )}
        </svg>
      ))}
    </div>
  );
};

export default Stars;