import { beepType } from "./beepTypes"

export interface userType {
    id: string
    email: string
    name: string
    username: string
    createdAt: string
    description: string
    profileImg: string
    bannerImg: string
    dob: number
    location: string
    url: string
    pinnedBeep: beepType
    protected: boolean
    config: string
}

export interface userQueryType {
    getUserByUsername: userType
}