# 🎵🎶🎓 Raadhyam - Comprehensive Music Learning & Management Platform

✨ Raadhyam is a full-stack, dynamic web application meticulously crafted to serve as a complete ecosystem for music education and content management. From providing structured learning courses and showcasing musical artists to empowering robust administrative controls and offering personalized user experiences, Raadhyam creates an engaging and efficient platform for everyone involved in the world of music.

---

## 🚀 Highlights & Features

*   **Intuitive Course Management:** Facilitates the creation, organization, and delivery of detailed music courses, complete with modules and lessons.
*   **Rich Music Content System:** A dedicated framework for cataloging and presenting musical albums, artists, and individual tracks.
*   **Robust User Authentication & Authorization:** Implements secure user registration, login, and advanced role-based access control for students, instructors, and administrators.
*   **Personalized User Dashboards:** Students can effortlessly track their enrolled courses, monitor progress, and manage personal learning notes.
*   **Powerful Admin Dashboard:** A comprehensive suite of tools for administrators to manage users, courses, music content, and platform settings.
*   **Cloud-Based Media Storage:** Seamless integration with Cloudinary for efficient and scalable storage and delivery of images and videos.
*   **Interactive UI/UX:** Features captivating animated 3D backgrounds and a consistent, modern design language across the entire application.
*   **Integrated Notes System:** Users can create, organize, and manage personal notes directly within the platform for enhanced learning.
*   **Dynamic Landing Pages:** Engaging welcome and informational pages, including a detailed 'About Us' section, to introduce the platform.
*   **API-Driven Backend:** A well-structured backend providing secure and efficient RESTful APIs for all platform functionalities.

---

## 🛠️ Tech Stack

Raadhyam is engineered using a modern, scalable, and robust technology stack:

*   **Frontend:**
    *   ⚛️ **React.js:** For building dynamic, component-based, and responsive user interfaces.
    *   ⚡ **Vite:** A lightning-fast frontend build tool that ensures a rapid development experience.
    *   💅 **CSS:** Custom styling for a polished, modern, and visually appealing user experience.
*   **Backend:**
    *   🟢 **Node.js & Express.js:** A powerful JavaScript runtime and a flexible web application framework for building the server-side logic.
    *   🔐 **Passport.js:** Robust authentication middleware for Node.js, supporting various authentication strategies.
*   **Database:**
    *   🍃 **MongoDB:** A NoSQL document database, offering flexibility and scalability for diverse data storage needs.
*   **Cloud Services:**
    *   ☁️ **Cloudinary:** An end-to-end image and video management solution for cloud-based storage, optimization, and delivery.
*   **Other Tools:**
    *   🎣 **Axios:** A promise-based HTTP client for making API requests from both the browser and Node.js.
    *   🧹 **ESLint:** A static code analysis tool for identifying problematic patterns found in JavaScript code, ensuring code quality and consistency.

---

## 🏗️ Project Structure

The project is thoughtfully organized into logical directories and files, promoting clarity, modularity, and maintainability:

```
├── .env                          # Environment variables for configuration
├── src/                          # Frontend React application source code
│   ├── assets/                   # Static assets like images, videos, and logos
│   ├── components/               # Reusable UI components (e.g., NavBar, Footer)
│   ├── pages/                    # Top-level application views (e.g., Login, Courses, AdminMain)
│   ├── auth/                     # Authentication-related components and flows
│   ├── dashboards/               # Components specific to Admin and User dashboards
│   ├── features/                 # Modules encapsulating specific feature logic (e.g., Course details)
│   ├── services/                 # API interaction logic and interceptors
│   ├── main.jsx                  # React application entry point
│   └── App.jsx                   # Main application component handling routing
├── server.js                     # Backend application entry point (Express server)
├── DB.js                         # Database connection and configuration
├── controllers/                  # Backend logic for handling HTTP requests (e.g., AuthController, CourseController)
├── models/                       # Mongoose schemas and models for database interactions
├── routes/                       # API route definitions (e.g., AuthRouters, CourseRoutes)
├── middleware/                   # Custom Express middleware (e.g., AuthMiddleware, isAdmin checks)
├── public/                       # Static files served directly (e.g., index.html)
├── package.json                  # Project dependencies and scripts
├── vite.config.js                # Vite build tool configuration
└── ...                           # Other configuration and documentation files
```

---

## 📦 Installation

