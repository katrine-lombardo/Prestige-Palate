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
- If the user is logged in, they will see an additional two options: 1) Leave a review for a restaurant, and 2) Save this restaurant.
- The user's "saved" list contains the restaurants a user saves, grouped automatically by city.
- A logged-in user can privately or publicly share a review of their foodie experiences, and publicly shared photos/reviews will be displayed on a restaurant’s detail page and their personal profile.
- Privately posted reviews and photos are only visible in the user’s saved log, to reminisce on previous experiences.

## Testing

- Trejon: Unit Tests for Photos
- Erin:
- Katrine:
- Michael:
- Yaosheng:

# Getting the app running

1. Git clone into your local repository: 
```sh
git clone (repo)
```
2. Change directory: 
```sh
cd prestigepalate
```
3. Create volumes: 
```sh
docker volume create pg-admin
```
```sh
docker volume create postgres-data
```
4. Build the image: 
```sh
docker compose build
```
5. Run the containers: 
```sh
docker compose up
```
6. Change directory: 
```sh
cd ghi
```
7. Run command:
```sh 
npm install @aws-sdk/client-s3
```
8. Run command: 
```sh
npm install @react-google-maps/api --save
```
9. Open browser to localhost
