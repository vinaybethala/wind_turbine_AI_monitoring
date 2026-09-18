import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { type SensorData, type AIState, type SystemState, type Thresholds, type Alert, type FaultHistoryEntry } from '../types';
import { defaultSensorData, defaultAIState, simulateNextTick } from '../services/simulationEngine';

interface SystemContextType {
  sensors: SensorData;
  aiState: AIState;
  systemState: SystemState;
  thresholds: Thresholds;
  history: SensorData[];
  alerts: Alert[];
  faultHistory: FaultHistoryEntry[];
  
  // Actions
  setDemoScenario: (scenario: SystemState['demoScenario']) => void;
  toggleDemoMode: () => void;
  triggerEmergencyStop: () => void;
  resetSystem: () => void;
  acknowledgeAlert: (id: string) => void;
  updateThresholds: (newThresholds: Partial<Thresholds>) => void;
}

const defaultThresholds: Thresholds = {
  tempWarning: 50,
  tempCritical: 70,
  vibrationWarning: 3.0,
  vibrationCritical: 6.0,
  currentWarning: 2.0,
  currentCritical: 3.0,
  healthCritical: 50,
};

const defaultSystemState: SystemState = {
  turbineStatus: 'RUNNING',
  relayStatus: 'ON',
  emergencyStop: false,
  demoMode: true,
  demoScenario: 'NORMAL',
  autoShutdownEnabled: true,
};

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sensors, setSensors] = useState<SensorData>(defaultSensorData);
  const [aiState, setAiState] = useState<AIState>(defaultAIState);
  const [systemState, setSystemState] = useState<SystemState>(defaultSystemState);
  const [thresholds, setThresholds] = useState<Thresholds>(defaultThresholds);
  
  const [history, setHistory] = useState<SensorData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [faultHistory, setFaultHistory] = useState<FaultHistoryEntry[]>([]);

  // Simulation Loop
  useEffect(() => {
    if (!systemState.demoMode) return;

    const interval = setInterval(() => {
      const { newSensors, newAI } = simulateNextTick(sensors, systemState, aiState);
      
      setSensors(newSensors);
      setAiState(newAI);

      // Auto shutdown logic
      if (systemState.autoShutdownEnabled && systemState.turbineStatus === 'RUNNING') {
        if (newAI.turbineHealth < thresholds.healthCritical || newAI.predictionSeverity === 'CRITICAL') {
          setSystemState(prev => ({
            ...prev,
            turbineStatus: 'STOPPED',
            relayStatus: 'OFF'
          }));
          
          // Create critical alert
          const criticalAlert: Alert = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            type: 'AUTOMATIC SHUTDOWN',
            sensor: 'SYSTEM',
            value: newAI.turbineHealth,
            threshold: thresholds.healthCritical,
            severity: 'CRITICAL',
            message: 'Automatic protection activated due to critical fault.',
            action: 'Inspect turbine before restart.'
          };
          setAlerts(prev => [criticalAlert, ...prev]);
          setFaultHistory(prev => [{...criticalAlert, status: 'Open'}, ...prev]);
        }
      }

      // Update history for charts (keep last 60 points for demo)
      setHistory(prev => {
        const newHistory = [...prev, newSensors];
        if (newHistory.length > 60) newHistory.shift();
        return newHistory;
      });

    }, 1000); // 1 second tick for prototype

    return () => clearInterval(interval);
  }, [systemState, thresholds.healthCritical, sensors, aiState]);

  const setDemoScenario = useCallback((scenario: SystemState['demoScenario']) => {
    setSystemState(prev => ({ ...prev, demoScenario: scenario }));
  }, []);

  const toggleDemoMode = useCallback(() => {
    setSystemState(prev => ({ ...prev, demoMode: !prev.demoMode }));
  }, []);

  const triggerEmergencyStop = useCallback(() => {
    setSystemState(prev => ({
      ...prev,
      turbineStatus: 'STOPPED',
      relayStatus: 'OFF',
      emergencyStop: true,
      demoScenario: 'NORMAL' // Reset scenario
    }));
    
    const eStopAlert: Alert = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type: 'EMERGENCY STOP',
      sensor: 'USER',
      value: 0,
      threshold: 0,
      severity: 'CRITICAL',
      message: 'Emergency stop activated by user.',
      action: 'Acknowledge and reset system.'
    };
    setAlerts(prev => [eStopAlert, ...prev]);
    setFaultHistory(prev => [{...eStopAlert, status: 'Open'}, ...prev]);
  }, []);

  const resetSystem = useCallback(() => {
    setSystemState({
      ...defaultSystemState,
      demoMode: systemState.demoMode, // Preserve mode
    });
    setAiState(defaultAIState);
    setSensors({
      ...defaultSensorData,
      timestamp: new Date().toISOString()
    });
    setAlerts([]); // Clear active alerts
    // Mark fault history as resolved
    setFaultHistory(prev => prev.map(f => ({ ...f, status: 'Resolved' })));
  }, [systemState.demoMode]);

  const acknowledgeAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  }, []);

  const updateThresholds = useCallback((newThresholds: Partial<Thresholds>) => {
    setThresholds(prev => ({ ...prev, ...newThresholds }));
  }, []);

  return (
    <SystemContext.Provider value={{
      sensors, aiState, systemState, thresholds, history, alerts, faultHistory,
      setDemoScenario, toggleDemoMode, triggerEmergencyStop, resetSystem, acknowledgeAlert, updateThresholds
    }}>
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (context === undefined) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
};
