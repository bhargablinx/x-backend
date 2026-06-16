# X Backend

> A backend for a micro blogging platform like twitter

## Functionalities:

- [x] User can login & register
- [x] Create, read and delete blogs (cannot edit for not)
- [x] Reads post of other users
- [x] User can interact with each other (follow other users)
- [x] Can read all post
- [x] Can read a certain post of a user
- [x] Following feed: Where user can read post created by the user they have followed
- [ ] Can manage follower (remove follower if wanted)
- [x] Users can comment

## Routes Implemented

### User Routes

| Endpoint                        | Description                | Method |
| ------------------------------- | -------------------------- | ------ |
| `/user/register`                | Register user              | POST   |
| `/user/login`                   | Login user                 | POST   |
| `/user/logout`                  | Logout user                | POST   |
| `/user/posts`                   | Posts created by this user | GET    |
| `/user/refresh-token`           | Generate new token         | GET    |
| `/user/delete`                  | Delete logged-in user      | DELETE |
| `/user/username/:username`      | Search any user            | GET    |
| `/user/:userId/follow`          | Follow user                | POST   |
| `/user/:userId/follow`          | Unfollow user              | DELETE |
| `/user/followers/:targetUserId` | Remove                     | DELETE |
| `/user/:userId/followers`       | Get Followers              | GET    |
| `/user/:userId/followings`      | Get Followings             | GET    |

### Post Routes

| Endpoint        | Description             | Method |
| --------------- | ----------------------- | ------ |
| `/post/`        | Create Post             | POST   |
| `/post/`        | Get every posts created | GET    |
| `/post/:postId` | Get one post            | GET    |
| `/post/:postId` | Delete that post        | DELETE |

### Feed Routes

| Endpoint           | Description                | Method |
| ------------------ | -------------------------- | ------ |
| `/feed/`           | Home Feed                  | GET    |
| `/feed/followings` | Feed with followings posts | GET    |
