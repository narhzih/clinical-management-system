# Clinical Appointment Management System API

## Project Description

This project is a robust API for a Clinical Appointment Management System built using Node.js (TypeScript), Express, PostgreSQL, and Knex ORM. The API provides functionality for managing doctors' schedules, booking appointments, and handling notifications.

### Key Features

1. **Doctor Management**: Add, update, and remove doctors from the system.
2. **Roster Management**: Create and manage doctor schedules (morning, afternoon, night shifts).
3. **Appointment Booking**: Allow users to book appointments with available doctors.
4. **Availability Checking**: Automatically check doctor availability based on their roster and existing appointments.
5. **Notifications**: Send SMS and email notifications to doctors when appointments are booked.
6. **PDF Generation**: Generate PDF documents with appointment details.

## Project Setup

### Prerequisites

-   Node.js (v14 or later)
-   npm (v6 or later)
-   PostgreSQL (v12 or later)

### Installation

1. Clone the repository:

    ```
    git clone https://github.com/narhzih/clinical-management-system.git
    cd clinical-appointment-api
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Set up your environment variables by creating a `.env` file in the root directory:

    ```
    PORT=3000
    DB_HOST=localhost
    DB_NAME=your_database_name
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    EMAIL_HOST=your_email_host
    EMAIL_PORT=your_email_port
    EMAIL_USER=your_email_user
    EMAIL_PASS=your_email_password
    EMAIL_FROM=noreply@yourdomain.com
    TWILIO_ACCOUNT_SID=your_twilio_account_sid
    TWILIO_AUTH_TOKEN=your_twilio_auth_token
    TWILIO_PHONE_NUMBER=your_twilio_phone_number
    ```

4. Set up the database:
    - Create a PostgreSQL database with the name specified in your `.env` file.
    - Run migrations to create the necessary tables:
        ```
        npm run knex migrate:latest
        ```

### Running the Application

1. For development:

    ```
    npm run dev
    ```

2. For production:
    ```
    npm run build
    npm start
    ```

The API will be available at `http://localhost:3000` (or the port you specified in the `.env` file).

## API Endpoints

-   **Doctors**

    -   GET /api/doctors
    -   GET /api/doctors/:id
    -   POST /api/doctors
    -   PUT /api/doctors/:id
    -   DELETE /api/doctors/:id

-   **Appointments**

    -   POST /api/appointments
    -   GET /api/appointments/available

-   **Rosters**
    -   POST /api/rosters
    -   GET /api/rosters/:date
    -   PUT /api/rosters/:id
    -   DELETE /api/rosters/:id

## Testing

To run the test suite:

```
npm test
```

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
