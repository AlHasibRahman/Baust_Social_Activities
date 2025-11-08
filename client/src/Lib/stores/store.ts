import { createContext } from "react";
import CounterStore from "./counterStore";
import { uistore } from "./uiStore";

interface Store {
    counterStore: CounterStore
    uiStore: uistore
}

export const store: Store = {
    counterStore: new CounterStore(),
    uiStore: new uistore()
}

export const StoreContext = createContext(store);