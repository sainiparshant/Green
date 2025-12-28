import { DirectionAwareHover } from "../components/ui/direction-aware-hover";

export function CategoryCard({ category }) {
  return (
    
    <div className="h-[17rem] sm:h-[30rem] relative  flex items-center justify-center">
      <DirectionAwareHover imageUrl={category.image} category={category.category}>
        <h3 className="font-bold text-xl ">{category.category}</h3>
        <h3 className="font-normal text-sm">{category.subtitle}</h3>
      </DirectionAwareHover>
    </div>
  );
}
