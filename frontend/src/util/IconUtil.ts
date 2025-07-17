
// format react icon for tsx component
export function formatForIcon<T>(icon: T) {
    return icon as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
}
