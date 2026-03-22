/**
 * Review_Card Component
 *
 * @param {string} imageURL     - User profile picture URL
 * @param {string} reviewTitle  - title of review
 * @param {string} reviewDate   - Date of the review
 * @param {string} content      - Content of the review
 * @param {string} [className]  - Extra classes
 */
const Review_Card = ({
  imageURL,
  userName,
  reviewTitle,      // ← add this prop
  reviewDate,
  content,
  className = ""}) => {
  return (
    <div className={`flex flex-col gap-3 drop_shadow bg-background rounded-2xl p-5 ${className}`}>

      {/* Top row - profile picture and name/date stacked */}
      <div className="flex flex-row items-center gap-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-pink-100">
        </div>
        <div className="flex flex-col">
          <span className="font-display text-h3 text-primary font-bold">
            {reviewTitle}      {/* ← show title here instead of username */}
          </span>
          <span className="font-display text-h4 text-secondary_1">
            {reviewDate}
          </span>
        </div>
      </div>

      {/* Username */}
      <span className="font-display text-b2 text-secondary_1">
        By:  {userName}          {/* ← show username below */}
      </span>

      {/* Review content */}
      <p className="font-display text-b1 text-primary leading-relaxed">
        {content}
      </p>

    </div>
  );
};

export default Review_Card;