export function Footer() {
    const year = new Date().getFullYear();
    return (
        <div className="mt-auto">
            <hr className="m-0 mx-4 light" style={{ borderColor: "#b7b7b7" }} />
            <div className="p-2 d-flex justify-content-between px-5">
                <p className="m-0 text-muted">
                    <i className="fa-solid fa-meteor me-2"></i>
                    Space Photos
                </p>
                <p className="m-0 text-muted">
                    <i className="fa-regular fa-copyright me-2"></i>
                    David {year}</p>
            </div>
        </div>
    );
}