## Prestige Palate
Team:
- Trejon
- Erin
- Katrine
- Michael
- Yaosheng

# Technologies Used

[![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)](https://www.python.org/)
[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://www.javascript.com/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

## Design

- [API design](docs/apis.md)
- [Data model](docs/data-model.md)
- [GHI](docs/ghi.md)
- [Integrations](docs/integrations.md)

## Intended market

We are targeting Elite foodies who want to explore their next global culinary adventure.

## Functionality

- If a user is not logged in, they see a heatmap view of a map showing "trending" locations (ie cities where users have left a review).
- The user sees a search field where they can make a city selection from the world, which pulls up the top 3 restaurants to visit from any searched area.
- If the user is logged in, they will see additional functionality: 1) Leave a review for a restaurant, 2) Save this restaurant, and 3) Follow other app users.
- The user's "Favorites" list contains the restaurants a user saves, grouped automatically by city.
- A logged-in user has access to My Reviews, where reviews and photos of their foodie experiences are displayed along with their following and followers list.
- Reviews created by users are saved to their personal profile and that restaurant’s detail page.
- A logged-in user can view a dashboard of reviews from users they follow to stay up-to-date on trends.


## Testing

- Trejon: Unit Tests for Photos
- Erin:
- Katrine: Unit Tests for Reviews
- Michael:
- Yaosheng:

# Getting the app running

1. Git clone into your local repository: git clone (repo)
2. Change directory: cd prestigepalate
3. Create volumes: docker volume create pg-admin & docker volume create postgres-data
4. Build the image: docker compose build
5. Run the containers: docker compose up
6. Change directory: cd ghi
7. Run command: npm install @aws-sdk/client-s3
8. Run command: npm install @react-google-maps/api --save
9. Open browser to localhost
