"use client"

import { useCallback, useMemo, useState } from "react";

export default function useBoolean(defaultValue = false) {
    const [state, setState] = useState(defaultValue);

    const setTrue = useCallback(() => setState(true), []);
    const setFalse = useCallback(() => setState(false), []);
    const setToggle = useCallback(() => setState((prev) => !prev), []);

    const memoizedValue = useMemo(() => ({
        state,
        setTrue,
        setFalse,
        setToggle,
        setState,
    }), [state, setTrue, setFalse, setToggle, setState]);
    

    return memoizedValue;
    
};
