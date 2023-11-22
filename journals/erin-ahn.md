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

