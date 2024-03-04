import { useEffect } from "react";

export function usePageTitle(...titles: (string | undefined)[]) {
    useEffect(() => {
        const title = ["Space Photos", ...titles]
            .filter(a => a && a?.length > 0)
            .map(a => a!.length > 20 ? a!.substring(0, 20) + "..." : a)
            .join(" - ");
        document.title = title;
    }, [titles]);
}