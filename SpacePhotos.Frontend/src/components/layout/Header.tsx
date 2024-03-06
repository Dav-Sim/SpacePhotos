import { Link, useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../shared/Loading";
import { useMemo, useState } from "react";

export function Header() {
    const env = import.meta.env.MODE ?? "";

    const loc = useLocation();
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = (ev: React.SyntheticEvent<HTMLAnchorElement>) => {
        ev.preventDefault();
        setMenu(!menu);
    };

    const path = useMemo(() => {
        const i = loc.pathname.lastIndexOf("/");
        return (i >= 0) ? loc.pathname.substring(i) : "/";
    }, [loc.pathname]);

    //all menu links
    const links = useMemo(() => {
        return [
            { url: "/", title: "Picture of the day" },
            { url: "/earth", title: "Earth" },
            { url: "/mars", title: "Mars" },
        ];
    }, []);

    const handleNavigate = (ev: React.SyntheticEvent<HTMLAnchorElement>, to: string) => {
        ev.preventDefault();
        setMenu(false);
        navigate(to);
    }

    return (
        <div>
            <div>
                <EnvironmentBar environment={env} />

                <nav className="navbar navbar-dark bg-dark text-light shadow px-2 d-flex justify-content-between align-items-center">

                    <div className="d-flex align-items-center gap-3">
                        <div className="brand py-2 ps-0 ps-md-4">
                            <Link to={`/`} className="navbar-brand fs-5">
                                <i className="fa-solid fa-meteor me-2"></i>
                                <span className="d-none d-md-inline">Space Photos</span>
                                <span className="d-inline d-md-none">Space P.</span>
                            </Link>
                        </div>

                        {/* large screen menu */}
                        <ul className="d-none d-md-flex flex-row gap-2 navbar-nav">
                            {
                                links.map(link =>
                                    <li className="nav-item"
                                        key={link.url}>
                                        <Link to={link.url}
                                            className={`nav-link ${(path === link.url ? "active" : "")}`}>
                                            {link.title}
                                        </Link>
                                    </li>
                                )
                            }
                        </ul>

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
                        <div className="navbar-dark bg-dark offcanvas offcanvas-end text-bg-dark show" role="dialog">
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
                                                <a className={`nav-link ${(path === link.url ? "active" : "")}`} href="/" onClick={ev => handleNavigate(ev, link.url)} key={link.url}>{link.title}</a>
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