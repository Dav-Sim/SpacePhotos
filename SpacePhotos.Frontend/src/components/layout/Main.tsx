export function Main({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex-fill d-flex justify-content-center py-3 px-4">
            <div className="d-flex flex-column col-12 shadow-sm p-3 mb-3 rounded-3"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.7)'
                }}>
                {children}
            </div>
        </main>
    );
}
