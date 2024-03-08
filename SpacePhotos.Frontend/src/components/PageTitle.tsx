export function PageTitle({
    title,
    className
}: Readonly<{
    title: string,
    className?: string
}>) {
    return (
        <h3 className={`text-center border-bottom pb-2 ${className ?? ""}`}>
            {title}
        </h3>
    )
}