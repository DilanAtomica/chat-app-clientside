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
            ctx.json({})
        )
    }),
]