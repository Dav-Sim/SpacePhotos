import { Link } from "react-router-dom";
import { Loading } from "../shared/Loading";
import { useState } from "react";

export function Header() {
    const env = import.meta.env.MODE ?? "";

    const [menu, setMenu] = useState(false);

    const toggleMenu = (ev: React.SyntheticEvent<HTMLAnchorElement>) => {
        ev.preventDefault();
        setMenu(!menu);
    };

    return (
        <div>
            <div>
                <EnvironmentBar environment={env} />

                <nav className="bg-dark text-light shadow px-2 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                        <div className="brand py-2 ps-0 ps-md-4">
                            <Link to={`/`} className="navbar-brand fs-5">
                                <i className="fa-solid fa-meteor me-2"></i>
                                Space Photos
                            </Link>
                        </div>
                    </div>

                    <div className="d-flex gap-3 align-items-center">
                        <UserLabel className="mt-1" working={false} />

                        <a href="/" onClick={toggleMenu}>
                            Menu
                            <i className="fa-solid fa-bars ms-2"></i>
                        </a>
                    </div>
                </nav>
            </div>
            {
                !!menu &&
                <div style={{
                    right: '0',
                    position: 'absolute',
                    minWidth: '30vw'
                }}
                    className="bg-dark">
                    <ul>
                        <li>AAA</li>
                        <li>BBB</li>
                    </ul>
                </div>
            }

        </div>
    );
}

export function EnvironmentBar({
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

export function UserLabel({
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