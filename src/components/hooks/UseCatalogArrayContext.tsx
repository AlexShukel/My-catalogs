import React from "react";
import { get, set } from "lodash";

import { CatalogContext } from "../catalog-context/CatalogContext";

export interface ArrayController<T> {
    add: (value: T) => void;
    remove: (index: number) => void;
    modify: (value: T, index: number) => void;
    array: T[];
}

export const useCatalogArrayContext = <T,>(
    arrayPath: string
): ArrayController<T> => {
    const context = React.useContext(CatalogContext);
    const array: T[] = get(context, arrayPath);

    const setContext = React.useCallback(
        () => context.setValues(set(context, arrayPath, array)),
        [context, array, arrayPath]
    );

    const add = React.useCallback(
        (value: T) => {
            array.push(value);
            setContext();
        },
        [array, setContext]
    );

    const remove = React.useCallback(
        (index: number) => {
            array.splice(index, 1);
            setContext();
        },
        [array, setContext]
    );

    const modify = React.useCallback(
        (value: T, index) => {
            array[index] = value;
            setContext();
        },
        [array, setContext]
    );

    return {
        array,
        add,
        remove,
        modify,
    };
};
