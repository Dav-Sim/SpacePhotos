import React from "react";

export function ImageThumbnailCard({
    children,
    className
}: Readonly<{
    children: React.ReactNode,
    className?: string,
}>) {
    return (
        <div className={`${className} bg-dark p-2 rounded`}>
            {children}
        </div>
    )
}