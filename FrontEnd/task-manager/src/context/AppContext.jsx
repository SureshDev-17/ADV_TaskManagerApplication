import { createContext, useCallback, useContext, useMemo, useState } from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const emptyAuthState = useMemo(
    () => ({
      isAuthenticated: false,
      role: null,
      name: "",
      email: "",
    }),
    []
  );

  const [users] = useState([]);
  const [tasks] = useState([]);
  const [auth, setAuth] = useState(emptyAuthState);

  const login = useCallback(() => false, []);

  const logout = useCallback(() => {
    setAuth(emptyAuthState);
  }, [emptyAuthState]);

  const addUser = useCallback(() => {}, []);

  const deleteUser = useCallback(() => {}, []);

  const addTask = useCallback(() => {}, []);

  const updateTaskStatus = useCallback(() => {}, []);

  const contextValue = useMemo(
    () => ({
      auth,
      users,
      tasks,
      login,
      logout,
      addUser,
      deleteUser,
      addTask,
      updateTaskStatus,
    }),
    [addTask, addUser, auth, deleteUser, login, logout, tasks, updateTaskStatus, users]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
