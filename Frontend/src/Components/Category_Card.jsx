/**
 * ProductCard Component
 * @param {string} image        - URL of the product image
 * @param {string} category     - category name
 * @param {function} [onClick]   - Click handler
 */


const CategoryCard = ({
    image,
    category,
    onClick,
}) => {
    return(
        <div className="flex flex-col 
            bg-background rounded-md 
            overflow-hidden shadow-md 
            w-full border-0 pt-4 border-transparent 
            hover:border-secondary_1 hover:border-4 
            transition-all duration-150 ease-in-out 
            hover:scale-[1.03]
            active:scale-95 "
            onClick={onClick}>
            <div className="relative w-full h-48 bg-zinc-background">
                <img src= {image} alt={category} className="w-full h-full object-contain" />
            </div>
            <div>
                <h3 className="flex text-secondary_1 text-sm md:text-h2 justify-center font-display py-2">
                    {category}
                </h3>
            </div>
        </div>
    );
};

export default CategoryCard;