import { useState, createContext, useContext, useEffect } from "react";

//! context
const defaultValue = {};
const BreakpointContext = createContext(defaultValue);

//! com one
const BreakpointProvider = ({ children, queries }) => {
  const [queryMatch, setQueryMatch] = useState({});

  //* our logic to get matching queries goes here
  useEffect(() => {
    const mediaQueryLists = {};
    const keys = Object.keys(queries);
    // let isAttached = false;

    const handleQueryListener = () => {
      const updateMatches = keys.reduce((acc, media) => {
        acc[media] = !!(
          mediaQueryLists[media] && mediaQueryLists[media].matches
        );
        return acc;
      }, {});
      setQueryMatch(updateMatches);
    };
    //! react state update before unmount//
    if (window && window.matchMedia) {
      const matches = {};
      keys.forEach(media => {
        if (typeof queries[media] === "string") {
          mediaQueryLists[media] = window.matchMedia(queries[media]);
          matches[media] = mediaQueryLists[media].matches;
        } else {
          matches[media] = false;
        }
      });
      setQueryMatch(matches);
      // isAttached = true;
      keys.forEach(media => {
        if (typeof queries[media] === "string") {
          mediaQueryLists[media].addListener(handleQueryListener);
        }
      });
    }
  }, [queries]);

  return (
    //* const BreakpointProvider
    <BreakpointContext.Provider value={queryMatch}>
      {children}
    </BreakpointContext.Provider>
  );
};

//! fn > useBreakpoint() <= { useContext }
function useBreakpoint() {
  const context = useContext(BreakpointContext);
  if (context === defaultValue) {
    throw new Error("useBreakpoint must be used within BreakpointProvider");
  }
  return context;
}
export { useBreakpoint, BreakpointProvider };
