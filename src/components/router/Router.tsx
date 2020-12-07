import React from "react";

const getLocationWithoutParams = (location: string) =>
    location.lastIndexOf("?") >= 0
        ? location.substring(0, location.lastIndexOf("?"))
        : location;

const getParamsFromLocation = (
    location: string
): { [key: string]: string } | null => {
    const questionIndex = location.indexOf("?");
    if (questionIndex === -1) return null;
    const paramsSource = location.substring(questionIndex + 1);
    const parametersArray = paramsSource
        .split("&")
        .map((value) => value.split("="));
    const params = parametersArray.reduce<{ [key: string]: string }>(
        (acc, currentValue) => {
            acc[currentValue[0]] = currentValue[1];
            return acc;
        },
        {}
    );
    return params;
};

interface RouterData {
    page: string;
    goToPage: (page: string) => void;
    back: () => void;
}

export const RouterContext = React.createContext({} as RouterData);

interface RouterProps {
    initialPage: string;
    children: React.ReactNode;
}

export const Router = ({ children, initialPage }: RouterProps) => {
    const [page, setPage] = React.useState<string>(initialPage);
    const history = React.useRef(["catalogs"]);

    const goToPage = React.useCallback((page: string) => {
        setPage(page);
        history.current.push(page);
    }, []);

    const back = React.useCallback(() => {
        history.current.pop();
        const prevPage = history.current[history.current.length - 1];
        setPage(prevPage);
    }, []);

    return (
        <RouterContext.Provider value={{ page, goToPage, back }}>
            {children}
        </RouterContext.Provider>
    );
};

interface RouteProps {
    location: string;
    children: (params: { [key: string]: string }) => React.ReactNode;
}

export const Route = ({ location, children }: RouteProps) => {
    return (
        <RouterContext.Consumer>
            {({ page }) =>
                location === getLocationWithoutParams(page) &&
                children(getParamsFromLocation(page)!)
            }
        </RouterContext.Consumer>
    );
};

interface LinkProps {
    href: string;
    children: (onClick: () => void) => React.ReactNode;
}

export const Link = ({ href, children }: LinkProps) => {
    return (
        <RouterContext.Consumer>
            {(value) => children(() => value.goToPage(href))}
        </RouterContext.Consumer>
    );
};
