# GraphQL-Book-Site

A GraphQL training repo using a React front-end, Node back-end and MongoDB
Tutorial provided by Free Code Camp
Produced by the Net Ninja: https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg

# The tutorial: https://www.youtube.com/watch?v=ed8SzALpx1Q

A couple of issues from the video, due to the nature of open source packages constantly updating:
2:41:00 - enabling CORS. In the middleware function we need to initiate cors:
app.use(cors())
as an opose to:
app.use(cors)

3:16:30
The compose function has been removed from 'react-apollo', as it is a duplicate of flowRight from lodash
I just used flowRight as an alternative
