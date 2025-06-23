import { NotificationContext } from "@/contexts/notificationContext";
import { useContext } from "react";

export function useNotification(){
    const notificationContext = useContext(NotificationContext);
    if(!notificationContext){
        throw new Error("not initialised yet")
    }
    return notificationContext;
}