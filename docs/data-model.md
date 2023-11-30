# Data models

### Users

| Field            | What it is
| ---------------- | ----------- |
| id               | Primary Key |
| username         | Unique username |
| firstName        | User’s first name |
| lastName         | User’s last name |
| email            | User's email address |
| hashedPassword   | Hashed password for authentication |

## Restaurants - from third party API for the front end.

| Field                     | What it is
| ----------------          | ----------- |
| id                        | Primary Key |
| googlePlaceId             | ID from Google Places API |
| displayName               | Name of the restaurant |
| rating                    | Aggregate rating based on user reviews |
| photo                     | Contains the REQUIRED sub fields: name: (Where we’ll get the URL to the photo from) authorAttributions {displayname, uri, photoUri} |
| bookmarked                | bool (manual action from user, triggered by button click) |
| priceLevel                | [ PRICE_LEVEL_FREE, PRICE_LEVEL_INEXPENSIVE, PRICE_LEVEL_MODERATE, PRICE_LEVEL_EXPENSIVE, PRICE_LEVEL_VERY_EXPENSIVE ] |
| type                      | displays cuisine/eatery category (seafood_restaurant, coffee_shop, etc) |
| userRatingCount           | Number of reviews from google |
| gourmandRatingCount       | Number of reviews from our app users |
| weekdayDescriptions       | String formatted hours of operation |
| website                   | url |
| formattedAddress          | String formatted full address of restaurant |
| internationalPhoneNumber  | String formatted phone number |

### Reviews

| Field         | What it is
| ------------- | ----------- |
| id            | Primary Key |
| publishTime   | Auto generated upon post |
| author        | Foreign Key to Users table, review author |
| userIcon      | Foreign Key to Users table |
| text          | Body/content of the review |
| restaurantId  | Foreign Key to Restaurants table |
| rating        | Rating given by the user (int 1-5) |
| photo         | URL to where photo is saved |
