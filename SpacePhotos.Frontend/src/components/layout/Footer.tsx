export function Footer() {
    const year = new Date().getFullYear();
    return (
        <div className="mt-auto bg-dark text-light">
            <div className="p-2 d-flex flex-wrap gap-2 justify-content-between px-2 px-md-5">
                <p className="m-0">
                    <i className="fa-solid fa-meteor me-2"></i>
                    Space Photos
                </p>

                <a href="https://api.nasa.gov/">
                    <i className="fa-solid fa-up-right-from-square me-2"></i>
                    NASA
                </a>

                <a href="mailto:info@davidsimanek.cz">
                    <i className="fa-solid fa-envelope me-2"></i>
                    Email
                </a>

                <a href="https://github.com/Dav-Sim" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-github me-2"></i>
                    Github
                </a>

                <p className="m-0">
                    <i className="fa-regular fa-copyright me-2"></i>
                    David {year}
                </p>
            </div>
        </div>
    );
}