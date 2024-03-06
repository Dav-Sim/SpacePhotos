import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../shared/Loading";
import { useMemo, useState } from "react";

export function Header() {
    const env = import.meta.env.MODE ?? "";

    const [menu, setMenu] = useState(false);

    const navigate = useNavigate();

    const toggleMenu = (ev: React.SyntheticEvent<HTMLAnchorElement>) => {
        ev.preventDefault();
        setMenu(!menu);
    };

    //all menu links
    const links = useMemo(() => [
        { url: "/", title: "Picture of the day" },
        { url: "/earth", title: "Earth" },
        { url: "/mars", title: "Mars" },
    ], []);

    const handleNavigate = (ev: React.SyntheticEvent<HTMLAnchorElement>, to: string) => {
        ev.preventDefault();
        setMenu(false);
        navigate(to);
    }

    return (
        <div>
            <div>
                <EnvironmentBar environment={env} />

                <nav className="navbar-dark bg-dark text-light shadow px-2 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                        <div className="brand py-2 ps-0 ps-md-4">
                            <Link to={`/`} className="navbar-brand fs-5">
                                <i className="fa-solid fa-meteor me-2"></i>
                                <span className="d-none d-md-inline">Space Photos</span>
                                <span className="d-inline d-md-none">Space P.</span>
                            </Link>
                        </div>
                    </div>

                    {/* large screen menu */}
                    <div className="d-none d-md-flex gap-2">
                        {
                            links.map(link => <Link to={link.url} key={link.url}>{link.title}</Link>)
                        }
                    </div>

                    <div className="d-flex gap-3 align-items-center">
                        <UserLabel className="mt-1" working={false} />

                        <a className="d-inline d-md-none" href="/" onClick={toggleMenu}>
                            Menu
                            <i className="fa-solid fa-bars ms-2"></i>
                        </a>
                    </div>
                </nav>
            </div>

            {/* small screen menu */}
            <div className="d-block d-md-none">
                {
                    !!menu &&
                    <>
                        <div className="offcanvas offcanvas-end text-bg-dark show" role="dialog">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title">
                                    <i className="fa-solid fa-meteor me-2"></i>
                                    Space photos
                                </h5>
                                <a href="/"
                                    className="btn-close btn-close-white"
                                    onClick={toggleMenu}>
                                </a>
                            </div>

                            <div className="offcanvas-body">
                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    {
                                        links.map(link =>
                                            <li key={link.url} className="nav-item">
                                                <a className="nav-link" href="/" onClick={ev => handleNavigate(ev, link.url)} key={link.url}>{link.title}</a>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="offcanvas-backdrop fade show"></div>
                    </>
                }
            </div>
        </div >
    );
}


function EnvironmentBar({
    environment
}: Readonly<{
    environment?: string
}>) {
    if (!environment || environment === 'production') {
        return null;
    }

    return (
        <div className="bg-warning">
            <div className="text-center m-auto text-dark"><strong>{environment} Environment</strong></div>
        </div>
    );
}

function UserLabel({
    className,
    user,
    working
}: Readonly<{
    className?: string,
    user?: { name: string },
    working: boolean
}>) {
    const userName = user?.name ?? "Unregistered";

    return (
        <Loading loading={working} gray={false} size="sm">
            <p className={`m-0 p-0 text-white-50 ${className}`}
                title={userName}>
                {
                    user?.name ?
                        <i className="fa-solid fa-user me-2"></i>
                        :
                        <i className="fa-solid fa-user-slash me-2"></i>
                }
                <span className="d-none d-md-inline">
                    {userName}
                </span>
            </p>
        </Loading>
    );
}