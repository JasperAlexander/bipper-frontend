import { userType } from "./userTypes"

export interface beepType {
    id: string
    user: userType
    text: string
    conversation: beepType
    reference: beepType
    createdAt: string
    sensitive: boolean
    config: string
    location: string
    impressionCount: number
    rebeepCount: number
    quoteCount: number
    likeCount: number
    replyCount: number
    urlClickCount: number
    profileClickCount: number
    detailsClickCount: number
    videoViewCount: number
}

export interface addedBeepType {
    beepAdded: beepType
}

interface pageInfoType {
    hasNextPage: Boolean
    hasPreviousPage: Boolean
    startCursor: String
    endCursor: String
}
  
export interface beepEdgeType {
    node: beepType
}
  
export interface beepConnectionType {
    edges: [beepEdgeType]
    pageInfo: pageInfoType
}

export interface getBeepByIDType {
    getBeepByID?: beepType
}

export interface getAllBeepsByUserUsernameType {
    getAllBeepsByUserUsername?: beepConnectionType
}

export interface getAllBeepsType {
    getAllBeeps?: beepConnectionType
}
