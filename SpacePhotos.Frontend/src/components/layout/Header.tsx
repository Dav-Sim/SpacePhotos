import { Link } from "react-router-dom";
import { Loading } from "../shared/Loading";

export function Header() {
    const env = import.meta.env.MODE ?? "";
    return (
        <>
            <EnvironmentBar environment={env} />

            <nav className="nav-gradient text-dark shadow px-2 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                    <div className="brand py-2 ps-4">
                        <Link to={`/`} className="navbar-brand fs-5">
                            <i className="fa-solid fa-meteor me-2"></i>
                            Space Photos
                        </Link>
                    </div>
                </div>

                <div>
                    <UserLabel className="mt-2" working={false} />
                </div>
            </nav>
        </>
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
    const userName = user?.name ?? "Unregistered user";

    return (
        <Loading loading={working} gray={false} size="sm">
            <p className={`m-0 p-0 text-white-50 ${className}`}>
                <i className="fa-solid fa-user me-2"></i>
                {userName}
            </p>
        </Loading>
    );
}