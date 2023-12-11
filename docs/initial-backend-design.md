# Backend Design Doc


## High-level design(HLD):


### System Architecture



* API Layer: Serves as the interface between the frontend and backend services. It will expose RESTful endpoints using FastAPI.
* Service Layer: Contains the business logic and handles API requests, processing, and response formation.
* Data Access Layer: Manages communication with the PostgreSQL database for CRUD operations.
* External API Integration: Interacts with the Google Places API to retrieve and update restaurant information.


### **Introduction**:...


### Technology stack



* framework: FastAPI
* database: postgresql
* third party api: Google Places API


## Low-level design(LLD):


### API Endpoints

**User Authentication:**

POST /auth/register: Registers a new user


```
* Endpoint path: `/auth/register`
* Endpoint method: `POST`
* Query parameters:
  None

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    {
  "name": "john_doe",
  "password": "secure_password",
  "email": "john.doe@example.com"
}

* Response: Registers a new user


* Response shape (JSON):
    {
  "id": "12345",
  "username": "john_doe",
  "email": "john.doe@example.com",
}
```


POST /auth/login - User login


```
* Endpoint path: `/auth/login`
* Endpoint method: `POST`
* Query parameters: None
* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    {
  "username": "john_doe",
  "password": "secure_password",
}

* Response: Authenticates a user and returns an access token


* Response shape (JSON):
    {
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "token_type": "Bearer",
  "expires_in": 3600
}
```


POST /auth/logout - User logout


```
* Endpoint path: `/auth/logout`
* Endpoint method: `POST`
* Query parameters: None
* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    {
  "id": "123456",
  "session_token": "abcdef123456"
}

* Response: Logs out a user and ends the current session


* Response shape (JSON):
   {
  "message": "Logout successful",
  "status": 200
}
```


**Restaurant Information**

GET /restaurants/search - Search for restaurants


```
* Endpoint path: `/restaurants/search`
* Endpoint method: `GET`
* Query parameters:

```



* ``query`: Search query to find restaurants`
* ``location`: Coordinates (latitude, longitude) for the search location`
* ``radius`: Search radius in meters`


```
* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    {
  "query": "Italian",
  "location": {
    "latitude": 37.7749,
    "longitude": -122.4194
  },
  "radius": 1000
}

* Response: Retrieves a list of restaurants based on the search query and location


* Response shape (JSON):
    {
  "results": [
    {
      "name": "Italian Trattoria",
      "address": "123 Main St, City",
      "rating": 4.5
    },
    {
      "name": "Pizzeria Bella",
      "address": "456 Oak St, City",
      "rating": 4.2
    }
  ],
  "status": 200
}
```


GET /restaurants/details/{id} - Retrieve restaurant details


```
* Endpoint path: `/restaurants/details{id}`
* Endpoint method: `GET`
* Query parameters:

```



* ``id`: Unique identifier of the restaurant for which details are requested`


```
* Headers:
  * Authorization: Bearer token

* Request shape (JSON): None

* Response: Retrieves detailed information about a specific restaurant


* Response shape (JSON):
   {
  "id": "xyz123",
  "name": "Italian Trattoria",
  "address": "123 Main St, City",
  "rating": 4.5,
  "reviews": [
    {
      "user": "John Doe",
      "comment": "Great food and ambiance!",
      "rating": 5
    },
    {
      "user": "Jane Smith",
      "comment": "Excellent service!",
      "rating": 4.8
    }
  ],
  "photos": [
    "https://example.com/photo1.jpg",
    "https://example.com/photo2.jpg"
  ],
  "status": 200
}
```


GET /restaurants/reviews/{id} - Fetch reviews for a restaurant


```
* Endpoint path: `/restaurants/reviews/{id}`
* Endpoint method: `GET`
* Query parameters:

```



* ``id`: Unique identifier of the restaurant for which reviews are requested`


```
* Headers:
  * Authorization: Bearer token

* Request shape (JSON): None

* Response: Retrieves reviews for a specific restaurant based on its unique identifier


* Response shape (JSON):
  {
  "restaurantId": "xyz123",
  "reviews": [
    {
      "user": "John Doe",
      "comment": "Great food and ambiance!",
      "rating": 5
    },
    {
      "user": "Jane Smith",
      "comment": "Excellent service!",
      "rating": 4.8
    }
  ],
  "status": 200
}
```


**User Profile**

GET /users/{id} - Get user profile information


```
* Endpoint path: `/users/{id}`
* Endpoint method: `GET`
* Query parameters:

```



* ``id`: Unique identifier of the user for which profile information is requested`


