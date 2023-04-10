import React, { useContext,useState } from "react";

const AppContext = React.createContext()

const AppProvider =({children})=>{
    const [userInfo,setUserInfo] = useState({})
    return <AppContext.Provider
            value={{
                userInfo,
                setUserInfo
            }}
    >{children}
    </AppContext.Provider>
}

const useGlobalContext =()=>{
    return useContext(AppContext);
}

export {AppProvider,useGlobalContext};