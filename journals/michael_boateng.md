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
