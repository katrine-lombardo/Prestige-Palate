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
