# Basics of the app

This React app works as the front-end interface for users to interact with the API backend created in Project 2 of this course. Both projects are deployed on Render separately. This front-end app allows users to view all movies, filter based on their titles, fetch movies from the database using id, to create new movies in the DB, to update movies in the DB using id, as well as to delete movies in the DB using id.

# App functionality and details

This front-end React app interacts in real time with a backend REST API app that was created in Project 2. (https://github.com/tsooli97/TO00BS65-3005-Project-2-REST_API)

This apps functions correspond to certain CRUD operations which send specific http requests to the backend REST API application routes. These are then processed accordingly and return an appropriate response back to the front-end (this React app).

When loading up the app, all available movies are fetched and displayed in the initial default view. Users can then user the provided filter input to narrow down the movie list by specifying certain characters for a movie name. The remaining CRUD operations can be accessed by using the dropdown list to switch to different views. There's views for:

- Get movie using id (GET)
- Add movie (POST)
- Update movie using id (PATCH)
- Delete movie using id (DELETE)

Each view provides the necessary fields for accomplishing the CRUD operations. 'Add movie' and 'Update movie' views also feature an info button, which specifies the input data pattern (the appropriate input format and characters).

If a data operation fails, the page view will include error messages to help inform the user about what went wrong.

The project uses React-Vite for its speed and good default project template, which makes project setup easy in my opinion.
Project front-end styling uses default React-vite project styling, custom styling by project creator and also Bootstrap for inputs and buttons.
