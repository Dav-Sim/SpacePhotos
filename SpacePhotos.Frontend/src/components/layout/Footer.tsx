export function Footer() {
    const year = new Date().getFullYear();
    return (
        <div className="mt-auto bg-dark text-light">
            <div className="p-2 d-flex flex-wrap gap-2 justify-content-between px-2 px-md-5">
                <p className="m-0">
                    <i className="fa-solid fa-meteor me-2"></i>
                    Space Photos
                </p>

                <p className="m-0">
                    <span className="me-2">Source</span>
                    <a href="https://api.nasa.gov/">NASA</a>
                </p>

                <p className="m-0">
                    <i className="fa-regular fa-copyright me-2"></i>
                    David {year}
                </p>
            </div>
        </div>
    );
}