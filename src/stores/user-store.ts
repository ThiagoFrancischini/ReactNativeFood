import { UserProps, UserProp } from "@/types/user-type"
import zustand, { create } from "zustand";
import {createJSONStorage, persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage";

type StateProps  = {    
    loggedUser?: UserProp
    setUser: (user: UserProps) => void    
}

export const useUserStore = create(persist <StateProps>((set) => ({    
    setUser: (user: UserProps) => ({        
        loggedUser: user        
    }),    
}), {
    name: "nlw-expert:user",
    storage: createJSONStorage(()=> AsyncStorage)
})) 