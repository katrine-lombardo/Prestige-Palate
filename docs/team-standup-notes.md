# Team Stand Up Notes

## Monday

Today’s the day! Any thoughts or updates?

Cleanup suggestions before submitting:

1. Remove commented-out descriptions
2. Spacing/linting
3. Fill out our individual parts under the Team blurb on the Readme
4. Fill out our individual parts under the Testing section on readme
5. Refactoring code
6. Presentation plan for instructors:
    - Elevator pitch: The Prestige Palate app is built for elite foodies (LIKE YOU) who want to explore their next global culinary adventure. With Prestige Palate you can keep track of the hottest eateries across the globe, follow fellow tastemakers, and explore your horizons. Look back at fond memories by viewing your photo and reviews, or share warnings to friends about less-than-perfect dining experiences. Prestige Palate is the premium app for foodies who are tired of paid reviews and slanted, biased scores. With Prestige Palate’s exclusive referral program, you know you’re getting the real deal from real people – No bots, no stevia, all natural.
    - Describe MVPs
        - A referred user can refer another user by submitting their friend’s email
        - A referred user and sign up and log in using that email
        - A non logged-in user can:
            - View the homepage and make a search in our beautiful map
            - View a map of the top 50 restaurants in the world
            - View a list of restaurants populated from a combination of Google Places API and Google Geocoding API
            - Sort and filter that list
            - Click into a specific restaurant to view details about that restaurant, which includes google reviews, google photos, google “about” information
            - View Prestige Palate exclusive content, which includes user reviews, photos, and ratings
            - View Prestige Palate user pages, which includes a list of a user’s reviews, photos, followers, and who they are following
        - A logged-in user can:
            - All of the above, plus…
            - Save/bookmark restaurants to their Favorites page
            - Create a review and upload photos on Prestige Palate on the restaurant detail page
            - Access a “My Reviews” page which includes the logged-in user’s reviews, photos, followers, and following
            - Update or delete their published reviews
            - Follow and Unfollow users
            - Access a dashboard to view a list of reviews from users you follow
7. Completed Readme
8. Finish readme
9. Finish journals
10. Enter about us section (thank you Erin!!)
11. Clean up branches?
12. Add these standup notes to docs directory

Final QC notes:

Home

1. Added custom document title / tab text

MyReviews

    1. Unfollowed palates stick around until page is refreshed, how to use the context store to update?
    2. + Follow button appears on users I already follow
    3. Fix where if !token, return the modal Yaosheng and Trey made plus the message “Please log in to see reviews”
    4. If a user is not logged in, redirect to home page

Edit profile

    5. Black horizontal scrollbar, can all icons fit neatly without scrolling?

Create review

    6. (Katrine) I can’t submit a review with a photo attached, I see console error “CreateReview.jsx:165 Error posting review: Unprocessable Entity”

Sidebar

    7. Doesn’t auto-close when navigating to another page

Search results

    8. Console log data should be deleted
    9. Order of restaurants is alphabetical, is that how we want it sorted?
    10. (Katrine) Bookmark toggle doesn’t allow click until photos are loaded

Restaurant detail page

    11. Google author image links broken
    12. The word “Author” appears on each review
    13. Scrollbars for google reviews are black
    14. Should we move google reviews underneath our app reviews?

## Friday

Team to-dos:

1. Unit tests with Yaosheng

**MUST DO**

1. Deployment
2. DetailRestaurant &
    1. Google review photos issue inconsistent loading, console errors
    2. Make decision on whether to keep google review photos and/or links?
    3. Google photos on restaurantDetail photos tab: console errors
    4. Console errors when user not logged in: TypeError: Cannot read properties of null (reading 'account') at Sidebar.jsx:31:38 -
    5. Convert Price Level:price level_very_expensive to dollar signs or st?
    6. Least ratings -> fewest ratings
    7. # ratings not appearing in list view
