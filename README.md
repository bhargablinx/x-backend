# X Backend

> A backend for a micro blogging platform like twitter

## Functionalities:

- [x] User can login & register
- [ ] Create, read and delete blogs (cannot edit for not)
- [ ] Reads blog of other users
- [ ] User can interact with each other (follow other users)
- [ ] Can read all post
- [ ] Can read a certain post of a user
- [ ] Following feed: Where user can read post created by the user they have followed
- [ ] Can manage follower (remove follower if wanted)
- [ ] Users can comment

## Routes Implemented

### User Routes

| Endpoint                   | Description                | Method |
| -------------------------- | -------------------------- | ------ |
| `/user/register`           | Register user              | POST   |
| `/user/login`              | Login user                 | POST   |
| `/user/logout`             | Logout user                | POST   |
| `/user/posts`              | Posts created by this user | GET    |
| `/user/refresh-token`      | Generate new token         | GET    |
| `/user/delete`             | Delete logged-in user      | DELETE |
| `/user/username/:username` | Search any user            | GET    |

### Post Routes

| Endpoint        | Description             | Method |
| --------------- | ----------------------- | ------ |
| `/post/`        | Create Post             | POST   |
| `/post/`        | Get every posts created | GET    |
| `/post/:postId` | Get one post            | GET    |
| `/post/:postId` | Delete that post        | DELETE |
