# Wind Turbine AI Monitoring & Predictive Maintenance System

![Wind Turbine Dashboard Preview](./public/favicon.svg)

An AI and IoT-based condition monitoring and predictive maintenance prototype system designed for wind turbines. This software dashboard simulates real-time data streaming from a network of physical sensors (typically connected via an ESP32 microcontroller) to continuously assess turbine health and predict potential faults using machine learning before catastrophic failure occurs.

## 🚀 Features

- **Real-Time Data Visualization**: Live monitoring of DC motor temperature, electrical current draw, structural vibration, and rotor speed (RPM).
- **AI Fault Prediction**: Dynamic calculation of probabilities for Normal Operation, Bearing Faults, and Motor Faults based on a Random Forest classification architecture.
- **Automatic Protection System**: Automatically triggers an emergency shutdown sequence (relays OFF, turbine STOPPED) if the critical fault probability exceeds the safety threshold.
- **Predictive Maintenance**: Generates contextual, prioritized maintenance recommendations based on active sensor warnings and system health degradation.
- **Built-in Simulation Engine**: Includes a deterministic, standalone Demo Mode allowing you to safely simulate Bearing Faults, Motor Faults, and Critical Scenarios without requiring physical hardware.
- **Fault History Logging**: Maintains a searchable, filterable log of system alerts, warnings, and triggered safety interventions.

## 🛠️ Technology Stack

- **Frontend Framework**: [React 18](https://reactjs.org/) & [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Premium Dark SCADA Theme)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API

## ⚙️ Simulated Hardware Architecture

While the dashboard runs in simulation mode, it is designed to integrate with the following physical IoT architecture:

```text
Wind Turbine 
    ↓
Physical Sensors (Temperature, Current, Hall Effect, Vibration)
    ↓
ESP32 Microcontroller
    ↓
Cloud Server (Node.js/MQTT)
    ↓
IoT Dashboard & AI Engine
    ↓
Protection System / Emergency Relay
```

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vinaybethala/wind_turbine_AI_monitoring.git
   cd wind_turbine_AI_monitoring
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the Dashboard:**
   Open your browser and navigate to `http://localhost:5173`.

## 🎮 Using the Demo Mode

For educational and presentation purposes, the dashboard features a built-in Prototype Control Panel. 
1. Navigate to the **Settings** page.
2. Ensure the **Simulation ON** badge is active.
3. Click one of the fault simulation scenarios:
   - **Simulate Bearing Fault**: Gradually increases vibration and temperature while dropping RPM. Watch the AI probability shift towards a bearing fault.
   - **Simulate Motor Fault**: Increases current draw and temperature while dropping RPM.
   - **Simulate Critical Fault**: Forces all sensors past their critical thresholds to demonstrate the Automatic Protection System (Auto-Shutdown).
4. Use the **Emergency Stop** and **Reset System** buttons to simulate human intervention.

## 📝 License

This project is created for educational and prototyping purposes as part of an engineering demonstration.