3. ListAppReviews 8. Be the first to review button is broken and navigating to the wrong link 9. Format of the review is off with the icon not properly aligned. Getting a vaWarning: validateDOMNesting message
4. Favorites 10. When a user has no favorite restaurants the loading screen runs, check out fetching endpoints
5. Create review & ? 11. Error posting review with a photo if logged out 1. Modal to show if you’ve been logged out 2. If the user is logged out, the page refreshes and the user is brought to the login page
6. MyReviews 12. On loading displays “no reviews” instead of loading 13. Add a switch toggle to my reviews to favorite a restaurant 14. Move “no photos here yet” code (duplicated when multiple reviews) 15. Add link to following username to their page 16. Add link to followers username to their page 17. Double check profile user icons for followers/followings 18. If already following/follower of user, display different text 19. Only render page if username is an actual username 20. Fix where if !token, return the modal Yaosheng and Trey made plus the message “Please log in to see reviews”
7. Friends 21. Consolidate / differentiate between friends and followers, maybe split up my reviews 22. What’s the difference between “friends” and the following/followers on the my reviews page? Can we consolidate or split it up? 23. Console errors get photos not found 24. Broken icon link 25. Follow friends?

Nice to have

1. Refactoring components?
2. Sign Up
    1. “This email is not eligible for account creation.”
3. Main page 2. Nav user icon broken image link when loading
4. RestaurantCard 3. Favourite restaurants
5. Flow of creating review after uploading photo
6. Tab title custom
7. Edit profile 4. Make changing name optional when updating 5. Edit icon instead of edit profile? Or just icons on top of first/last?
8. Overall CSS / style stuff

## Thursday

Updates

-   Erin set up referral logic, exciting!
-   Maps points are displaying woooo
-   GO TREY CRUSH IT CRUSH IT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Team to-dos:

1. Let’s plan to do unit tests together tomorrow morning and pencils down on backend changes today.
    1. New unit test branch
2. How can the team help with deployment?
3. What’s left to do?
4. If you’re done/have downtime, checkout the readme: 2. Help Trey fill out descriptions of each page on the GHI 3. Do your own individual description of contributions

Daily gameplan

-   Erin: CI/CD and deployment
-   Katrine: Bootstrap restaurant details, bootstrap followers/following lists, add average rating stats for google v PP reviews
-   Michael: Look into rendering speed on google photos
-   Yaosheng: Help Trey with updating reviews, photos (weekend: integration test)
-   Trey: Working on routes for updating reviews from detail restaurant, content to display alongside app review photos, testing functionality

## Wednesday

Updates

-   Erin got followers/following up and running!
-   Map on homepage

Team to-dos:

1. Erin’s QA notes in slack (thank you ui/ux queen 👑)
2. Everyone – Error handling
3. Unit tests, should we aim to do those tomorrow? Friday?
4. Deployment, what do we need to know? How can we help?
5. As we get close to deadline and pressure increases, let’s take a moment to think about our

Daily gameplan

-   Erin: Deployment, referral link if time
-   Katrine: Add restaurant name to my reviews, fix icons on listappreviews, add followers to myreviews, style restaurant details, also need to work with Trey on how to display photos in myreview and listappreviews
-   Michael: Map loading inconsistently depending on search origination
-   Yaosheng: Favourite restaurants with toggle, favourite restaurants title and links
-   Trey: Photo url logic, test uploading pictures

## Tuesday

Updates

-   We can update multiple photos at once now
-   Filter and sort code, go Yaosheng 🙌

Team to-dos:

1. What do we need to know about deployment? Can we start now? Does it mean we have to be pencils down on our code? If not, what are the pieces that can continue to be adjusted?

Daily gameplan

-   Erin: Following/followers backend code
-   Katrine: Display icon next to username on ListAppReviews, update MyReviews, RestaurantDetail
-   Michael: Working on map for list of restaurants, merging to main
-   Yaosheng: Deployment steps
-   Trey: Incorporate the ellipses for update/delete etc, styling

## Monday

Weekend updates

