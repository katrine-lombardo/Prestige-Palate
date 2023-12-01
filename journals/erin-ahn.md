## Thurs, Nov 29
Features/issues that you worked on and who you worked with:
- Completed Sign In and Sign Up page front end to work independently. Had to rewrite the login function and not use the JWT library.

A reflection on any design conversations that you had
- JWT library doesn't allow for error handling.

At least one ah-ha! moment:
- Resolving with if console.error makes the statement true briefly before logging in which would display the error message briefly as well. 

## Wed, Nov 29
Features/issues that you worked on and who you worked with:
- Completed Sign In page front end to work independently. Also resolved Token Error messages appearing due to using vite by adding more code into the yaml, .env and App.js.

A reflection on any design conversations that you had
- Token kept loading faster than the user logging in and had to utilize useEffect to determine if token (after logging in), navigate home.

At least one ah-ha! moment:
- Working with the JWT provided galvanize makes some things harder. It doesn't allow us to use try catch, so needed to use if console.error instead.

## Tues, Nov 28
Features/issues that you worked on and who you worked with:
- Completed Frontend Auth Independently - we'll also have to remember to incorporate it on other additional front end pages as needed.

A reflection on any design conversations that you had
- We have email being used for fastapi but it says username. We seeked Phil's help on this and learned it's part of the library so we won't be able to change it.

At least one ah-ha! moment:
- How neat it is to work with Context.

## Mon, Nov 27
Features/issues that you worked on and who you worked with:
- Backend Login Token with Michael
- Frontend Auth Independently.

A reflection on any design conversations that you had
- Login form on FastApi is using username instead of email currently. Still need to troubleshoot as we plan on using email instead. Need to ask Yaosheng re:LoginForm and SignupForm since it goes hand in hand with the front end auth.

At least one ah-ha! moment:
- Love working with the team and how supportive everyone is in the process in pushing through - we all have different strengths. Excited for deployment soon and trying to get clean code in.

## Tues, Nov 21
Features/issues that you worked on and who you worked with:
- Continuing Queries and Router for Accounts. Now we have a working feature to update password for accounts and to update user information. 

A reflection on any design conversations that you had
-Focused on coding in our project.

At least one ah-ha! moment:
- Using current_account = queries.get_account_by_email(email) to retrieve the hashed password!

## Mon, Nov 20
Features/issues that you worked on and who you worked with:
- Continuing Queries and Router for Accounts

A reflection on any design conversations that you had
-Focused on coding in our project.

At least one ah-ha! moment:
- How token and authenticator.py works

## Fri, Nov 17
Features/issues that you worked on and who you worked with:
- Queries and Router for Accounts

A reflection on any design conversations that you had
-Focused on coding in our project.

At least one ah-ha! moment:
- Everyone has different ways to code/understanding the code (even looking at the routers and queries), so it was helpful to talk to each other. One thing I would like to double check is how updating accounts would look different since updating hashed password may be different. Also would like to circle back to make sure everyone has error statements accordingly.

## Thur, Nov 16
Features/issues that you worked on and who you worked with:
-Added authentication to our project with the entire team.  Added table migration files as well.

A reflection on any design conversations that you had
-Focused on coding in our project.

At least one ah-ha! moment:
- all afternoon we spent time debugging with "infoBASE_URL" - which should have been DATABASE_URL. spelling error due to "Change all occurences."

## Wed, Nov 15
Features/issues that you worked on and who you worked with:
- Created Schema and Query SQL using db-fiddle.

A reflection on any design conversations that you had
- Team continuing to details of the third-party API.

At least one ah-ha! moment:
- Google Maps API keys aren't hidden when put into img src tag, so we're thinking of having FastAPI as buffer - with it coming from Google to FastAPI to the img src tag. But also with the size of the img data being so big, in order to not go over our payload limit, we're thinking of changing the restaurant images API to free third party API like pexel.

## Tues, Nov 14
Features/issues that you worked on and who you worked with:
- Worked individually on writing out 2 issues (bookmarking and editing user information).
- Database set up in the yaml file.
- pgAdmin

A reflection on any design conversations that you had
- Team continuing to discuss on sign up logic (how referrals will be completed).

At least one ah-ha! moment:
- yaml file is written like key value pairs!

