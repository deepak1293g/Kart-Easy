import React from "react";

const CardLoading = () => {
  return (
    <div className="h-full flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden animate-pulse">
      {/* Thumbnail Skeleton */}
      <div className="w-full aspect-square bg-neutral-100 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2/3 h-2/3 bg-neutral-200/50 rounded-2xl"></div>
        </div>
      </div>

      {/* Info Section Skeleton */}
      <div className="p-2.5 md:p-4 flex flex-col flex-1 space-y-2 md:space-y-3">
        <div className="space-y-2">
          {/* Title Lines */}
          <div className="h-3 bg-neutral-100 rounded-full w-full"></div>
          <div className="h-3 bg-neutral-100 rounded-full w-2/3"></div>

          {/* Rating */}
          <div className="flex gap-1 pt-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 bg-neutral-100 rounded-full"></div>
            ))}
          </div>
        </div>

        <div className="space-y-3 mt-auto">
          {/* Location */}
          <div className="h-2 bg-neutral-50 rounded-full w-1/2"></div>

          {/* Price & Action */}
          <div className="flex items-center justify-between pt-1">
            <div className="space-y-1.5">
              <div className="h-4 bg-neutral-100 rounded-full w-16"></div>
              <div className="h-2 bg-neutral-50 rounded-full w-10"></div>
            </div>
            <div className="w-8 h-8 rounded-full bg-neutral-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLoading;
