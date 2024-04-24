# Project Title: ComicAIVerse

## Overview

An app that generates comic book images using AI.

### Problem

Currently, there is a scarcity of free resources for generating AI comic books or comic book images. The goal of this project is to open source an application that caters to comic lovers, offering a seamless and engaging experience in creating and sharing comic book images. In the future, this application will expand to enable users to create full comic book strips, further enhancing the creative possibilities for comic enthusiasts.

### User Profile

User Profile
The ComicAIVerse app targets comic book enthusiasts and creators who want to generate AI-powered comic book images and share them with others. Users will use the app to create, showcase, and download comic book images using AI tools like OpenAI DALL-E or other free AI tools. The app should take into account user privacy, data security, and the seamless integration of AI-generated images into the user experience.

<!-- To update the user profile for the ComicAIVerse application, follow these steps:

Log in to your account on the ComicAIVerse app.
Navigate to the "Profile" or "Settings" section of the app.
Click on the "Edit Profile" or "Update Profile" button.
Modify the fields you want to update, such as your name, email address, or any other relevant information.
Save the changes by clicking on the "Save" or "Update" button. -->


### Features

As a user, you will have access to the following essential features:

1. User Authentication: Securely log in using a reliable user authentication system. This system will store your personal information and comic creations in a database, utilizing popular technologies like Mongo, MySQL, or other suitable databases.
2. AI-Generated Comic Images: Create comic book images by inputting prompts, such as The Hulk trying to learn meditation and yoga to control his anger. The app will call upon AI tools like OpenAI DALL-E or other free AI tools to generate these comic book images based on your input.
3. Image Sharing and Download: Share your comic book images on the website showcase or download them as a PDF for personal use or offline viewing.
4. Showcase of Comic Images: Explore a curated showcase of 10 or so generated comic images on the app's home page, as well as a dedicated Comic Showcase page displaying all user-generated comic images. This feature will allow you to draw inspiration from the creativity of other users.

## Implementation
Here's a high-level implementation plan:
1. Set up the project:
    - Create a new React project using a tool like Create React App or Vite.
    - Install necessary dependencies, such as React Router for navigation, Axios for making API requests, and any UI component libraries you plan to use.
2. Implement user authentication:
    - Decide on the authentication method (e.g., JSON Web Tokens (JWT), OAuth, or traditional session-based authentication).
    - Create a backend server using a framework like Express.js or Next.js for handling authentication and API requests.
    - Set up a database (e.g., MongoDB, MySQL) to store user information.
    - Implement the /users/register and /users/login endpoints on the server for user registration and authentication.
    - On the client-side, create a Register and Login page for handling user registration and authentication.
3. Integrate AI image generation:
    - Research and choose an AI image generation API or tool, such as OpenAI's DALL-E or other alternatives.
    - Implement the necessary API calls on the server-side to generate images based on user prompts.
    - Create a page or component on the client-side for users to enter prompts and initiate the image generation process.
    - Display the generated images on the client-side.
4. Implement image sharing and download:
    - Create a database schema or model to store user-generated images and their associated metadata (e.g., prompt, user ID).
    - Implement an endpoint on the server to save generated images and their metadata to the database.
    - Create a page or component on the client-side to display a showcase of user-generated images.
    - Implement functionality to allow users to download generated images as PDFs.
5. Develop the home page and navigation:
    - Create the home page component, which should display a curated showcase of user-generated images.
    - Implement navigation using React Router to allow users to navigate between different pages (e.g., home, generate image, comic showcase, register, login).
6. Implement additional features:
    - Implement any additional features you plan to include, such as user profiles, favoriting images, or social sharing.
7. Styling and UI/UX:
    - Style the application using CSS or a CSS-in-JS library like styled-components or Emotion.
    - Ensure a consistent and user-friendly UI/UX design across all pages and components.
8. Testing and deployment:
    - Deploy the client and server applications to a hosting platform like Vercel, Netlify, or Heroku.
    - Consider implementing error handling, input validation, and security measures to ensure a robust and secure application.

NOTE, this is a high-level implementation plan, and I may need to adjust it based on specific requirements, constraints, and the technologies I choose to use over the period of implementation.

### Tech Stack

- React
- JavaScript
- MySQL/ MySQL
- Express
- Client libraries:
    - React
    - React Router
    - Axios
    - Vite
- Server libraries:
    - Knex / MongoDB Atlas
    - Express
    - Bcrypt for password hashing
- Styling : CSS/ Tailwind

### APIs

- OpenAI API now - In the future, use a free LLM deployed by others on Hugging Face or build a new LLM tailoring it specifically for comic book generation.

### Sitemap

- Home page
- Generate Image
- Comic showcase
- Register
- Login

### Mockups

#### Home Page
#### Register Page
#### Login Page
#### Generate Image Page
#### Comic Showcase

### Data

The app utilizes two main tables:

1. Image table:
    - Name: { type: String, required: true },
    - Prompt: { type: String, required: true },
    - Photo: { type: String, required: true }
    
2. User table:
    - Id: { type: Int, required: true },
    - Email: { type: String, required: true },
    - Password: { type: String, required: true }

### Endpoints

**GET /

- Welcome to ComicAIVerse

**GET /create-post

- Redirects to the Generate Image page

**POST /create-post/:id

- Logged-in users can add their generated image to the Comic Showcase

**POST /users/register**

- Add a user account

Parameters:
- email: User's email
- password: User's provided password

**POST /users/login**

- Login a user

Parameters:
- email: User's email
- password: User's provided password

NOTE :  I may need to adjust endpoints based on specific requirements, constraints, and the technologies I choose to use over the period of implementation.

### Auth

- JWT Auth
    - Before adding auth, all API requests will be using a fake user with id 1
    - Added after core features have first been implemented
    - Store JWT in localStorage, remove when a user logs out
    - Add states for logged in showing different UI in places listed in mockups

NOTE :  I may need to change the authentication method based on constraints over the period of implementation.

## Roadmap

- Create client:
    - React project with routes and boilerplate pages

- Create server:
    - Express project with routing, with placeholder 200 responses

- Create migrations

- Gather 15 sample Users generating images using prompts

- Create seeds with sample data

- Deploy client and server projects so all commits will be reflected in production

- Feature: Generate Image Page

- Feature: Comic Showcase Page

- Feature: Home page

- Feature: Create account
    - Implement register page + form
    - Create POST /users/register endpoint

- Feature: Login
    - Implement login page + form
    - Create POST /users/login endpoint

- Feature: Implement JWT tokens
    - Server: Update expected requests / responses on protected endpoints
    - Client: Store JWT in local storage, include JWT on axios calls

- Bug fixes

- DEMO DAY

## Nice-to-haves

- The future of this app is to have users generate an entire comic strip with just an AI prompt
- Future plans are to create own LLM so don’t need to pay or use someone else’s and to tailor it to comic generation
- Inspired by kids’ love for Amazing Spider Man, generating a comic using someone’s face - this could be implemented with this or could be a whole new iOS app where user clicks their own face using camera feature and chooses from a list of comic characters or records or describes their own story to generate a comic strip and share it with everyone.