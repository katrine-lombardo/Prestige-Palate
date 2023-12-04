## Monday, Dec 2
Features/issues that you worked on and who you worked with:
- 

A reflection on any design conversations that you had:
- 

At least one ah-ha! moment:
- 

## Friday, Dec 1
Features/issues that you worked on and who you worked with:
- I began to work on the UpdateReview component and took ownership of the README/Docs. I set up the README.MD and added apis.md, data-model.md, ghi.md, and integrations.md files to a docs folder. These files will show our planning and preperation for the project. I uploaded our wireframes to a wireframes folder and I need to update the ghi.md to display them.

A reflection on any design conversations that you had:
- I showed the group the initial setup of the README and docs. I wanted to get the structure in place so that we can continue to make improvements to both the README and docs file as we progress through the project.

At least one ah-ha! moment:
- I have spent considerable time with my github profile README as well as two README documents that I have for two projects on my github. I referred to those as I set up our README and was glad I could use those files as a guide becuase the README is an important part of a project.

## Thursday, Nov 30
Features/issues that you worked on and who you worked with:
- I was able to successfully upload photos to our S3 bucket using the presigned URLs and finsished creating the create a review form component. I had to add functionality so that the user clicks on the upload photo button after adding a file and then clicks post review so that the form correctly handles the change of state with the presigned URL.

A reflection on any design conversations that you had:
- I discuessed with the group that there is no need for a photos table anymore since we are not storing the photos in our Postgres database. The Reviews photo table now stores the photo_url, which is what is returned by S3 and it is a link to the photo stored in the S3 bucket.

At least one ah-ha! moment:
- Finally being able to finish the create a review component was a great feeling. The S3 Presigned URL setup has been challenging but now that I have it configured properly, I am now feeling more confident about moving on to other frontend components that I have to create using a similar setup.

## Wednesday, Nov 29
Features/issues that you worked on and who you worked with:
- I created CreateReviews.jsx and begin working on a review form to render on the front end. I successfully added the option to upload a photo using S3 presigned URLs. WIP as I need to incorporate dynamic data.

A reflection on any design conversations that you had: 
- As a group, we decided that there is no need to store photos in the Postgres database and that storing them directly in the S3 bucket is sufficient.

At least one ah-ha! moment:
- I worked with Brad to understand how presigned URLs work in S3 and was able to test it successfully with the CreateReviews component on the frontend.

## Tuesday, Nov 28
Features/issues that you worked on and who you worked with:
- I continued working through Reviews.py Routers/Queries and was able to get all of the functions working. 

A reflection on any design conversations that you had: 
- Bart mentioned a free alternative to AWS and I informed the group I would look into this option as well.

At least one ah-ha! moment:
- I worked exstensively with VS Code liveshare today and was able to get a better understanding of how collaborative coding works with that tool.

## Monday, Nov 27
Features/issues that you worked on and who you worked with:
- I worked through the Reviews.py Routers/Queries files with Katrine.

A reflection on any design conversations that you had:
- We discussed how photos should integrate with Reviews.

At least one ah-ha! moment:
- I was able to further understand the Reviews functionality by examining and working with the Review Queries and Routers. 

## Wednesday, Nov 22
Features/issues that you worked on and who you worked with:
- As a group we went over the migration files in order to get each one configured properly moving forward.
- I created the initial setup for the Browser Router. Additionally, I created Nav.jsx, HomePage.jsx, and updated App.jsx in order to test functionality.

A reflection on any design conversations that you had:
- As a group we begin discussing how we can start to implement some features on the frontend. 

At least one ah-ha! moment:
- I took ownership of setting up the Browser Router and Nav. I had an ah ha moment when reffering to a previous project. With Create React app the index.js file is used as the script in index.html. Initially, I was not seeing anything rendered on the screen but I remembered that we switched to Vite. I referred to an older project in which I used Vite and uncovered that the main.jsx file is used as the script in the index.html and that was why I was not seeing the App being rendered. Once I made the update to add the main.jsx in the index.html script tag, I was able to see the App render and successfully test the Browser Router/Nav functionality.

## Tuesday, Nov 21
Features/issues that you worked on and who you worked with:
- I updated the Photos Routers/Queries and tested all functions successfully.

A reflection on any design conversations that you had:
- As a group, we are still working on the best way to store restaurant data for a favorited restuarant.

At least one ah-ha! moment:
- I figured out that the .env was at the root direcotry and that is why my AWS key credentials that I have stored in the .env were not being read properly. Copied and moved the .env to ghi and api level directories and that fixed the issue I had. Initially I had the .env in the docker compose yaml file to bypass the issue.

## Monday, Nov 20
Features/issues that you worked on and who you worked with:
- I was able to successfully upload photos to an S3 bucket with an upload photos router.

A reflection on any design conversations that you had: 
- Continued discussion on how to best utilize S3.

At least one ah-ha! moment:
- I had to troubleshoot the upload photo router and go back through some S3 documentation in order to uplaod to the bucket successfully. I had an ah ha moment when going to the AWS Console and configuring bucket policies to make the bucket public.

## Friday, Nov 17
Features/issues that you worked on and who you worked with:
- I worked with Michael on Photos.py Queries and Photos.py Routers. This feature allows users to store photos.

A reflection on any design conversations that you had:
- Discussed how we can leverage Amazon S3 to store our photos.

At least one ah-ha! moment:
- I have previous experience working for AWS so it was a great feeling to know that I can utilize that knowledge and integrate S3 into our project.

## Thursday, Nov 16
Features/issues that you worked on and who you worked with:
- Collaborated with the entire group to set up table migrations.

A reflection on any design conversations that you had:
- The overall backend design is beginning to take shape.

At least one ah-ha! moment:
- As a group we were encountering an error with fastapi pool connection. We were able to troubleshoot and fix the infoBASE(which should have been DATABASE_URL) bug in our pool connection queries code.


## Wed, Nov 15
Features/issues that you worked on and who you worked with:
- Worked through DB Fiddle. Created photos table and under Schema SQL and created restuarant Queries under the Query SQL section.

A reflection on any design conversations that you had: 
- As a team we contiued conversations on how to best utilize the third party API.

At least one ah-ha! moment:
- Starting to understand Schema and Query SQL more after using DB Fiddle.

## Tues, Nov 14
Features/issues that you worked on and who you worked with:
- Worked on creating two issues:
    - As a user, I can create reviews so that other users/nonusers can view my review.
    - As a user, I can update and or delete my reviews so I can keep my reviews up-to-date.

A reflection on any design conversations that you had: 
- We worked with Bart to switch from the plain React create app setup to Vite.

At least one ah-ha! moment: 
- I previously worked with Vite on a seperate project and I had an ah-ha moment when remembering some of the initial set up commands like npm create vite@latest. Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts:

A dev server that provides rich feature enhancements over native ES modules, for example extremely fast Hot Module Replacement (HMR).

A build command that bundles your code with Rollup, pre-configured to output highly optimized static assets for production.
