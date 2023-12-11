#### Fri, Dec 8

Features/issues that you worked on and who you worked with:
* Today we spent time prioritising our "must-haves" and "nice-to-haves", and it was overall a great day which felt collaborative and productive. Trey and Michael were so helpful in that when I asked for assistance in my code, both of them lept to my aid. As a team we walked through our app and checked under all the floorboards for console logs, errors, and funny business, and compiled our priority list for the day and the weekend. I focused in on MyReviews while the others took ownership of DetailRestaurant, create reaview, and ListAppReviews.

A reflection on any design conversations that you had
* Due to some micommunication and misunderstanding, unfortunately my code from yesterday was overwritten by someone else's code, which did not feel great. It's tough to see hours of work be wasted, especially given the the number of other items on my to-do list that I could have been working on instead. Unfortunately it is what it is, and it's more important to keep moving and learn from the incident -- Lesson here being to be overly communicative about what we're working on, and being extra vigilent about team updates in slack.
 
At least one ah-ha! moment:
* It wasn't until finishing our code walk-through that I fully appreciated how much work has been done and what's left to do. It was incredible experiencing code that my teammates built, and I feel so lucky to be part of this team. I am grateful to be teamed up with such talented individuals.

---

#### Thurs, Dec 7

Features/issues that you worked on and who you worked with:
* Today I learned more about bootstrap utilities and updated our DetailRestaurant page. I implemented a carousel but had trouble enabling the ability to display only a particular height of card, truncated with the ability to expand. 

A reflection on any design conversations that you had
* I took over the follower/following frontend which was very interesting, but I found myself frequently confused by the terminology of "following_username" and "follower_username". In the next iteration of this project, I foresee myself making some updates on the backend for better human readability.
 
At least one ah-ha! moment:
* I learned how to capture a user's average rating using math, which is not my strong suit.

---

#### Wed, Dec 6

Features/issues that you worked on and who you worked with:
* I worked with Trey to get photos loaded into user review pages. I updated MyReviews, UserAppReviews, and RestaurantDetails with stylising and bootstrap. I also added following/follower logic to the frontend that Erin developed on the backend.

A reflection on any design conversations that you had
* We are moving on to the look and feel of the site now, the majority of functionality is in there.
 
At least one ah-ha! moment:
* I was able to connect account_id and profile_icon_url to the reviews model by updating queries and not modifying the database. This would have saved me countless hours of work over the last two weeks had I just done this first!

---

#### Tues, Dec 5

Features/issues that you worked on and who you worked with:
* Today I was able to integrate user icons into our list app reviews, and further refined how reviews appear. I spent a good amount of time on error handling, but most time was spent on correcting data fetches and increasing the loading speed, which still needs work.

A reflection on any design conversations that you had
* We are starting to get into more stylising spaces so now we're finding ourselves having to prioritise those areas where the functionality is more important than the design. We're down to the wire so the pressure is building, and we have to keep our heads above water...
 
At least one ah-ha! moment:
* It was really exciting when I was able to figure out a smarter way to fetch data (specifically fetching an account username from within fetching for reviews)

---

#### Mon, Dec 4

Features/issues that you worked on and who you worked with:
* Over the weekend and today I was able to make major headway on front end developement of MyReview and ListAppReviews. I also spent some time converting our standup notes into Gitlab's issues board and wrote the milestones.

A reflection on any design conversations that you had
* We reviewed the original design discussions we had earlier and have been making more comparisons to the wireframe as we get deeper into our frontend development. 
 
At least one ah-ha! moment:
* It was wonderful to see my backend code finally working on the frontend, it's starting to feel like a real project now.

---

#### Fri, Dec 1

Features/issues that you worked on and who you worked with:
* I spent most of the day updating endpoints, but this conversation is slightly bigger than I originally thought.

