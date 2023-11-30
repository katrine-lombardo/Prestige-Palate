# APIs

# User Authentication:

POST /auth/register: Registers a new user

-   Endpoint path: `/auth/register`
-   Endpoint method: `POST`
-   Query parameters:
    None

-   Headers:

    -   Authorization: Bearer token

-   Request shape (JSON):
    {
    "name": "john_doe",
    "password": "secure_password",
    "email": "john.doe@example.com"
    }

-   Response: Registers a new user

-   Response shape (JSON):
    {
    "id": "12345",
    "username": "john_doe",
    "email": "john.doe@example.com",
    }

POST /auth/login - User login

-   Endpoint path: `/auth/login`
-   Endpoint method: `POST`
-   Query parameters: None
-   Headers:

    -   Authorization: Bearer token

-   Request shape (JSON):
    {
    "username": "john_doe",
    "password": "secure_password",
    }

-   Response: Authenticates a user and returns an access token

-   Response shape (JSON):
    {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "token_type": "Bearer",
    "expires_in": 3600
    }

POST /auth/logout - User logout

-   Endpoint path: `/auth/logout`
-   Endpoint method: `POST`
-   Query parameters: None
-   Headers:

    -   Authorization: Bearer token

-   Request shape (JSON):
    {
    "id": "123456",
    "session_token": "abcdef123456"
    }

-   Response: Logs out a user and ends the current session

-   Response shape (JSON):
    {
    "message": "Logout successful",
    "status": 200
    }

# Restaurant Information

GET /restaurants/search - Search for restaurants

-   Endpoint path: `/restaurants/search`
-   Endpoint method: `GET`
-   Query parameters:
    `query`: Search query to find restaurants
    `location`: Coordinates (latitude, longitude) for the search location
    `radius`: Search radius in meters

-   Headers:

    -   Authorization: Bearer token

-   Request shape (JSON):
    {
    "query": "Italian",
    "location": {
    "latitude": 37.7749,
    "longitude": -122.4194
    },
    "radius": 1000
    }

-   Response: Retrieves a list of restaurants based on the search query and location

-   Response shape (JSON):
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

GET /restaurants/details/{id} - Retrieve restaurant details

-   Endpoint path: `/restaurants/details{id}`
-   Endpoint method: `GET`
-   Query parameters:
    `id`: Unique identifier of the restaurant for which details are requested

-   Headers:

    -   Authorization: Bearer token

-   Request shape (JSON): None

-   Response: Retrieves detailed information about a specific restaurant

-   Response shape (JSON):
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

GET /restaurants/reviews/{id} - Fetch reviews for a restaurant

-   Endpoint path: `/restaurants/reviews/{id}`
-   Endpoint method: `GET`
-   Query parameters:
    `id`: Unique identifier of the restaurant for which reviews are requested

-   Headers:

    -   Authorization: Bearer token

-   Request shape (JSON): None

-   Response: Retrieves reviews for a specific restaurant based on its unique identifier

-   Response shape (JSON):
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

# User Profile

GET /users/{id} - Get user profile information

-   Endpoint path: `/users/{id}`
-   Endpoint method: `GET`
-   Query parameters:
    `id`: Unique identifier of the user for which profile information is requested

-   Headers:

    -   Authorization: Bearer token

-   Request shape (JSON): None

-   Response: Retrieves profile information for a specific user based on their unique identifier

-   Response shape (JSON):
    {
    "userId": "abc123",
    "username": "sample_user",
    "email": "user@example.com",
    "displayName": "Sample User",
    "createdAt": "2023-01-01T12:00:00Z",
    "updatedAt": "2023-10-26T08:30:00Z",
    "status": 200
    }

PUT /users/{id}/ - update user's information (first, last, email, icon)

-   Endpoint path: `/users/{id}`
-   Endpoint method: `PUT`
-   Query parameters: None
-   Headers:

    -   Authorization: Bearer token

-   Request shape (JSON):
    {
    "firstName": "NewFirstName",
    "lastName": "NewLastName",
    "email": "newemail@example.com",
    "icon": "base64encodedimage"
    }

-   Response: Updates user information(first name, last name, email, icon) for the specified user

-   Response shape (JSON):
    {
    "message": "User information updated successfully",
    "status": 200
    }

GET /users/{id}/reviews - Get user's reviews

-   Endpoint path: `/users/{id}/reviews`
-   Endpoint method: `GET`
-   Query parameters:
    `id`: Unique identifier of the user for which reviews are requested

-   Headers:

    -   Authorization: Bearer token

-   Request shape (JSON): None

-   Response: Retrieves reviews for a specific user based on their unique identifier

-   Response shape (JSON):
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

PUT /users/{id}/reviews - update user's reviews

-   Endpoint path: `/users/{id}/reviews`
-   Endpoint method: `PUT`
-   Query parameters: None
-   Headers:

    -   Authorization: Bearer token

-   Request shape (JSON):
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

-   Response: Updates user’s reviews and returns a response indicating success or failure

-   Response shape (JSON):
    {
    "message": "User’s reviews updated successfully",
    "status": 200
    }