```
* Headers:
  * Authorization: Bearer token

* Request shape (JSON): None

* Response: Retrieves profile information for a specific user based on their unique identifier


* Response shape (JSON):
  {
  "userId": "abc123",
  "username": "sample_user",
  "email": "user@example.com",
  "displayName": "Sample User",
  "createdAt": "2023-01-01T12:00:00Z",
  "updatedAt": "2023-10-26T08:30:00Z",
  "status": 200
}
```


PUT /users/{id}/ - update user's information (first, last, email, icon)


```
* Endpoint path: `/users/{id}`
* Endpoint method: `PUT`
* Query parameters: None
* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
{
  "firstName": "NewFirstName",
  "lastName": "NewLastName",
  "email": "newemail@example.com",
  "icon": "base64encodedimage"
}

* Response: Updates user information(first name, last name, email, icon) for the specified user


* Response shape (JSON):
{
  "message": "User information updated successfully",
  "status": 200
}
```


GET /users/{id}/reviews - Get user's reviews


```
* Endpoint path: `/users/{id}/reviews`
* Endpoint method: `GET`
* Query parameters:

```



* ``id`: Unique identifier of the user for which reviews are requested`


```
1* Headers:
  * Authorization: Bearer token

* Request shape (JSON): None

* Response: Retrieves reviews for a specific user based on their unique identifier


* Response shape (JSON):
  {
  "reviews": [
    {
      "reviewId": "review123",
      "restaurantId": "restaurant456",
      "rating": 4.5,
      "comment": "Great experience!",
      "createdAt": "2023-05-15T14:30:00Z"
    },
    {
      "reviewId": "review789",
      "restaurantId": "restaurant789",
      "rating": 3.2,
      "comment": "Nice ambiance but food was average.",
      "createdAt": "2023-08-20T18:45:00Z"
    }
  ],
  "status": 200
}
```


PUT /users/{id}/reviews - update user's reviews


```
* Endpoint path: `/users/{id}/reviews`
* Endpoint method: `PUT`
* Query parameters: None
* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
{
  "reviewIds": [123, 456, 789],
  "updatedReviews": [
    {
      "reviewId": 123,
      "rating": 4,
      "comment": "Updated comment for review 123"
    },
    {
      "reviewId": 456,
      "rating": 5,
      "comment": "Updated comment for review 456"
    }
    // Additional reviews can be included as needed
  ]
}

* Response: Updates user's reviews and returns a response indicating success or failure


* Response shape (JSON):
{
  "message": "User's reviews updated successfully",
  "status": 200
}
```


&lt;ADD DELETE REVIEW ENDPOINT>


### Database Schema


#### Users


<table>
  <tr>
   <td>Field
   </td>
   <td>What it is
   </td>
  </tr>
  <tr>
   <td>id
   </td>
   <td>Primary key
   </td>
  </tr>
  <tr>
   <td>username
   </td>
   <td>Unique username
   </td>
  </tr>
  <tr>
   <td>firstName
   </td>
   <td>User’s first name
   </td>
  </tr>
  <tr>
   <td>lastName
   </td>
   <td>User’s last name
   </td>
  </tr>
  <tr>
   <td>email
   </td>
   <td>User's email address
   </td>
  </tr>
  <tr>
   <td>hashedPassword
   </td>
   <td>Hashed password for authentication
   </td>
  </tr>
  <tr>
   <td><del>icon</del>
   </td>
   <td><del>User selects from predefined selection of <a href="#heading=h.48eeicyo894l">icons</a></del>
   </td>
  </tr>
</table>


_Icons will be stored on the frontend, not the backend_


#### Restaurants - from third party API for the front end.


<table>
  <tr>
   <td>Field
   </td>
   <td>What it is
   </td>
  </tr>
  <tr>
   <td>id
   </td>
   <td>Primary key
   </td>
  </tr>
  <tr>
   <td>googlePlaceId
   </td>
   <td>ID from Google Places API
   </td>
  </tr>
  <tr>
   <td>displayName
   </td>
   <td>Name of the restaurant
   </td>
  </tr>
  <tr>
   <td>rating
   </td>
   <td>Aggregate rating based on user reviews
   </td>
  </tr>
  <tr>
   <td>photo
   </td>
   <td>Contains the REQUIRED sub fields: \
