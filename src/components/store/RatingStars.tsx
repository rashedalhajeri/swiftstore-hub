
import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showRating?: boolean;
}

const RatingStars = ({
  rating,
  maxRating = 5,
  size = 'md',
  showRating = false,
}: RatingStarsProps) => {
  // قم بتحويل نسبة التقييم إلى عدد النجوم المملوءة (نجوم كاملة ونصف نجوم)
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  // تعيين حجم النجوم بناءً على الخاصية size
  const getStarSize = () => {
    switch (size) {
      case 'sm':
        return 14;
      case 'lg':
        return 20;
      default:
        return 16;
    }
  };

  const starSize = getStarSize();

  return (
    <div className="flex items-center">
      <div className="flex text-yellow-500">
        {/* النجوم المملوءة */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} size={starSize} fill="currentColor" />
        ))}

        {/* نصف نجمة (إذا وجدت) */}
        {hasHalfStar && <StarHalf key="half" size={starSize} fill="currentColor" />}

        {/* النجوم الفارغة */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} size={starSize} className="text-muted-foreground" />
        ))}
      </div>

      {/* عرض الرقم إذا كانت الخاصية showRating تساوي true */}
      {showRating && (
        <span className="mr-1 text-sm text-muted-foreground">({rating.toFixed(1)})</span>
      )}
    </div>
  );
};

export default RatingStars;
