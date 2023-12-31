## Fri, Dec 8
Features/issues that you worked on and who you worked with:
-Yaosheng led our group in making unit tests.  Made styling tweaks to the restaurant detail component, and removed console errors if a user is not logged in.

A reflection on any design conversations that you had
-Katrine was awesom in crafting a must do list to focus our last project days on.

At least one ah-ha! moment:
-The google review author photos are inconsistently loading, so having a backup image seems to work well here.

## Thur, Dec 7
Features/issues that you worked on and who you worked with:
-Troubleshot the main branch not working with Katrine and Erin, found out the Lint made some codebreaking edits for long strings.  Reduced the request for google photos by half to render faster. 

A reflection on any design conversations that you had
-We decided to replace the detail rating stars for a better look.

At least one ah-ha! moment:
-Found out there was a missing useEffect in the search results component that prevented the list results from rerendering if you searched inside the search results page.

## Wed, Dec 6
Features/issues that you worked on and who you worked with:
-Fixed the list results map not rendering issue.  CI/CD setup with the whole team.

A reflection on any design conversations that you had
-If I search a location on the main page, the list shows up but the map doesn’t render with markers, why?

At least one ah-ha! moment:
-Found out the onLoad syntax for the map viewport was blocking the map from rendering, simplifying the logic just to use the viewport center fixed the issue.

## Tues, Dec 5
Features/issues that you worked on and who you worked with:
-Tried and tried to make an interactive globe for the homepage but ran into too many issues to continue down that road. Added a map for the homepage.

A reflection on any design conversations that you had
-If I search a location on the main page, the list shows up but the map doesn’t render with markers, why?

At least one ah-ha! moment:
-Found out the onLoad syntax for the map viewport was blocking the map from rendering, simplifying the logic just to use the viewport center fixed the issue.

## Mon, Dec 4
Features/issues that you worked on and who you worked with:
-Fixed the list results map not rendering issue.  CI/CD setup with the whole team.

A reflection on any design conversations that you had
-If I search a location on the main page, the list shows up but the map doesn’t render with markers, why?

At least one ah-ha! moment:
-Found out the onLoad syntax for the map viewport was blocking the map from rendering, simplifying the logic just to use the viewport center fixed the issue.

## Fri, Dec 1
Features/issues that you worked on and who you worked with:
-Started working on making a map for the restaurant list results.

A reflection on any design conversations that you had
-Discussed making unit tests as a group.

## Thur, Nov 30
Features/issues that you worked on and who you worked with:
-Turned the restaurant titles into links to their respective detail views

A reflection on any design conversations that you had
-If a search returns null or error it should display a message saying No restaurants found

## Wed, Nov 29
Features/issues that you worked on and who you worked with:
-Got the restaurant search working on the frontend with Yaosheng.

A reflection on any design conversations that you had
-Not much design conversation was had, we just worked on fixing the front end console errors(Erin had a good fix for one of them through switching REACT_APP_API_HOST to VITE_APP_API_HOST in our .env files), finding the right syntax to key into Google Places API response and then mapping it to the homepage.

At least one ah-ha! moment:
-The default Vite text font was white, so after changing the background to white we eventually figured out to switch the font to black.

## Tues, Nov 28
Features/issues that you worked on and who you worked with:
-Tried to move the Nav bar to the top based on Yaosheng's code. 

A reflection on any design conversations that you had
-The review with nested photo is pretty difficult, looks like Bart showed an alternative to S3 bucket so Trey may pivot to that option...also we decided to leave the async non-async code as is and move forward.  

At least one ah-ha! moment:
-Our connection pool isn't async and requests isn't either.  

## Mon, Nov 27
Features/issues that you worked on and who you worked with:
-Backend -- Login with Erin and Favorites with Yaosheng.

A reflection on any design conversations that you had
-Noticed that the login form on FastApi has username, not sure how we can change it to email.  Async isn't playing nice with Favorites create/get and Restaurant search functions so we left them out.  

