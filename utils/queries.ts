import { gql } from '@apollo/client'

export const getUserByUsername = gql`
    query GetUserByUsername($username: String!) {
        getUserByUsername(username: $username) {
            id
            email
            name
            username
            createdAt
            description
            profileImg
            bannerImg
            dob
            location
            url
            pinnedBeep {
                id
            }
            protected
            config
        }
    }
`

export const getAllBeeps = gql`
    query GetAllBeeps($first: Int, $after: String) {
        getAllBeeps(first: $first, after: $after) {
            edges {
                node {
                    id
                    user {
                        id
                        name
                        username
                        profileImg
                        protected
                        config
                    }
                    text
                    conversation {
                        id
                    }
                    reference {
                        id
                        user {
                            id
                            name
                            username
                            profileImg
                            protected
                            config
                        }
                        text
                        conversation {
                            id
                        }
                        createdAt
                        sensitive
                        config
                        location
                        impressionCount
                        rebeepCount
                        quoteCount
                        likeCount
                        replyCount
                        urlClickCount
                        profileClickCount
                        detailsClickCount
                        videoViewCount
                    }
                    createdAt
                    sensitive
                    config
                    location
                    impressionCount
                    rebeepCount
                    quoteCount
                    likeCount
                    replyCount
                    urlClickCount
                    profileClickCount
                    detailsClickCount
                    videoViewCount
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`

export const getAllBeepsByUserUsername = gql`
    query GetAllBeepsByUserUsername($username: String!, $first: Int, $after: String) {
        getAllBeepsByUserUsername(username: $username, first: $first, after: $after) {
            edges {
                node {
                    id
                    user {
                        id
                        name
                        username
                        profileImg
                        protected
                        config
                    }
                    text
                    conversation {
                        id
                    }
                    reference {
                        id
                        user {
                            id
                            name
                            username
                            profileImg
                            protected
                            config
                        }
                        text
                        conversation {
                            id
                        }
                        createdAt
                        sensitive
                        config
                        location
                        impressionCount
                        rebeepCount
                        quoteCount
                        likeCount
                        replyCount
                        urlClickCount
                        profileClickCount
                        detailsClickCount
                        videoViewCount
                    }
                    createdAt
                    sensitive
                    config
                    location
                    impressionCount
                    rebeepCount
                    quoteCount
                    likeCount
                    replyCount
                    urlClickCount
                    profileClickCount
                    detailsClickCount
                    videoViewCount
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`

export const getBeepByID = gql`
    query GetBeepByID($id: ID!) {
        getBeepByID(id: $id) {
            id
            user {
                id
                name
                username
                profileImg
                protected
                config
            }
            text
            conversation {
                id
            }
            reference {
                id
                user {
                    id
                    name
                    username
                    profileImg
                    protected
                    config
                }
                text
                conversation {
                    id
                }
                createdAt
                sensitive
                config
                location
                impressionCount
                rebeepCount
                quoteCount
                likeCount
                replyCount
                urlClickCount
                profileClickCount
                detailsClickCount
                videoViewCount
            }
            createdAt
            sensitive
            config
            location
            impressionCount
            rebeepCount
            quoteCount
            likeCount
            replyCount
            urlClickCount
            profileClickCount
            detailsClickCount
            videoViewCount
        }
    }
`

export const getAddedBeepsUpdates = gql`
    subscription BeepAdded {
        beepAdded {
            text
        }
    }
`

export const getBeepMetricsUpdates = gql`
    subscription BeepUpdated {
        beepMetricsUpdated {
            impressionCount
            rebeepCount
            quoteCount
            likeCount
            replyCount
            urlClickCount
            profileClickCount
            detailsClickCount
            videoViewCount
        }
    }
`

export const createBeep = gql`
    mutation CreateBeep (
        $userId: String!, 
        $text: String!, 
        $conversationId: String, 
        $referenceId: String, 
        $sensitive: Boolean
    ) {
        createBeep (
            input: {
                userId: $userId
                text: $text
                conversationId: $conversationId
                referenceId: $referenceId
                sensitive: $sensitive
            }
        ) {
            id
        }
    }
`

export const updateBeepMetrics = gql`
    mutation UpdateBeepMetrics (
        $id: String!, 
        $impressionCount: Int, 
        $rebeepCount: Int,
        $quoteCount: Int,
        $likeCount: Int,
        $replyCount: Int,
        $urlClickCount: Int,
        $profileClickCount: Int,
        $detailsClickCount: Int,
        $videoViewCount: Int,
    ) {
        updateBeepMetrics (
            input: {
                id: $id
                impressionCount: $impressionCount
                rebeepCount: $rebeepCount
                quoteCount: $quoteCount
                likeCount: $likeCount
                replyCount: $replyCount
                urlClickCount: $urlClickCount
                profileClickCount: $profileClickCount
                detailsClickCount: $detailsClickCount
                videoViewCount: $videoViewCount
            }
        ) {
            id
        }
    }
`