-   Review Gitlab [milestones](https://gitlab.com/mambo-number-5/module3-project-gamma/-/milestones) and [issue board](https://gitlab.com/mambo-number-5/module3-project-gamma/-/boards)
-   What are the most important outstanding milestones/issues to complete?
    1. Complete backend code (so we can work on unit tests, which is 15% of our grade)
    2. Complete frontend code (Get all links working, be able to navigate through site without errors)
    3. Code cleanliness (5%)
    4. Documentation (5%)
-   What date should we aim for to start deployment process? Instructors recommended giving ourselves more time than we think we need for deployment. When should we aim to be pencils down?

Team to-dos:

1. One person asks about deployment process?
2. Bootstrap: Any objections to using the more recent release of bootstrap for stylising?
3. EOD: Should we rebuild backend?

Daily Gameplan:

-   Erin: Look into deployment with Yaosheng, fix searchbar and icons
-   Katrine: Finish “My Reviews” page “List reviews”, update bootstrap
-   Michael: Merging branches fun
-   Yaosheng: Look into deployment with Erin
-   Trey: Finish create, update, and delete reviews

## Friday

Updates since yesterday

-   Login and signup frontend works!
-   Got photos from google
-   Create review and get google reviews working
-   Finished favourite restaurants

Team To-Dos:

1. ⛄ Advent of code today!! Go to github and let’s get started [https://adventofcode.com/](https://adventofcode.com/)
2. Update fastAPI endpoints to RESTful (account_id v username v users etc)
3. Think about front-end urls too

Daily gameplan

-   Erin: Getting edit profile working and change password
-   Katrine: Weekend: Moving standup notes over to issues in gitlab, GetMyReviews and GetAppReviews
-   Michael: Got photo, looking at speed
-   Yaosheng: Error handling for backend code, and restaurant detail page
-   Trey: Create review and add picture, update and delete

## Thursday

Updates since yesterday

-   Erin’s login magic, please show and tell
-   Trey updated the README ⭐

Team To-Dos:

4. ⛄ Advent of code starts tomorrow! Let’s work on those problems as a team in place of the time that we usually spend in lectures (Trey helping us set up github)

Daily gameplan

-   Erin: Retyping login function with error handling (fix what they gave us), login form and another account form (edit, signup, update password, etc)
-   Katrine: Anybody available for peer programming/[body doubling](https://www.medicalnewstoday.com/articles/body-doubling-adhd)? Working on view my reviews and view app reviews by restaurant
-   Michael: Finish building out fields in restaurant detail page
-   Yaosheng: favorite restaurant component
-   Trey: Readme and docs into main YAY, build create review form, update and delete review

## Wednesday

Updates since yesterday

-   Main is healthy again 🎉
-   Create review progress uploading!! Uploading to the bucket but not the database

Team To-Dos:

5. Frontend building
6. Do we need to be using this? [https://gitlab.com/mambo-number-5/module3-project-gamma/-/boards](https://gitlab.com/mambo-number-5/module3-project-gamma/-/boards)

Daily gameplan

-   Erin: For auth, for every page that requires communication to backend. Each page has to check authentication. Research how to implement context and get into the store
-   Katrine: Clean up error handling in reviews, then front-end page “View My Reviews”
-   Michael: Frontend search bar
-   Yaosheng: Basic frontend framework
-   Trey: Photo upload in create_review

## Tuesday

Updates since yesterday

-   Yaosheng signup form and login form!
-   Trey and Katrine working on new photos-reviews branch to combine code
-   Fixed ReviewQueries create_review and get_reviews_by_user

Team To-Dos:

7. Change to database photos table: user_id → username (remember to burn your docker volumes after git pull)
8. At EOD Let’s get main branch stable and working by merging our functional code
9. Async situation: our psychopg is only for synchronous
    1. Option 1: Download different psychopg that supports asynch functions
    2. Option 2: Change async functions to sync (might be easier?)

Daily gameplan

-   Erin: Finishing authentication
-   Katrine: 🆘 ReviewQueries!!
    -   3 functions still not working: update_review, delete_review, get_app_reviews_for_restaurant
    -   I need two separate route endpoints for GET requests for reviews from google and reviews from app
    -   Requesting cleanup for 3 working functions: get_reviews_by_account, create_review, get_google_reviews_for_restaurant
-   Michael: Frontend main page logic
-   Yaosheng: Research asych best option with Michael, create react components for user profile
-   Trey: photos-reviews with Katrine to clean up backend

## Monday

Weekend updates

-   Yaosheng FK update to migrations for favourites
-   Katrine made the create_review function work in FastAPI… ish
-   Trey’s BrowserRouter branch

Team To-Dos

1. Welcome to frontend land!
    1. Basic skeleton outline / wireframe
    2. Fun stuff AKA UI :) Mood board! (fonts, colour palette, style, general mood, key states, reference images)
2. Resolve outstanding backend issues & test FastAPI endpoints 3. Reviews 4. Photos

Daily Gameplan

-   Erin: Front end authentication
-   Katrine: Reviews routers and queries, FastAPI endpoint testing
-   Michael: Favorites API endpoint testing,
-   Yaosheng: Frontend Sign in / Sign out
-   Trey: Photos routers and queries

## Wednesday

Thanksgiving plan

-   Rest and recharge &lt;3
-   Solo work BUT stay aware of slack Sunday
    -   Nobody touch MAIN branch until Sunday when we can all check in with each other
        -   Except nav setup by Trey
-   Backend
    -   Update routes and queries
        -   Katrine: Reviews routers and queries
        -   Yaosheng: Favourited Restaurants
        -   Erin: Context and Redux? RTK? videos and research
        -   Michael: FastAPI, S3 video, google maps fun time
-   Start on frontend
    -   Build basic framework for each page
        -   Yaosheng: Restaurants and research :)
        -   Trey: Browser router setup in main function rendered, Basic nav setup (Completed. Need to run npm install react-router-dom within the GHI container in docker in order to test functionality)

What we completed yesterday

-   API code up and running (minus one small issue with print statement)
-   Accounts password and usernames can be changed!
-   All photos routers and queries working
-   Unit tests major progress

Team To-Dos

1. Thanksgiving work plan
2. Confirm authentication issues are resolved
3. Confirm Restaurant setup
    1. Notes from our convo:
        1. We could display only 1 pick from API and the rest from a table full of seed data
        2. We could change the API we’re using to a free one
    2. DECISION: Keep favourites tables, make separate API calls every time 3. When a user favourites a restaurant, the google place id is stored to the favourites table 4. ONLY To play with seed data, use restaurants table. Otherwise we don’t use restaurants, we just make the API calls. 5. Google_place_id -> place_id
4. Reviews and photos
5. User_icon field is in **reviews** – Does it make sense to keep it there or move to **accounts** instead?
6. Basic frontend, colour palette, nav bar etc
7. Do we each have to write one unit test? I think we might have to… Fact check please

Updates and Gameplan

<table>
  <tr>
   <td>
   </td>
   <td><em>Yesterday</em>
   </td>
   <td><strong>Today</strong>
   </td>
  </tr>
  <tr>
   <td><strong>Erin</strong>
   </td>
   <td><em>Accounts routers and queries</em>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><strong>Katrine</strong>
   </td>
   <td><em>Reviews routers and queries \
Timeline</em>
   </td>
   <td>Check out the timeline above, accurate?
<p>
 🆘 Need help with reviews
   </td>
  </tr>
  <tr>
   <td><strong>Michael</strong>
   </td>
   <td><em>Google places API & photos</em>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><strong>Yaosheng</strong>
   </td>
   <td><em>Unit tests</em>
   </td>
   <td>Finish the favourited_restaurants part
   </td>
  </tr>
  <tr>
   <td><strong>Trey</strong>
   </td>
   <td><em>Env file setup, photo fun</em>
   </td>
   <td>
   </td>
  </tr>
</table>

## Tuesday

What we completed yesterday

-   Working accounts
-   Got FastAPI to run

Things to research:

-   How to flag a restaurant as “favourited” while considering caching needs?
-   Conceptualising our “favourited” page - Does it make it easier if we think of it like a shopping cart?
-   For frontend stuff: Confirming we want to use RTK instead of react hooks? (for global variables)

Team To-Dos:

1. Check out Michael’s restaurant API magic ✨
2. Confirm authentication issues are resolved
3. Confirm Restaurant setup
    1. Add favourited_restaurants for cached restaurants to be saved on our database
    2. [HOLD UNTIL MVP COMPLETE] Confirm where we landed on best_restaurants

Gameplan & updates

<table>
  <tr>
   <td>Erin
   </td>
   <td>Accounts routers and queries
   </td>
  </tr>
  <tr>
   <td>Katrine
   </td>
   <td>Reviews routers and queries \
Timeline
   </td>
  </tr>
  <tr>
   <td>Michael
   </td>
   <td>Google places API & photos
   </td>
  </tr>
  <tr>
   <td>Yaosheng
   </td>
   <td>Unit tests
   </td>
  </tr>
  <tr>
   <td>Trey
   </td>
   <td>Env file setup, photo fun
   </td>
  </tr>
</table>

## Monday

What we completed last week

-   Lots of backend and creative troubleshooting
-   Built out router CRUD for Accounts, Restaurants, Reviews, and Photos

Things to research:

-   How to flag a restaurant as “favourited” while considering caching needs
-   For frontend stuff: Confirming we want to use RTK instead of react hooks? (for global variables)
-   Conceptualising our “favourited” page - Does it make it easier if we think of it like a shopping cart?

To complete today:

1. Check out Trey’s photo bucket magic ✨
2. Solve our authenticator confusion (call SEIR earlier rather than later)
3. Go through our routers and queries again to get everything working on the main branch
4. Look through our own code in main to get it working, while Trey and Michael work on Photo branch
5. Confirm Restaurant setup
    1. Add favourited_restaurants for cached restaurants to be saved on our database
    2. Confirm where we landed on best_restaurants
6. Project planning: What are our major milestones? 3. API endpoints completed 4. Database completed and loaded 5. Routes completed and CRUDed out 6. Auth 7. Frontend auth 8. All tests completed 9. Readme completed 10. Stretch goals

## Friday

Next week: finish up backend and make sure it works

What we completed yesterday 🎉

-   Added Queries and Routers
-   Added authentication
-   Added migrations
-   Completed database setup, and everything worked!

To complete today:

7. Troubleshooting 11. Database column names correction 12. Queries update (get_one) 13. Account vs accounts
8. Building out router CRUD for Accounts, Restaurants, Reviews, and Photos 14. Accounts 1. POST account 2. GET list of accounts 3. GET specific account 4. DELETE account 5. PUT account 15. Restaurant 6. GET view one, Restaurant detail page 7. GET List of restaurants 16. Reviews 8. GET List of reviews 9. POST create review 10. PUT update review 11. DELETE review 17. Photos 12. GET one photo and 13. GET list all photos 14. POST create photo 15. PUT update photo
9. Hooks

## Thursday

What we completed yesterday 🎉

-   Created database with PG admin
-   Used [DB Fiddle](https://www.db-fiddle.com/#&togetherjs=he6BervSor) to create 5 SQL schemas and respective queries to build our database

To complete today:

1. Authentication
2. Finish the basic router
3. KB: Overall project gameplan, timeline, etc

## Wednesday

To complete today:

4.  Make tables
    - PG Admin: [http://localhost:8082/browser/](http://localhost:8082/browser/)
    - 5 tables:
        1. accounts Yaosheng
            - Retrieve all information for all users
            - Insert user
            - Delete user
            - Change email
            - Insert restaurant
        2. favourited_restaurants (cache) Michael
            - Insert restaurant
            - Delete restaurant
            - Update restaurant
        3. restaurants Trey
            - Retrieve a list of all restaurants saved by a user
            - Retrieve all details for a specific restaurant
            - Insert restaurant (for caching purposes)
        4. photos Katrine
            - Retrieve all photos by restaurant
            - Retrieve all photos by user
            - Insert photo
            - Delete photo
        5. reviews Erin
            - Retrieve all reviews by user
            - Retrieve all reviews for a specific restaurant
            - Insert review
            - Delete review
            - Update review
5.  Confirm personal .env files are created for everyone

        ```

    PGADMIN_DEFAULT_EMAIL="admin@email.com"
    PGADMIN_DEFAULT_PASSWORD="secret"
    REACT_APP_API_HOST=http://localhost:8000
    MAP_API_KEY=
    RESTAURANT_API_KEY=

```


1. (from yesterday) Decide who owns what on the issues board
2. KB: Overall project gameplan, timeline, etc


##  Tuesday

To complete today:



3. Go through [Learn materials for working together](https://learn-2.galvanize.com/cohorts/3735/blocks/1897/content_files/build/01-sql-II/65-module-project.md) / Collaborative coding
4. Decide who owns what (Issues board)
5. Make our first issue (Module project issue creation from yesterday’s SIS schedule)

Other business



1. Standardisation
    * Commit:  ` [ feature name ]: description of change `
    * Merge request templates Trey help plz
    * Squash commits? Or commit each individually? (Branches shouldn’t live very long, and they should be small)
2. Where to keep standup notes (~~Journal in repo? ~~This google doc? Something else?)
    * Keep in google docs, copy notes over to personal journals


##  Monday

To complete by EOD today:



6. Set up git repo
7. Confirm everyone has cloned and can access repo
8. Plan for tomorrow’s presentation
    *   **Team and app intro**
        * **Team name**: Mambo # 5
        * **App name**: Prestige Palate
        * **Who are our customers?**
            * Elite foodies who want to explore their next global culinary adventure.
            * _We are all elite foodies 🌟_
        * **What needs/desires does your application satisfy for your customers?**
            * Our users desire a new and more refined way to discover top eateries at home and abroad.
            * Our app’s users share and view trusted reviews of restaurants from other app users, reinforcing or challenging Google reviews.
            * Our app users can connect with and follow other tastemakers to expand their culinary horizons 🌟
    *  **What features/functionality do you plan to have in the application that helps your customers? **
        * If a user is not logged in, they see a heatmap view of a map showing "trending" locations (ie cities where users have left a review).
        * The user sees a search field where they can make a city selection from the world, which pulls up the top 3 restaurants to visit from any searched area.
        * If the user is logged in, they will see an additional two options: 1) Leave a review for a restaurant, and 2) Save this restaurant.
        * The user's "saved" list contains the restaurants a user saves, grouped automatically by city.
        * A logged-in user can privately or publicly share a review of their foodie experiences, and publicly shared photos/reviews will be displayed on a restaurant’s detail page and their personal profile.
        * Privately posted reviews and photos are only visible in the user’s saved log, to reminisce on previous experiences.
    * @erin  Erin’s beautiful wireframe example [https://www.figma.com/proto/nlhnWwGS93gqpVt6UOtOk4/Restaurant-Review-App?type=design&node-id=7-6&t=UZRPCJuz5YF3jrsK-0&scaling=scale-down&page-id=0%3A1&starting-point-node-id=7%3A6](https://www.figma.com/proto/nlhnWwGS93gqpVt6UOtOk4/Restaurant-Review-App?type=design&node-id=7-6&t=UZRPCJuz5YF3jrsK-0&scaling=scale-down&page-id=0%3A1&starting-point-node-id=7%3A6)
    *  Tech stack
        * Framework: FastAPI
        * Database: PostgreSQL
        * @michael Third party API: Google Places API, Maps Geocoding API
    * Stretch goals:
        * Referral codes (signup form only with a referral code)
        * Other users like you
        * Expand to attractions
        * Chatbot
```
