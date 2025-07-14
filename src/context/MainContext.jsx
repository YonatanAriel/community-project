import { createContext, useState } from 'react';

export const Context = createContext(undefined);

function MainContext({ children }) {
  const [example, setExample] = useState(4);

  const contextValue = {
    example,
    setExample,
  };
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export default MainContext;

//consuming
//const {example, setExample} = useContext(Context)
