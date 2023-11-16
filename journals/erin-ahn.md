## Tues, Nov 14
Features/issues that you worked on and who you worked with:
- Worked individually on writing out 2 issues (bookmarking and editing user information).
- Database set up in the yaml file.
- pgAdmin

A reflection on any design conversations that you had
- Team continuing to discuss on sign up logic (how referrals will be completed).

At least one ah-ha! moment:
- yaml file is written like key value pairs!

## Wed, Nov 15
Features/issues that you worked on and who you worked with:
- Created Schema and Query SQL using db-fiddle.

A reflection on any design conversations that you had
- Team continuing to details of the third-party API.

At least one ah-ha! moment:
- Google Maps API keys aren't hidden when put into img src tag, so we're thinking of having FastAPI as buffer - with it coming from Google to FastAPI to the img src tag. But also with the size of the img data being so big, in order to not go over our payload limit, we're thinking of changing the restaurant images API to free third party API like pexel.