A reflection on any design conversations that you had
* We still need to solve the issue of how our endpoints are set up as Erin and I spent the last three weeks developing code around two separate endpoints that are no longer restful. I spent most of the day attempting to convert my code to match Erin's endpoint of accounts/id for specific accounts (Rather than accounts/username that I had set up), and found myself in a deeper pit than I had been before. It feels like for every step forward I take two steps back. I'm starting to see why other teams divided their work by work area (front end, back end, etc) rather than dividing by feature, because finding consistency across our areas has taken a surprisingly longer amount of time than I anticipated.
 
At least one ah-ha! moment:
* We spent some time together playing with the Advent of Code which was interesting, and far more challenging than I anticipated!

---

#### Thurs, Nov 30

Features/issues that you worked on and who you worked with:
* Today Trey and I worked toegether and pomodoro'd, it was a great focus day and I was able to build out GetMyReviews and GetAppReviews.

A reflection on any design conversations that you had
* I saw Yaosheng's RestaurantCard and started thinking about how I can implement similarly beautiful code in my own area. So I started a ReviewCard and hope to be able to use this for my other review code too.

At least one ah-ha! moment:
* I got my frontend code to appear in the live app for the first time, which was extremely satisfying after spending this whole time behind the scenes on the backend.

---

#### Wed, Nov 29

Features/issues that you worked on and who you worked with:
* I spent the day updating the backend error handling for reviews and also created my first front-end code for viewing a list of reviews.

A reflection on any design conversations that you had
* Getting into the front end made us reflect on how reviews and photos should work together, and we realised that maybe the photos database wasn't event needed.

At least one ah-ha! moment:
* We were really happy to finally get Main healthy again -- We finally figured out how to collaborate and commit code together.

---

#### Tues, Nov 28

Features/issues that you worked on and who you worked with:
* Trey massively helped me today with getting all the reviews functions working. We spent a significant amount of time banging our heads against the wall using AWS, and like Trey mentioned it feels like we took several steps back. It's disheartening when our other team members are all working in the frontend already, and I feel miles behind my teammates on coding progress.

A reflection on any design conversations that you had
* After seeing Bart's message in slack about a free alternative to AWS, we will be going in a different direction with our photo storage. This is exciting and will hopefully be a lot simpler as we go back and refactor our code.

At least one ah-ha! moment:
* I learned today that the VS Code liveshare persists beyond changing branches. My mistake unfortunately led to issues with our main branch. I am getting concerned about the health of our main branch, so I'm going to think on some best practices for keeping our main branch clean.

---

#### Mon, Nov 27

Features/issues that you worked on and who you worked with:
* I am still working on the reviews queries and routers, and I'm feeling quite disheartened after spending over a week within the same code. I spent 6 hours yesterday getting the create function to work, but I'm not happy with the end result and I'm not sure how to get it up to par with the elegance of the code of my teammates.

A reflection on any design conversations that you had
* We made a breakthrough on an obstacle we've had, with not knowing how reviews and photos are submitted. We had a general idea of what we wanted to accomplish, but today we were finally able to describe it with code thanks to help from Phil.

At least one ah-ha! moment:
* Trey was generous enough to agree to work together to help each other out with getting unstuck. We both have particularly complicated chunks of backend code to work through, and I think having another pair of eyes on each others' code will be massively effective in getting this backend work behind us.

---

#### Wed, Nov 22

Features/issues that you worked on and who you worked with:
* Today as a group we took a step back and looked at our data tables. Some things weren't quite adding up, so it was a great exercise to be able to clean up and demystify some of the confusion around how our app works. 

A reflection on any design conversations that you had
* We found that going back to our original wireframe really helped us through some design confusion we had, particularly around the relationship between reviews and photos. 

At least one ah-ha! moment:
* The last time we looked at our data as a team, we had a lot less code completed. It was enlightening to see how we were able to stitch together all our thoughts and work, and make everything flow more synergistically. 

---

#### Tues, Nov 21

