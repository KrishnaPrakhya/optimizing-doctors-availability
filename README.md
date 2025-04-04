# TrustCure Healthcare Platform

## Description

TrustCure is a comprehensive healthcare platform that combines advanced medical services with modern technology. The platform offers features like online doctor consultations, appointment booking, symptom checking, and an AI-powered chatbot for medical assistance.

## Key Features

- **Online Doctor Consultations**: Virtual consultations with qualified doctors
- **Smart Appointment Booking**: Book appointments with doctors across multiple hospitals
- **Symptom Checker**: AI-powered symptom analysis and specialist recommendations
- **Interactive Body Model**: Visual interface for symptom selection
- **Virtual Consultation Room**: Secure environment for doctor-patient interactions
- **Medical ChatBot**: AI-powered chatbot for initial medical guidance
- **Prescription Management**: Digital prescription system
- **Multi-Hospital Integration**: Connected with various hospital networks including Apollo and Kamineni

## Technical Stack

- **Frontend**: React.js with Vite
- **Backend**:
  - Flask (Python) for ML services
  - Node.js for main server
- **Database**: MongoDB
- **Machine Learning**:
  - TensorFlow for chatbot
  - Custom models for symptom analysis
- **UI Framework**: Material-UI, Tailwind CSS

## Project Structure

```
├── Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   └── assets/
├── Backend
│   ├── Flask Server (ML Services)
│   └── Node.js Server (Main Backend)
├── ML Models
│   ├── chatBot_model.h5
│   └── Other model files
└── Data Files
    ├── Symptoms data
    └── Hospital information
```

## Prerequisites

- Node.js
- Python 3.x
- MongoDB
- Required Python packages (see requirements.txt)

## Installation

1. Clone the repository

````bash
git clone [repository-url]

2. Install frontend dependencies
```bash
npm install
````

3. Install Python dependencies

```bash
pip install -r requirements.txt
```

4. Set up environment variables

- Create .env file with necessary configurations
- Configure MongoDB connection

5. Start the servers

```bash
# Start frontend
npm run dev

# Start Flask server
python app.py

# Start Node.js server
cd server
node index.js
```

## Features in Detail

### Medical Consultation System

- Real-time virtual consultations
- Appointment scheduling
- Digital prescription management
- Patient history tracking

### AI-Powered Features

- Symptom analysis
- Disease prediction
- Specialist recommendation
- Interactive chatbot support

### Hospital Management

- Multi-hospital integration
- Doctor availability tracking
- Appointment management
- Patient record management

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

