# Weather Forecast and Traffic Cam

Weather Forecast and Traffic Cam is a full-stack web application that allows users to select a date and time and provides a list of available locations as a dropdown. Upon selection, the system presents an image of the chosen location along with the weather forecast. This application employs a robust stack of technologies, including React and TypeScript on the frontend and NestJS on the backend. To enhance the development experience and reproducibility, Docker Compose is used to manage and run the application.

<img width="885" alt="Screenshot 2566-07-12 at 8 19 56 AM" src="https://github.com/kosaikham/weather-forecast-and-traffic-cam/assets/26035633/84780ed7-f421-413a-bffe-957140eddfa3">

## Features

- Selection of date and time.
- Dropdown list of locations.
- Image and weather forecast display for the selected location.

## Technology Stack

- **Frontend**: React with TypeScript
- **Backend**: NestJS
- **Containerization**: Docker
- **Testing**: Jest

## Prerequisites

Ensure you have the following installed on your local machine:

- Node.js
- Docker and Docker Compose
- Git

## Setup & Installation

Follow the steps below to set up and run this project on your local machine.

**Step 1:** Clone the repository

```bash
git clone https://github.com/kosaikham/weather-forecast-and-traffic-cam.git
```

**Step 2:** Navigate into the cloned repository

```bash
cd weather-forecast-and-traffic-cam
```

**Step 3:** Install dependencies for both frontend and backend

```bash
# Install frontend dependencies
cd frontend && yarn
cd ..

# Install backend dependencies
cd backend && yarn
cd ..

```

**Step 4:** Build the docker containers

```bash
docker-compose up --build

```

The application should be running at: `http://localhost:3000`



## Testing

I've written tests to ensure the functionality and reliability of the application. To run the tests:

```bash
# Run frontend tests
cd frontend && yarn test
cd ..

# Run backend tests
cd backend && yarn test
cd ..

```

## Usage

1. Select the desired date and time from the provided options.
2. Choose a location from the dropdown list.
3. The image of the selected location and the weather forecast will be displayed.