To set up and run the Raadhyam platform on your local machine, please follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd Raadhyam
    ```

2.  **Install project dependencies:**
    Navigate to the project root and install all required packages for both the frontend and backend:
    ```bash
    npm install
    # or yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory of your project. Configure it with the necessary variables as detailed in the [Environment Variables](#%EF%B8%8F-environment-variables) section below.

---

## ▶️ Usage

Once all dependencies are installed and environment variables are configured, you can launch the application:

1.  **Start the Backend Server:**
    Open a terminal in the project root and execute:
    ```bash
    npm start
    # (Alternatively, you might use 'node server.js' if 'start' script isn't defined in package.json)
    ```
    *The backend server will typically run on `http://localhost:5000` by default, but this can be customized in your `.env` file.*

2.  **Start the Frontend Development Server:**
    Open a *new* terminal in the project root and execute:
    ```bash
    npm run dev
    ```
    *The frontend application will usually open automatically in your browser at `http://localhost:5173` (Vite's default). Check the terminal output for the exact URL.*

---

## 🔗 API/Backend Endpoints

The backend is meticulously structured with modular controllers and routes, offering a comprehensive and well-defined API for the entire platform. Key functional areas include:

*   **Authentication:** User registration, login, logout, and secure session management.
*   **User Management:** CRUD (Create, Read, Update, Delete) operations for users, role assignments, and user profile management.
*   **Course Management:** APIs for creating, updating, deleting, and retrieving courses, modules, and individual lessons.
*   **Music Content:** Endpoints for managing artists, albums, and songs, including metadata and media links.
*   **Notes:** Functionality for creating, retrieving, updating, and deleting user-specific notes associated with learning content.
*   **Admin Specific:** Dedicated routes providing access to administrative tasks, analytics data, and platform configuration.
*   **File Uploads:** Secure mechanisms to upload various media content (images, videos) via Cloudinary integration.

*For detailed information on specific routes, request/response structures, and required parameters, please refer to the files within the `routes/` and `controllers/` directories.*

---

## ⚙️ Environment Variables

To ensure the application runs correctly, you must configure the following environment variables in a `.env` file located at the project root:

```ini
PORT=5000
MONGO_URI=mongodb://localhost:27017/raadhyamDB
JWT_SECRET=your_super_secret_jwt_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GEMINI_API_KEY=your_gemini_api_key_if_used
```

*   `PORT`: The network port on which the Node.js backend server will listen.
*   `MONGO_URI`: The connection string for your MongoDB database instance.
*   `JWT_SECRET`: A strong, unique secret key used to sign and verify JSON Web Tokens for authentication.
*   `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: Your credentials obtained from your Cloudinary account, essential for media upload and management.
*   `GEMINI_API_KEY`: (Optional) Your API key for integrating with the Google Gemini API, if AI-powered features are utilized within the project.

---

## 💡 Why This Project? / Use Cases

Raadhyam is designed to be a versatile platform, perfectly suited for a range of applications:

*   **Online Music Academies:** Provides a comprehensive digital solution for managing courses, instructors, students, and a rich library of musical content.
*   **Independent Music Educators:** Enables individual teachers to effortlessly create, deliver, and manage their own music courses, track student progress, and host educational materials.
*   **Artists & Musicians:** Offers a dynamic space to showcase portfolios, share original music, and potentially offer private lessons or workshops.
*   **Community Music Platforms:** Can serve as a central hub for music enthusiasts to learn, explore, collaborate, and connect with a wider musical community.
*   **Full-Stack Development Learning:** Acts as a robust, real-world example of a MERN (MongoDB, Express, React, Node.js) stack application, featuring advanced concepts like authentication, file uploads, and distinct admin/user dashboards.

---

## 📝 Notes and Limitations

*   **Inferred Details:** Please note that some specific feature details and architectural choices described in this README have been inferred based on the project's file names and common software engineering patterns. The exact implementation details might vary.
*   **Database Setup:** Ensure that your MongoDB instance is actively running and accessible from where the backend server is hosted, using the `MONGO_URI` specified in your `.env` file.
*   **Cloudinary Configuration:** A valid Cloudinary account with correctly configured API credentials (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`) is essential for all media upload functionalities to operate as intended.
*   **Placeholder API Key:** The inclusion of `GEMINI_API_KEY` is based on common integration patterns for AI services; its actual utilization within the project's codebase is inferred.