Features/issues that you worked on and who you worked with:
* To be able to test the Review routers and queries, I need to have Accounts and Restaurants set up. I worked with Michael to get my API key working correctly, and unfortunately I wasted far too much time looking in the wrong place for what could be going wrong. It turned out that I had not configured my API key correctly. I'm disappointed that I spent so long this week not being able to work on my own tasks, and not asking the right questions to resolve the painfully simply issues.

A reflection on any design conversations that you had
* We are still considering the best way to store restaurant data for favourited restaurants, and at the minute our closest guess is to populate a separate Favourites table with information that we cache from searches.

At least one ah-ha! moment:
* When I discovered that my API key was set up incorrectly, I facepalmed and made sure to document the configuration instructions so nobody else will have to flounder the same way I did today.

---

#### Mon, Nov 20

Features/issues that you worked on and who you worked with:
* I worked with Yaosheng to debug and merge the reviews routers and queries.

A reflection on any design conversations that you had
* We learned a lot about git merging pains and the importance of communication when making changes within the main branch. We are finally clean on main, which will allow us to further debug the code we have written.

At least one ah-ha! moment:
* Michael discovered why our YAML was behaving strangely with shutting down the FastAPI container when the server isn't yet registered with the database. We added his suggested code and now finally we are all able to work on the same clean code.

---

#### Fri, Nov 17

Features/issues that you worked on and who you worked with:
* I created our restaurants.py files for queries and routers today. My team and I coded most of the backend and git merged all our edits. Now we are debugging and troubleshooting our code for naming convention inconsistencies and some minor issues with Authentication.

A reflection on any design conversations that you had
* Today was mostly a development/action day, where we implemented the ideas we've been discussing. After submitting our restaurants code however, I think we need to evaluate how our app will work with "favourited" or bookmarked items.

At least one ah-ha! moment:
* I really enjoyed the debugging process today where we helped each other connect our code into one consistent idea. It is fun to search for solutions and use creativity to trial and error different solutions.

---

#### Thurs, Nov 16

Features/issues that you worked on and who you worked with:
* Today we all worked together to setup authentication, and we successfully migrated our tables to PG admin using migrations. Our Queries and Routers folders are set up, and we are in a good place to start adding our restaurant and reviews data.

A reflection on any design conversations that you had
* Our design is beginning to feel more solid and less nebulous, which is making me feel much better about our progress.

At least one ah-ha! moment:
* We were seeing a strange error appear ("error connecting in 'pool-1': 'NoneType' object has no attribute 'encode'"). We asked for some help from a SEIR, and we weren't able to figure it out. I googled and tried debugging and came up dry, until I realised that the error was generated by accident when we overwrote the word "data" in all places in the doc, and it accidentally grabbed the word "DATA" from "DATABASE", leaving our pool connection trying to connect to "InfoBASE". The strange caps lock format first caught my attention, and finally after making that change, it all worked!

---

#### Wed, Nov 15

Features/issues that you worked on and who you worked with:
* Set up PGAdmin and worked collaboratively with the team on completing the backend database SQL schemas and queries.

A reflection on any design conversations that you had
* We are challenging each other to become crystal clear on our deliverables, and today we had to make some decisions about how to scale our project while remaining achievable within the timeframe.

At least one ah-ha! moment:
* We got to see our app live and in action with React Vite! It's always exciting to see something living that started as a conversation.

---

#### Tues, Nov 14

Features/issues that you worked on and who you worked with:
* We created our first 11 issues in gitlab, I wrote #11.

A reflection on any design conversations that you had
* We are still considering the best referral mechanism to allow users to invite new users to the app.

At least one ah-ha! moment:
* I learned that we can make changes to pieces of code everywhere by double-clicking a piece of code, right clicking, and selecting "make change everywhere".

---

#### Mon, Nov 13

Features/issues that you worked on and who you worked with:
* We successfully forked and cloned our repo.

A reflection on any design conversations that you had
* We have transitioned over to Vite from plain React.

At least one ah-ha! moment:
* I didn't realise we should be working in pairs and taking turns coding/driving, this will be a new and interesting way to work.
