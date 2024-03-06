export function PageTitle({
    title
}: Readonly<{
    title: string
}>) {
    return (
        <h3 className="text-center border-bottom pb-2">
            {title}
        </h3>
    )
}