At least one ah-ha! moment:
-Since photos will be submitted with the review, we're moving some photo code inside the review post function.  Seems a bit dense/heady but looking forward to seeing how they play together eventually.


## Wed, Nov 22
Features/issues that you worked on and who you worked with:
-Discussed and reconfigured our database tables so they made more sense.

A reflection on any design conversations that you had
-We figured out that the restaurants table wasn't necessary for anything other than seed data(I might be able to use it for a best restaurants feature).  The photos table will have a foreign key to the reviews, since you can only post a photo while submitting a review(we don't have capability of uploading multiple photos though - do we want or need to?). All tables except restaurants will have a foreign key to accounts.

At least one ah-ha! moment:
-It was nice to get out of the coding forest and spend time contemplating the big picture with our tables. 


## Tues, Nov 21
Features/issues that you worked on and who you worked with:
-Setup the endpoints for restaurant list and details.  Worked with Katrine to figure out her API key access.  I forgot to document the steps I took to set up Google Places so we were chasing code rather than tweaking settings. 

A reflection on any design conversations that you had
-The table migrations for the restaurant seem to be in flux, we might need to consolidate them into a bigger table to handle all the logged in user interactions(review, rate, post photo, add favorite). None of these interactions depend on the other so I'm not sure how to modify them yet.

At least one ah-ha! moment:
-Always leave a note/annotate, it's easy to forget stuff. 


## Mon, Nov 20
Features/issues that you worked on and who you worked with:
-I worked with Trey to make more queries/routers then switched over to restaurants to start learning how to code the google api requests for fastapi.

A reflection on any design conversations that you had
-At first I was thinking to crud out the endpoints with seed data or a create, but realized that we might as well get the api interaction going.

At least one ah-ha! moment:
-A journey of a thousand git pushes begins with a single git pull. 

## Fri, Nov 17
Features/issues that you worked on and who you worked with:
-I worked with Trey on Queries/Routers for a feature where users can store photos.

A reflection on any design conversations that you had
-Trey has experience with Amazon S3 cloud storage so we went in that direction.  Lots to learn there.

At least one ah-ha! moment:
-We had some git trouble with git pull/push on the same branch so I learned more about git stash to git pull, then git stash pop and resolving merge conflicts before pushing.

## Thur, Nov 16
Features/issues that you worked on and who you worked with:
-Added authentication to our project with the entire team.  Added table migration files as well.

A reflection on any design conversations that you had
-Not so much design discussion today, we just focused on getting some tangible code in our project.

At least one ah-ha! moment:
-We'd been wrestling with a fastapi pool connection error all afternoon. Finding and fixing the infoBASE(which should have been DATABASE_URL) bug in our pool connection queries code at the end of the day was a great feeling!

## Wed, Nov 15
Features/issues that you worked on and who you worked with:
-Added tables for favorited restaurants in DB Fiddle

A reflection on any design conversations that you had
-Went over the API request bottlenecks with Bart and the team. We decided to be more strategic to limit the amount of requests made due to the proprietary nature of the Google services.  

At least one ah-ha! moment:
-Felt like I might've been a bit wrapped up in the front-end aspects too early on so for now I want to stay on track with everyone in getting the backend completed.


## Tues, Nov 14
Features/issues that you worked on and who you worked with:

-Worked with the whole team creating feature issues and journal files in gitlab

-Found a list of the top 100 restaurants in the world. Saved as a google sheet file for database seed data to populate the main page heatmap.  I searched and added the Places API IDs and the location (lat/lon) coordinates for all of them so we can bypass the Geocoder API requests.

-Grabbed a list of all the Michelin 3 stars, need to get location data for them and check the overlap with the top 100 list, maybe I can do a blend of both to save time and then make a title of the #number best restaurants around the world. 

-Need to ask/figure out how to plug the datasets into the database tables for the maps and detail page.


A reflection on any design conversations that you had:

-Discussed possibly adding a referral system to the authentication, I need to watch/read the auth Learn module

At least one ah-ha! moment:

-After finishing the coordinate data for the top 100 list, I realized I could also pull Michelin 3-star data to add more prestige content to our website.
