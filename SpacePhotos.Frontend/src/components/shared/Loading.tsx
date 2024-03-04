import './Loading.css';

export function Loading({
    children,
    className,
    gray,
    hideChilrenWhenLoading,
    loading,
    style,
    size: propsSize
}: Readonly<{
    children?: React.ReactNode,
    loading?: boolean,
    gray?: boolean,
    className?: string,
    style?: React.CSSProperties,
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl',
    hideChilrenWhenLoading?: boolean,
}>) {
    const size = {
        xs: '.8rem',
        sm: '1rem',
        md: '2rem',
        lg: '3rem',
        xl: '4rem',
        xxl: '6rem',
        xxxl: '8rem',
    }[propsSize ?? 'md'];

    return (
        <div className={`spinner-container ${className ?? ""}`} style={style}>
            {
                loading !== false &&
                <div data-testid="loader"
                    className={`text-center spinner-overlay ${(gray !== false ? 'spinner-overlay-gray' : '')}`}
                    style={{ padding: size }}>
                    <div className="spinner-border text-muted" role="status" style={{ width: size, height: size }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
            {
                (!hideChilrenWhenLoading || (hideChilrenWhenLoading && !loading)) &&
                children
            }
        </div>
    );
}
