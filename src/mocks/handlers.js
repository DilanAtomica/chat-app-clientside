import {rest} from "msw";

export const handlers = [
    rest.post("http://localhost:3001/users/userDetails", (req, res, ctx) => {
        return res(
            ctx.json({userID: 1, email: "dilan@hotmail.com", username: "dilan"})
        )
    }),
    rest.post("http://localhost:3001/shows/searchResult", (req, res, ctx) => {
        return res(
            ctx.json({total_pages: 10, results: [
                    {
                        id: 1399,
                        name: "Game of Thrones",
                        poster_path: "/7WUHnWGx5OO145IRxPDUkQSh4C7.jpg"
                    }
                ]})
        )
    }),
    rest.post("http://localhost:3001/shows/seriesResult", (req, res, ctx) => {
        return res(
            ctx.json({
                id: 1399,
                name: "Game of Thrones",
                backdrop_path: "/7WUHnWGx5OO145IRxPDUkQSh4C7.jpg",
                seasons: [
                    {
                        name: "Specials",
                        episode_count: 260,
                        season_number: 0,
                    },
                    {
                        name: "Season 1",
                        episode_count: 10,
                        season_number: 1,
                    },
                    {
                        name: "Season 2",
                        episode_count: 8,
                        season_number: 2,
                    },
                    {
                        name: "Season 3",
                        episode_count: 10,
                        season_number: 3,
                    }
                ]

            })
        )
    }),
    rest.post("http://localhost:3001/chats/activeChatQueues", (req, res, ctx) => {
        return res(
            ctx.json([{
                chatQueueID: 22,
                created_at: "2023-02-14T14:26:28.000Z",
                episode: 1,
                image: "/f49nYnZUowcVKCOC1FRFkKDR7bg.jpg",
                name: "Game Shakers",
                season: 1,
                seriesID: 64264,
            }])
        )
    }),
    rest.post("http://localhost:3001/chats/notifications", (req, res, ctx) => {
        return res(
            ctx.json([
                {
                created_at: "2023-02-13T15:32:02.000Z",
                isRead: 1,
                notificID: 1,
                notificMsg: "A chat for a dicussion of The Walking Dead season 1, episode 1 has been made",
                userID: 61
            },
                {
                    created_at: "2023-02-14T15:31:02.000Z",
                    isRead: 0,
                    notificID: 2,
                    notificMsg: "A chat for a dicussion of Game of Thrones season 1, episode 1 has been made",
                    userID: 61
                },
            ])
        )
    }),

    rest.post("http://localhost:3001/chats/chatsData", (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    chatID: 16,
                    created_at: "2023-02-10T16:17:46.000Z",
                    otherUserName: "vidar",
                    seriesEpisode: "8",
                    seriesImage: "/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg",
                    seriesName: "Game of Thrones",
                    seriesSeason: "4"
                },
                {
                    chatID: 18,
                    created_at: "2023-02-10T16:18:42.000Z",
                    otherUserName: "vidar",
                    seriesEpisode: "1",
                    seriesImage: "/zaulpwl355dlKkvtAiSBE5LaoWA.jpg",
                    seriesName: "The Walking Dead",
                    seriesSeason: "1"
                }
            ])
        )
    }),

    rest.post("http://localhost:3001/chats/chatData", (req, res, ctx) => {
        return res(
            ctx.json(
                {
                    chatID: 16,
                    created_at: "2023-02-10T16:17:46.000Z",
                    messages: [{
                        chatID: 16,
                        created_at: "2023-02-14T17:56:47.000Z",
                        dateSent: "14.11.2023",
                        message: "skjera",
                        messageID: 38,
                        messageSent: true,
                        userID: 61,
                    },
                        {
                            chatID: 16,
                            created_at: "2023-02-14T17:56:47.000Z",
                            dateSent: "14.11.2023",
                            message: "ikke stort",
                            messageID: 39,
                            messageSent: false,
                            userID: 62,
                        }],
                    otherUserName: "vidar",
                    seriesEpisode: "8",
                    seriesImage: "/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg",
                    seriesName: "Game of Thrones",
                    seriesSeason: "4",
                },
            )
        )
    }),
]