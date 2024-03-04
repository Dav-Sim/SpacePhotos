export function Main({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex-fill d-flex justify-content-center py-3 px-0">
            <div className="d-flex flex-column col-12 col-lg-10 col-xl-8 shadow-sm p-1 p-md-3 mb-3 rounded-3"
                style={{ backgroundColor: "#041524" }}>
                {children}
            </div>
        </main>
    );
}
