import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

export const useChatStore = create((set,get) => ({
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,

    getUsers: async () => {
        set({isUserLoading:true})
        try {
            const res = await axiosInstance.get("/messages/users")
            set({users:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isUserLoading:false})
        }
    },

    getMessages: async (userId) => {
        set({isMessagesLoading:true})
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({messages:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isMessagesLoading:false})
        }
    },

    sendMessage: async (messageData) => {
        const {selectedUser,messages} = get()
        console.log(selectedUser._id,messages)
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            console.log(res)
            set({messages:[...messages,res.data]})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    setSelectedUser: (selectedUser) => set({selectedUser})


}))