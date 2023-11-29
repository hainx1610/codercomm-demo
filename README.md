# CoderComm

visit https://codercomm-hn.netlify.app/ and take a look!

Our company is developing a social platform app for users to connect and share content with each other. The app will include a range of features and functional requirements to allow users to create and manage their profiles, search for and follow other users, and post and interact with content

## User Stories

1. As a user, I want to be able to sign up to create my profile
2. As a user, I want to be able to log in (log out) of my account
3. As a user, I want to be able to manage my profile by adding personal information, profile picture, and interests.
4. As a user, I want to be able to search for and follow/unfollow other users
5. As a user, I want to be able to accept/deny following requests from other users.
6. As a user, I want to be able to see a list of people that I follow as well as my followers
7. As a user, I want to be able to share my thoughts and interests by creating content
8. As a user, I want to be able to view my own posts as well as other users’ content
9. As a user, I want to be able to interact with content by liking, reacting, commenting, and sharing.
10. As a user, I want to be able to edit or delete content, comments, shares or likes that I created.
11. As a user, I want to be able to receive notifications about new likes, shares, and comments on my content, as well as new followers and other relevant events.
12. As a user, I want to be able to save the content so that I can access them later. |

### Authentication

- [] As a user, I can register for a new account with name, email, and password.
- [] As a user, I can sign in with my email and password.
- [] As a user, I can stay sign in with refreshing page.

### Users

- [] As a user, I can see a list of other users so that I can send accept, or decide friend requests.
- [] As a user, I can get my current profile info (stay signed in after page refresh).
- [] As a user, I can see the profile of a specific user given a user ID.
- [] As a user, I can update my profile info like Avatar, Company, Job Title, Social Links, and short description.

### Posts

- [] As a user, I can see a list of posts.
- [] As a user, I can create a new post with text content and an image.
- [] As a user, I can edit my posts.
- [] As a user, I can delete my posts.

### Comments

- [] As a user, I can see a list of comments on a post.
- [] As a user, I can write comments on a post.
- [] As a user, I can update my comments.
- [] As a user, I can delete my comments.

### Reactions

- [] As a user, I can react like or dislike to a post or comment.

### Friends

- [] As a user, I can send a friend request to another user who is not my friend.
- [] As a user, I can see a list of friend requests I have received.
- [] As a user, I can see a list of friend requests I have sent.
- [] As a user, I can see a list of my friends.
- [] As a user, I can accept or decline a friend request.
- [] As a user, I can cancel a friend request I sent.
- [] As a user, I can unfriend a user in my friend list.

## Endpoint APIs

### Auth APIs

```javascript
/**
 * @route POST /auth/login
 * @description Log in with email and password
 * @body {email, password}
 * @access Public
 */
```

### User APIs

```javascript
/**
 * @route POST /users
 * @description Register new user
 * @body {name, email, password}
 * @access Public
 */
```

```javascript
/**
 * @route GET /users?page=1&limit=10
 * @description Get user with pagin
 * @access Login required
 */
```

```javascript
/**
 * @route GET /users/me
 * @description Get current user info
 * @access Login required
 */
```

```javascript
/**
 * @route GET /users/:id
 * @description Get a user profile
 * @access Login required
 */
```

```javascript
/**
 * @route PUT /users/:id
 * @description Update user profile
 * @body { name, avatarUrl, coverUrl, aboutMe, city, country, company, jobTitle, facebookLink, instagramLink, linkedinLink, twitterLink }
 * @access Login required
 */
```

### Post APIs

```javascript
/**
 * @route GET /posts/user/:userId?page=1&limit=10
 * @description Get all posts a user can see with pagination
 * @access Login required
 */
```

```javascript
/**
 * @route POST /posts
 * @description Create a new post
 * @body { content, image }
 * @access login required
 */
```

```javascript
/**
 * @route PUT /posts/:id
 * @description Update a post
 * @body { content, image }
 * @access login required
 */
```

```javascript
/**
 * @route DELETE /posts/:id
 * @description Delete a post
 * @access login required
 */
```

### Comment APIs

```javascript
/**
 * @route GET /comments/:id
 * @description Get details of a comment
 * @access Login require
 */
```

```javascript
/**
 * @route POST /comments
 * @description create a new comment
 * @body { content, postId }
 * @access Login required
 * /
```

```javascript
/**
 * @route PUT /commnents/:id
 * @description Update a comment
 * @access Login required
 * /
```

```javascript
/**
 * @route DELETE /commnents/:id
 * @description Delete a comment
 * @access Login required
 * /
```

```javascript
/**
 * @route GET /posts/:id
 * @description Get a single post
 * @access Login required
 * /
```

```javascript
/**
 * @route GET /posts/:id/comments
 * @description Get comments of a post
 * @access Login required
 */
```

### Reaction APIs

```javascript
/**
 * @route POST /reactions
 * @description Save a reaction to post or comment
 * @body { targetType: 'Post' or 'Comment', targetId, emoji: 'like' or 'dislike' }
 * @access Login required
 * /
```

### Friend APIs

```javascript
/**
 * @route GET /friends/requests/requestss
 * @description Send a friend request
 * @body { to: User ID }
 * @access Login required
 * /
```

```javascript
/**
 * @route GET /friends/requests/incoming
 * @description Get the list of received pending requests
 * @access Login required
 * /
```

```javascript
/**
 * @route GET /friends/requests/outgoing
 * @description Get the list of received pending requests
 * @access Login required
 * /
```

```javascript
/**
 * @route GET /friends
 * @description Get the list of friends
 * @access Login required
 * /
```

```javascript
/**
 * @route PUT /friends/requests/:userId
 * @description Accept/Reject a received pending requests
 * @body { status 'accepted' or 'declined' }
 * @access Login required
 * /
```

```javascript
/**
 * @route DELETE /friends/requests/:userId
 * @description Cancel a friend request
 * @access Login required
 */
```

```javascript
/**
 * @route PUT /friends/:userId
 * @description Remove a friend
 * @access Login required
 */
```
