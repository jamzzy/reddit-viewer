import { rest } from "msw";

export const handlers = [
    rest.get('https://www.reddit.com/subreddits/.json', (req, res, ctx) => {
        
        const data = {
            data: {
                children: [
                    {
                        data: {
                            url: '/r/test-sub-1/',
                            display_name_prefixed: 'r/test-sub-1',                            
                        }
                    },
                    {
                        data: {
                            url: '/r/test-sub-2/',
                            display_name_prefixed: 'r/test-sub-2',
                        }
                    },
                    {
                        data: {
                            url: '/r/test-sub-3/',
                            display_name_prefixed: 'r/test-sub-3',
                        }
                    }
                ]
            }
        };

        return res(ctx.json(data), ctx.delay(150));
    }),

    rest.get('https://www.reddit.com/r/test-sub-1/about/.json', (req, res, ctx) => {

        const data = {
            data: {
                icon_img: 'https://test-icon1.png'
            }
        };
        
        return res(ctx.json(data), ctx.delay(150));
    }),

    rest.get('https://www.reddit.com/r/test-sub-2/about/.json', (req, res, ctx) => {

        const data = {
            data: {
                icon_img: 'https://test-icon2.png'
            }
        };
        
        return res(ctx.json(data), ctx.delay(150));
    }),

    rest.get('https://www.reddit.com/r/test-sub-3/about/.json', (req, res, ctx) => {

        const data = {
            data: {
                icon_img: 'https://test-icon3.png'
            }
        };
        
        return res(ctx.json(data), ctx.delay(150));
    }),
    
    rest.get('https://www.reddit.com/r/test-sub-1/.json', (req, res, ctx) => {

        const data = {
            data: {
                children: [
                    {
                        data: {
                            author: 'test-author-1',
                            created_utc: 1662635886,
                            media: {},
                            num_comments: 123,
                            permalink: '/r/test-sub-1/comments/test-post-1/',
                            post_hint: "",
                            title: 'test-post-1',
                            selftext_html: '<p>test self text 1</p>',
                            url: 'https://www.reddit.com/r/test-sub-1/comments/test-post-1/',
                            is_video: false,
                        }
                    },

                    {
                        data: {
                            author: 'test-author-2',
                            created_utc: 1662635886,
                            media: {},
                            num_comments: 234,
                            permalink: '/r/test-sub-1/comments/test-post-2/',
                            post_hint: "",
                            title: 'test-post-2',
                            selftext_html: '<p>test self text 2</p>',
                            url: 'https://www.reddit.com/r/test-sub-1/comments/test-post-2/',
                            is_video: false,
                        }
                    }
                ]
            }
        };
        
        return res(ctx.json(data), ctx.delay(150));
    }),

    rest.get('https://www.reddit.com/r/test-sub-1/comments/test-post-1/.json', (req, res, ctx) => {

        const data = [
            {},
            {
                data: {
                    children: [
                        {
                            data: {
                                author: 'author-1',
                                body: 'test comment 1',
                                created_utc: 1662635886,
                            }
                            
                        },
                        {
                            data: {
                                author: 'author-2',
                                body: 'test comment 2',
                                created_utc: 1662635886,
                            }
                        },
                        {
                            data: {
                                author: 'author-3',
                                body: 'test comment 3',
                                created_utc: 1662635886,
                            }
                        },

                    ]
                }
            }

        ];
        
        return res(ctx.json(data), ctx.delay(150));
    }),
]; 