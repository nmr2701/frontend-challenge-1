# Application Design Documentation


## Overall Application Flow

**User Authentication**: Users log in using a dummy authentication system (username: admin password: 1234)
**CSV Upload**: Authenticated users can upload a CSV file containing claims in the home route
**Data Parsing and Validation**: The uploaded CSV file is parsed, and the claims data is validated against defined schema.
**Data Approval**: Users can review the parsed claims data, approve it, and make any necessary edits or deletions
**Backend Interaction**: Approved claims data is sent to the backend API to generate JSON MRF files. Another endpoint to fetch the files.
**MRF File View**: Users can view a list of generated MRF files and download them.


## Components and Their Responsibilities


- **FileUpload**: Handles the file input for CSV uploads and triggers the parsing of the file.
- **ClaimsTable**: Displays the parsed claims data in a table format, allowing users to approve, edit, or remove claims.
- **MrfFilesPage**: Displays a list of generated MRF files fetched from the backend.
- **LoginPage**: Manages user authentication and redirects users based on their authentication status.
- **MrfFileCard**: Represents individual MRF files, allowing users to download them.
- **MrfFilesLoader**: Displays loading indicators and error messages when fetching MRF files.


## State Management Using MobX

The application utilizes MobX for state management, 

- **AuthStore**: Manages user authentication state, including login and logout functionality. (Not necessary for current mission of app, but if taken further would be useful)
- **ClaimsStore**: Holds the claims data, easy to use accross different components

MobX's `makeAutoObservable` is used to automatically track state changes, ensuring that the UI updates reactively when the state changes.


## Interaction with the Backend API


- **Sending Approved Claims**: The application sends the approved claims data to the backend using a POST request to the `/claims/approve` endpoint. MRF files can then be generated in the backend
- **Fetching MRF Files**: The application retrieves the list of generated MRF files from the backend using a GET request to the `/claims/mrf-files` endpoint.

The API responses are handled using Axios, and appropriate error handling is implemented to inform users of any issues during API interactions.

## Routing and Navigation


- **`/`**: Main page for uploading claims data and displaying the claims table. This is a protected route.
- **`/mrf-files`**: Page for displaying the list of generated MRF files.
- **`/login`**: Login page for user authentication.

Protected routes are implemented to ensure that only authenticated users can access the main page and the MRF files page. If a user is not authenticated, they are redirected to the login page.
