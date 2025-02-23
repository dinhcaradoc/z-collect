# Z-collect - IBM Granite Hackathon MVP

**Z-collect** is a Minimum Viable Product (MVP) developed for the **IBM Granite Hackathon**, designed to streamline **data collection** via SMS, WhatsApp, and USSD channels. This MVP enables seamless **real-time data interactions** via **Postman simulations** and **API endpoints**, making it easier to test and simulate data collection workflows. The solution ensures a flexible, cross-channel approach for efficient data gathering across different mobile communication preferences.

Z-collect integrates with **Twilio** for WhatsApp interactions, **Africa's Talking** for SMS and USSD services, and provides a simple backend interface to handle data collection and management.

## Key Features

- **SMS and WhatsApp Integration**: Enables seamless communication and data collection via **Twilio** (WhatsApp) and **Africa's Talking** (SMS/USSD).
- **API Endpoints**: All interactions can be simulated and tested via API endpoints using **Postman**.
- **Real-time Data Processing**: Collect, analyze, and visualize data as it comes in.
- **Multi-Channel Support**: Facilitates data collection across SMS, WhatsApp, and USSD, providing inclusivity for all users.
- **Data Dashboard**: Provides insights and analytics for better decision-making.
  
## Technology Stack

- **Backend**: Node.js with **Express** (for API and business logic)
- **SMS/USSD/WhatsApp**: Integrated with **Africa's Talking** (for SMS/USSD) and **Twilio** (for WhatsApp).
- **Cloud Integration**: Hosted on **IBM Cloud** for scalable data storage and analytics.
- **Database**: MongoDB (for scalable data storage)
- **Deployment**: Dockerized for easy deployment and scalability

## Components

- **Twilio Integration**: Handles WhatsApp-based interactions for users, allowing for conversational data collection.
- **Africa's Talking API**: Powers SMS and USSD interactions, making it accessible to users with basic mobile phones.
- **IBM Cloud Services**: Provides scalable cloud hosting and real-time data synchronization.

## Getting Started

### Prerequisites

Before running Z-collect locally, make sure the following are installed:

- **Node.js** (version 14.x or higher)
- **npm** (Node package manager)
- **Postman** (for simulating API requests)
- **Docker** (for containerization and deployment)
- **IBM Cloud CLI** (optional, for IBM Cloud deployment)

### Installing

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/z-collect.git
   ### Running the Application

To run the backend locally:

1. **Navigate to the project directory**:
    
    ```bash
    cd z-collect
    ```

2. **Install dependencies**:
    
    ```bash
    npm install
    ```

### Running the Application

To run the backend locally:

1. **Start the server**:
    
    ```bash
    npm start
    ```
    
    This will start the Node.js server, which will listen for incoming API requests (SMS, USSD, WhatsApp).

### Testing with Postman

1. **API Endpoints**: You can test the system's endpoints using **Postman**. This allows you to simulate SMS, USSD, and WhatsApp interactions by making API requests directly.
    
    * **For SMS**: Use the endpoint associated with Africa’s Talking.
    * **For WhatsApp**: Use the Twilio API endpoint to simulate WhatsApp interactions.
    * **For USSD**: Use the Africa’s Talking USSD simulation endpoint.

2. **Postman Setup**: Import the **Postman collection** (provided in the project) to interact with the API endpoints.
    
    * Import the collection file into Postman.
    * Configure environment variables (e.g., API keys, URLs) in Postman for seamless integration with the backend.

### Docker Deployment

For containerized deployment:

1. **Build the Docker image**:
    
    ```bash
    docker build -t z-collect .
    ```

2. **Run the container**:
    
    ```bash
    docker run -p 3000:3000 z-collect
    ```

    The app will be accessible at [http://localhost:3000](http://localhost:3000).

### Cloud Deployment (IBM Cloud)

For cloud deployment, ensure that the IBM Cloud CLI is installed. Then, follow these steps:

1. **Login to IBM Cloud**:
    
    ```bash
    ibmcloud login
    ```

2. **Deploy the application**:
    
    Refer to the IBM Cloud documentation for deploying a Node.js app.

## Contributing

We welcome contributions! If you'd like to improve the Z-collect project, feel free to fork the repository, create a branch, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **IBM Granite Hackathon** for the opportunity to create this MVP.

