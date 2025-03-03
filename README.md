
# WebAuthn Authentication and Registration Example

This project demonstrates a simple implementation of **WebAuthn** for user authentication and registration using a React frontend. WebAuthn is a web standard for passwordless authentication, allowing users to securely log in using biometrics or security keys.

## Features

- **User Registration**: Users can register using their email and a WebAuthn-supported authenticator (e.g., biometrics or security keys).
- **User Authentication**: Registered users can log in using their registered authenticator.
- **Modal Notifications**: Provides feedback to users during registration and authentication processes.
- **Server Communication**: Communicates with a backend server for WebAuthn credential management.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **SimpleWebAuthn**: Library for simplifying WebAuthn integration in the browser.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## How It Works

1. **Registration**:
   - The user enters their email and clicks "Sign Up."
   - The frontend initiates registration by calling the `/api/init-register` endpoint.
   - The browser prompts the user to create a WebAuthn credential (e.g., biometric or security key).
   - The credential is sent to the `/api/verify-register` endpoint for verification.
   - If successful, the user is registered.

2. **Authentication**:
   - The user enters their email and clicks "Login."
   - The frontend initiates authentication by calling the `/api/init-auth` endpoint.
   - The browser prompts the user to authenticate using their WebAuthn credential.
   - The credential is sent to the `/api/verify-auth` endpoint for verification.
   - If successful, the user is logged in.

3. **Modal Notifications**:
   - A modal displays success or error messages during registration and authentication.

## Code Structure

- **`page.js`**: The main React component that handles user input, registration, and authentication.
  - Uses `useState` for managing email input, modal text, and modal visibility.
  - Implements `handleSignUp` and `handleLogin` functions for WebAuthn flows.
  - Displays a modal for notifications.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/to-abhinav/simplewebauthn-nextjs.git
   cd simplewebauthn-nextjs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Ensure your backend server is running and accessible at `http://localhost:3000`.

## Usage

1. Open the application in your browser.
2. Enter your email address.
3. Click **Sign Up** to register or **Login** to authenticate.
4. Follow the browser prompts to complete the WebAuthn process.

## API Endpoints

The frontend communicates with the following backend endpoints:

- **`/api/init-register`**: Initiates the WebAuthn registration process.
- **`/api/verify-register`**: Verifies the WebAuthn registration response.
- **`/api/init-auth`**: Initiates the WebAuthn authentication process.
- **`/api/verify-auth`**: Verifies the WebAuthn authentication response.

## Dependencies

- **Frontend**:
  - `react`: Frontend framework.
  - `@simplewebauthn/browser`: Library for WebAuthn in the browser.
  - `tailwindcss`: CSS framework for styling.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [SimpleWebAuthn](https://simplewebauthn.dev/) for simplifying WebAuthn integration.
- [Tailwind CSS](https://tailwindcss.com/) for providing a utility-first CSS framework.

---

Feel free to explore the code and reach out if you have any questions or suggestions!
```
