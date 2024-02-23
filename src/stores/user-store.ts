import { UserProps } from "@/types/user-type"
import zustand, { create } from "zustand";
import {createJSONStorage, persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage";

type StateProps  = {    
    loggedUser?: UserProps
    setUser: (user: UserProps) => void    
}

export const useCartStore = create(persist <StateProps>((set) => ({    
    setUser: (user: UserProps) => ({
        loggedUser: user
    }),    
}), {
    name: "nlw-expert:user",
    storage: createJSONStorage(()=> AsyncStorage)
})) 