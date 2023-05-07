type Props = {
  size: number;
};

export default function LoadingSkeleton({ size }: Props) {
  return (
    <div role="status" className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      {[...Array(size)].map((_, i) => (
        <div key={i} className="bg-gray-700 h-24 w-full rounded-lg animate-pulse" />
      ))}
    </div>
  );
}
