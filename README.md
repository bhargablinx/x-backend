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

| Endpoint                   | Description                                    |
| -------------------------- | ---------------------------------------------- |
| `/user/register`           | Register user                                  |
| `/user/login`              | Login user                                     |
| `/user/logout`             | Logout user                                    |
| `/user/posts`              | Posts created by this user (to be implemented) |
| `/user/refresh-token`      | Generate new token                             |
| `/user/delete`             | Delete logged-in user                          |
| `/user/username/:username` | Search any user                                |
