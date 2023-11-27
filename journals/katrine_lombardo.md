#### Tues, Nov 28

Features/issues that you worked on and who you worked with:
* 

A reflection on any design conversations that you had
*

At least one ah-ha! moment:
*

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