name: (Where we’ll get the URL to the photo from)
<p>
authorAttributions {displayname, uri, photoUri}
   </td>
  </tr>
  <tr>
   <td>bookmarked
   </td>
   <td>bool (manual action from user, triggered by button click)
   </td>
  </tr>
  <tr>
   <td>priceLevel
   </td>
   <td>[ PRICE_LEVEL_FREE, PRICE_LEVEL_INEXPENSIVE, PRICE_LEVEL_MODERATE, PRICE_LEVEL_EXPENSIVE, PRICE_LEVEL_VERY_EXPENSIVE ]
   </td>
  </tr>
  <tr>
   <td>type
   </td>
   <td>displays cuisine/eatery category (seafood_restaurant, coffee_shop, etc)
   </td>
  </tr>
  <tr>
   <td>userRatingCount
   </td>
   <td>Number of reviews from google
   </td>
  </tr>
  <tr>
   <td>gourmandRatingCount
   </td>
   <td>Number of reviews from our app users
   </td>
  </tr>
  <tr>
   <td>weekdayDescriptions
   </td>
   <td>String formatted hours of operation
   </td>
  </tr>
  <tr>
   <td>website
   </td>
   <td>url
   </td>
  </tr>
  <tr>
   <td>formattedAddress
   </td>
   <td>String formatted full address of restaurant
   </td>
  </tr>
  <tr>
   <td>internationalPhoneNumber
   </td>
   <td>String formatted phone number
   </td>
  </tr>
</table>



#### Reviews


<table>
  <tr>
   <td>Field
   </td>
   <td>What it is
   </td>
  </tr>
  <tr>
   <td>id
   </td>
   <td>Primary key
   </td>
  </tr>
  <tr>
   <td>publishTime
   </td>
   <td>Auto generated upon post
   </td>
  </tr>
  <tr>
   <td>author
   </td>
   <td>Foreign Key to Users table, review author
   </td>
  </tr>
  <tr>
   <td>userIcon
   </td>
   <td>Foreign Key to Users table
   </td>
  </tr>
  <tr>
   <td>text
   </td>
   <td>Body/content of the review
   </td>
  </tr>
  <tr>
   <td>restaurantId
   </td>
   <td>Foreign Key to Restaurants table
   </td>
  </tr>
  <tr>
   <td>rating
   </td>
   <td>Rating given by the user (int 1-5)
   </td>
  </tr>
  <tr>
   <td>photo
   </td>
   <td>URL to where photo is saved
   </td>
  </tr>
</table>


*** photo with s3 Boto3 AWS SDK ??

Photo database (FK to reviews)

**External APIs Integration:**

Google Places API

**Security Considerations:**

**Other Considerations:**

Cost: Each Google Places API key comes with $200 of free credit per month.



* One request does not have a uniform price.
* The type and number of fields included in the request impacts the total price of the request.
* We will need to keep an eye on usage while testing.
* It is crucial to avoid infinite loops in our code to avoid making expensive and lengthy requests.

**Error Handling:**



* Implement a global error handler in FastAPI to catch and format error responses uniformly.
* Use HTTP status codes to reflect the nature of the error (e.g., 400 for bad requests, 404 for not found, 500 for internal server errors).

**Testing:**



* Write unit tests for each endpoint using FastAPI's TestClient.
* Perform integration testing to ensure different parts of the application work together as expected.


##


## References


### Wireframe

[Figma Wireframe](https://www.figma.com/file/nlhnWwGS93gqpVt6UOtOk4/Restaurant-Review-App?type=design&node-id=0-1&mode=design&t=NTV57G3i2rjgit7h-0)


### API Instructions



1. Go to [https://console.cloud.google.com/google/maps-apis/discover](https://console.cloud.google.com/google/maps-apis/discover)
2. Create your Google Cloud account
3. Create a New Project
4. Create API Key
5. Go to Library
6. Search for and enable these 3 APIs: Geocoding API, Maps JavaScript API, Places API (New)
7. Set an application restriction = None
8. Set API restrictions = Geocoding API, Maps JavaScript API, Places API (New)


### Meeting Planning




### Google Places API Sample Result






### Group Agreement




### Icons



Icons below are sourced from [TheNounProject](https://thenounproject.com/browse/collection-icon/food-32112/?p=1).

Users can select from different food-related icons to use as their profile icon.


![alt_text](images/image1.png "image_tooltip")


don’t need to store it in the database on the backend -

instead, save it in an object in javascript on the frontend

usestate that can reference the icons on the front end (context wrap)

OpenTable


### Unit Tests



1. All route endpoints
    1. get_all
    2. get_by
    3. the negatives and errors (add your own flavour to 401 and 403s)
    4. Don’t need to test update or delete
2. Things where you do logic that handles all the cases: Within your code look for “if this then do that”
3.
4. authentication
    5. (Don’t test overall authentication)
    6. Does user have a token
    7. Not authorized 403
    8. Not the happy path:
    9. Does function return the right status code if you’re not authenticated
5. 404 if item does not exist in database
6. Other test ideas:
    10. requirements.txt are actually downloaded
