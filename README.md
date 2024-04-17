## Instructions for Running the Application

### Prerequisites:
- Ensure Node.js and npm are installed on your machine.
- Make sure Git is installed on your computer.

### Steps:
1. **Clone the Repository**:
   - First, open your command line interface (CLI). This could be Terminal on macOS, Command Prompt or PowerShell on Windows, or your preferred shell on Linux.
   - Clone the repository using Git:
     ```
     git clone https://github.com/ianuriegas/ui-group-8.git
     ```
   - Navigate into the project directory:
     ```
     cd ui-group-8
     ```

2. **Open two terminal windows** to handle the client and server independently.

3. **Start the Client**:
   - In the first terminal, navigate to the client directory:
     ```
     cd client
     ```
   - Run the client application:
     ```
     npm start
     ```
   - This command will compile the front-end and should automatically open your default web browser to `http://localhost:3000/` where you can view the front-end of the application.

4. **Start the Server**:
   - In the second terminal, navigate to the server directory:
     ```
     cd server
     ```
   - Run the server application:
     ```
     npm run dev
     ```
   - This will start the back-end server. You can access various API endpoints by navigating to `http://localhost:5001/{route}` in your web browser, where `{route}` represents your specific endpoint.

### Accessing the Application:
- **Front-End**: Open a web browser and visit `http://localhost:3000/` to interact with the user interface.
- **API Endpoints**: Access API contents by visiting `http://localhost:5001/{route}`, replacing `{route}` with the appropriate endpoint.
