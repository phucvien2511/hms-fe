# Hospital Management System (HMS)

This is an assignment for Advanced Programming subject at HCMUT - Semester 232
> Backend and Data store - Firebase repository: [URL](https://github.com/phuc0503/hms-be)

## Installation

To run this web locally, follow these steps:

1. Clone or download the repository.

2. Install the required dependencies:

-   Cd to folder `hms-fe`.
-   Run `yarn` to install deps (Do it only once on first installation or when package changed).

3. Run the app using `yarn dev`.

4. Open your browser and navigate to `localhost:5173`.

## Code structure

All codes are written in Javascript (.jsx/.js) and CSS (.css).
Inside `src` folder, you can find these folders:

-   `assets`: Contain fonts, icons and fixed data files.
-   `apis`: Coming soon.
-   `hooks`: Coming soon.
-   `layouts`: Contain the code for web layout.
-   `pages`: Contain the source code for web pages. The folder structure is following some rules:

    -   `index.jsx`: The main code for page component goes here.
    -   `components` folder: Contain the code for components used for that page, including multiple `{COMPONENT_NAME}` folders with `{COMPONENT_NAME}.jsx` and `{COMPONENT_NAME}.css` files.

-   `routes`: Routing management.
-   `states`: State management (coming soon).
-   `utils`: Useful functions.

## Useful resources:

-   SVG icons: https://iconer.app/
-   Transform SVG to React component: https://transform.tools/
-   Recharts lib guide: https://recharts.org/en-US/guide/getting-started
