import { createContext, useState } from "react";

export interface ProblemContextType {
    problem?: string,
    setProblem?: (error?: string) => void,
}

export const ProblemContext = createContext<ProblemContextType>({});

export function ProblemContextWrapper({
    children
}: Readonly<{
    children: React.ReactNode
}>) {

    const [problem, setProblem] = useState<string | undefined>(undefined);

    return (
        <ProblemContext.Provider value={{
            problem,
            setProblem
        }}>
            {
                !problem ?
                    children
                    :
                    <ProblemPage error={problem} />
            }
        </ProblemContext.Provider>
    )
}

function ProblemPage({
    error
}: Readonly<{
    error?: string
}>) {
    return (
        <div className="h-100 d-flex justify-content-center align-items-center flex-column">
            <p className="m-0 fs-1 text-center">
                <i className="fa-solid fa-face-frown me-2"></i>
                Oh no!
            </p>
            <p className="text-center fs-5">
                It looks like something went wrong.
                <br />
                Error message: {error}
            </p>
        </div>
    )
}