import React from "react";
import { merge, cloneDeep, get } from "lodash";

interface I18nLoaderProps<I> {
    defaultI18n: I;
    path?: string;
    children: (i18n: I) => React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const I18nContext = React.createContext({} as any);

export const useI18n = <I,>(defaultI18n: I, path?: string): I => {
    const loadedI18n = React.useContext(I18nContext);
    return merge(
        cloneDeep(defaultI18n),
        path ? get(loadedI18n, path) : loadedI18n
    );
};

export const I18nLoader = <I,>({
    defaultI18n,
    path,
    children,
}: I18nLoaderProps<I>) => {
    const i18n = useI18n(defaultI18n, path);
    return <React.Fragment>{children(i18n)}</React.Fragment>;
};
