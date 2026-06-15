"use client";

export function AdPlaceholder({ type = 'horizontal' }: { type?: 'horizontal' | 'vertical' | 'rectangle' }) {
  const dimensions = {
    horizontal: 'h-24',
    vertical: 'h-64',
    rectangle: 'h-48',
  };

  return (
    <div
      className={`${dimensions[type]} w-full bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center`}
    >
      <span className="text-gray-400 text-sm font-medium">Advertisement</span>
    </div>
  );
}
