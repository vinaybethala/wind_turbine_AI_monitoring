export type Severity = 'INFO' | 'WARNING' | 'CRITICAL';
export type TurbineState = 'RUNNING' | 'STOPPED';

export interface SensorData {
  timestamp: string;
  temperature: number; // DC Motor Temperature
  current: number; // Current Sensor
  vibration: number; // Vibration Sensor
  rpm: number; // Hall Effect Sensor
  hallPulseCount: number;
}

export interface AIState {
  bearingFaultProbability: number;
  motorFaultProbability: number;
  normalProbability: number;
  turbineHealth: number;
  predictionMode: 'DEMO' | 'REAL';
  modelActive: boolean;
  predictionMessage: string;
  predictionSeverity: Severity;
}

export interface SystemState {
  turbineStatus: TurbineState;
  relayStatus: 'ON' | 'OFF';
  emergencyStop: boolean;
  demoMode: boolean;
  demoScenario: 'NORMAL' | 'BEARING_FAULT' | 'MOTOR_FAULT' | 'CRITICAL_FAULT';
  autoShutdownEnabled: boolean;
}

export interface Thresholds {
  tempWarning: number;
  tempCritical: number;
  vibrationWarning: number;
  vibrationCritical: number;
  currentWarning: number;
  currentCritical: number;
  healthCritical: number;
}

export interface Alert {
  id: string;
  timestamp: string;
  type: string;
  sensor: string;
  value: number;
  threshold: number;
  severity: Severity;
  message: string;
  action: string;
}

export interface FaultHistoryEntry extends Alert {
  status: 'Open' | 'Resolved';
}
