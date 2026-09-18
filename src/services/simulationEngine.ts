import { SensorData, AIState, SystemState } from '../types';

// Default starting values
export const defaultSensorData: SensorData = {
  timestamp: new Date().toISOString(),
  temperature: 38.5,
  current: 1.1,
  vibration: 1.5,
  rpm: 850,
  hallPulseCount: 0
};

export const defaultAIState: AIState = {
  bearingFaultProbability: 5,
  motorFaultProbability: 3,
  normalProbability: 92,
  turbineHealth: 95,
  predictionMode: 'DEMO',
  modelActive: true,
  predictionMessage: 'Operating normally',
  predictionSeverity: 'INFO'
};

const addNoise = (value: number, variance: number) => {
  return value + (Math.random() * variance * 2 - variance);
};

export const simulateNextTick = (
  currentSensors: SensorData,
  systemState: SystemState,
  aiState: AIState
): { newSensors: SensorData; newAI: AIState } => {
  let { temperature, current, vibration, rpm, hallPulseCount } = currentSensors;
  let { bearingFaultProbability, motorFaultProbability, normalProbability, turbineHealth } = aiState;

  if (systemState.turbineStatus === 'STOPPED') {
    // Cooldown logic when stopped
    temperature = Math.max(25, temperature - 0.5);
    current = 0;
    vibration = 0;
    rpm = 0;
  } else {
    // Running simulation logic based on scenario
    hallPulseCount += (rpm / 60) * 2; // Roughly 2 pulses per rev for demo

    switch (systemState.demoScenario) {
      case 'NORMAL':
        temperature = addNoise(38, 2);
        current = addNoise(1.2, 0.1);
        vibration = addNoise(1.5, 0.3);
        rpm = addNoise(850, 10);
        
        bearingFaultProbability = Math.max(2, bearingFaultProbability - 2);
        motorFaultProbability = Math.max(2, motorFaultProbability - 2);
        normalProbability = 100 - bearingFaultProbability - motorFaultProbability;
        break;

      case 'BEARING_FAULT':
        temperature = Math.min(85, temperature + 0.3); // Gradual increase
        current = addNoise(1.3, 0.1);
        vibration = Math.min(8.5, vibration + 0.1); // Gradual increase
        rpm = Math.max(600, rpm - 2); // Gradual decrease

        bearingFaultProbability = Math.min(96, bearingFaultProbability + 1);
        motorFaultProbability = Math.max(2, motorFaultProbability - 0.5);
        normalProbability = 100 - bearingFaultProbability - motorFaultProbability;
        break;

      case 'MOTOR_FAULT':
        temperature = Math.min(90, temperature + 0.4);
        current = Math.min(3.5, current + 0.05); // Gradual increase
        vibration = Math.min(4.5, vibration + 0.05);
        rpm = Math.max(500, rpm - 3);

        motorFaultProbability = Math.min(95, motorFaultProbability + 1.2);
        bearingFaultProbability = Math.max(2, bearingFaultProbability - 0.5);
        normalProbability = 100 - bearingFaultProbability - motorFaultProbability;
        break;

      case 'CRITICAL_FAULT':
        temperature = Math.min(100, temperature + 1);
        current = Math.min(4.0, current + 0.2);
        vibration = Math.min(12, vibration + 0.5);
        rpm = Math.max(300, rpm - 10);

        bearingFaultProbability = Math.min(98, bearingFaultProbability + 2);
        motorFaultProbability = Math.min(98, motorFaultProbability + 2);
        // Normalize probabilities if they exceed 100
        const totalFault = bearingFaultProbability + motorFaultProbability;
        if (totalFault > 99) {
          bearingFaultProbability = (bearingFaultProbability / totalFault) * 99;
          motorFaultProbability = (motorFaultProbability / totalFault) * 99;
        }
        normalProbability = 100 - bearingFaultProbability - motorFaultProbability;
        break;
    }
  }

  // Calculate generic health score (Prototype calculation)
  // Temp 25%, Vib 30%, Curr 20%, RPM 25%
  // Ideal: Temp 35, Vib 1, Curr 1, RPM 900
  // Max/Worst: Temp 80, Vib 8, Curr 3, RPM 500
  const tempScore = Math.max(0, 100 - ((temperature - 35) / (80 - 35)) * 100);
  const vibScore = Math.max(0, 100 - ((vibration - 1) / (8 - 1)) * 100);
  const currScore = Math.max(0, 100 - ((current - 1) / (3 - 1)) * 100);
  let rpmScore = 100;
  if (systemState.turbineStatus === 'RUNNING') {
     rpmScore = Math.max(0, 100 - ((900 - rpm) / (900 - 500)) * 100);
  }
  
  const calculatedHealth = (tempScore * 0.25) + (vibScore * 0.30) + (currScore * 0.20) + (rpmScore * 0.25);
  turbineHealth = Math.round(Math.max(0, Math.min(100, calculatedHealth)));

  // Determine Severity and Message
  let predictionSeverity: 'INFO' | 'WARNING' | 'CRITICAL' = 'INFO';
  let predictionMessage = 'Operating normally';

  if (bearingFaultProbability > 75 || motorFaultProbability > 75 || turbineHealth < 50) {
    predictionSeverity = 'CRITICAL';
    predictionMessage = bearingFaultProbability > motorFaultProbability ? 'CRITICAL BEARING FAULT' : 'CRITICAL MOTOR FAULT';
  } else if (bearingFaultProbability > 40 || motorFaultProbability > 40 || turbineHealth < 75) {
    predictionSeverity = 'WARNING';
    predictionMessage = bearingFaultProbability > motorFaultProbability ? 'POSSIBLE BEARING FAULT' : 'POSSIBLE MOTOR FAULT';
  } else if (systemState.turbineStatus === 'STOPPED') {
    predictionMessage = 'TURBINE STOPPED';
    predictionSeverity = 'INFO';
  }

  return {
    newSensors: {
      timestamp: new Date().toISOString(),
      temperature: Number(temperature.toFixed(2)),
      current: Number(current.toFixed(2)),
      vibration: Number(vibration.toFixed(2)),
      rpm: Number(rpm.toFixed(0)),
      hallPulseCount: Math.floor(hallPulseCount)
    },
    newAI: {
      bearingFaultProbability: Number(bearingFaultProbability.toFixed(1)),
      motorFaultProbability: Number(motorFaultProbability.toFixed(1)),
      normalProbability: Number(normalProbability.toFixed(1)),
      turbineHealth,
      predictionMode: 'DEMO',
      modelActive: true,
      predictionMessage,
      predictionSeverity
    }
  };
};
