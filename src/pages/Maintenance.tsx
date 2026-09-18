import React from 'react';
import { useSystem } from '../context/SystemContext';
import { Wrench, Settings2, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { cn } from '../lib/utils';

export const Maintenance: React.FC = () => {
  const { aiState, sensors, thresholds, systemState } = useSystem();

  // Determine Priority
  let priority = 'LOW';
  if (aiState.predictionSeverity === 'CRITICAL') priority = 'CRITICAL';
  else if (aiState.predictionSeverity === 'WARNING') priority = 'HIGH';
  else if (aiState.turbineHealth < 85) priority = 'MEDIUM';

  const priorityColor = 
    priority === 'CRITICAL' ? 'bg-status-red' :
    priority === 'HIGH' ? 'bg-status-amber' :
    priority === 'MEDIUM' ? 'bg-status-blue' : 'bg-status-green';

  // Generate Recommendations
  const recommendations: { title: string, desc: string, icon: any, status: 'warning' | 'critical' | 'ok' }[] = [];

  if (sensors.vibration > thresholds.vibrationWarning) {
    recommendations.push({
      title: 'Inspect Bearing & Alignment',
      desc: 'High vibration detected. Possible mechanical unbalance or bearing degradation.',
      icon: Settings2,
      status: sensors.vibration > thresholds.vibrationCritical ? 'critical' : 'warning'
    });
  }

  if (sensors.temperature > thresholds.tempWarning) {
    recommendations.push({
      title: 'Inspect Cooling & Lubrication',
      desc: 'Elevated DC motor temperature. Check cooling vents, ambient temperature, and bearing friction.',
      icon: ShieldAlert,
      status: sensors.temperature > thresholds.tempCritical ? 'critical' : 'warning'
    });
  }

  if (sensors.current > thresholds.currentWarning) {
    recommendations.push({
      title: 'Inspect Motor Load',
      desc: 'High current draw detected. Check for winding issues or mechanical binding.',
      icon: Wrench,
      status: sensors.current > thresholds.currentCritical ? 'critical' : 'warning'
    });
  }

  if (sensors.rpm < 700 && systemState.turbineStatus === 'RUNNING') {
    recommendations.push({
      title: 'Inspect Rotor & Drive Shaft',
      desc: 'RPM dropped unexpectedly during operation. Check blade pitch and gearbox.',
      icon: Settings2,
      status: 'warning'
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      title: 'Routine Inspection',
      desc: 'No immediate anomalies detected. Perform standard scheduled maintenance.',
      icon: CheckCircle2,
      status: 'ok'
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Predictive Maintenance</h1>
        <p className="text-sm text-textMuted">AI-driven inspection recommendations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 col-span-1 flex flex-col justify-center items-center text-center">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-textMuted mb-4">Maintenance Priority</h2>
          <div className="relative w-32 h-32 rounded-full border-4 border-panel flex items-center justify-center bg-background mb-4 shadow-lg">
             <div className={cn("absolute inset-0 rounded-full opacity-20 blur-xl", priorityColor)}></div>
             <span className={cn("text-2xl font-bold uppercase", `text-${priorityColor.replace('bg-', '')}`)}>{priority}</span>
          </div>
          <p className="text-sm text-textMuted mt-2">
            Next Inspection: <br/><span className="text-textMain font-medium">Estimated based on condition</span>
          </p>
        </div>

        <div className="glass-panel p-6 col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold tracking-wide uppercase mb-6 border-b border-white/5 pb-2">Recommended Actions</h2>
          
          <div className="space-y-4">
            {recommendations.map((rec, i) => (
              <div key={i} className={cn(
                "p-4 rounded-lg border flex gap-4 items-start transition-colors",
                rec.status === 'critical' ? 'bg-status-red/10 border-status-red/30' :
                rec.status === 'warning' ? 'bg-status-amber/10 border-status-amber/30' :
                'bg-status-green/10 border-status-green/30'
              )}>
                <div className={cn(
                  "p-2 rounded-full",
                  rec.status === 'critical' ? 'bg-status-red/20 text-status-red' :
                  rec.status === 'warning' ? 'bg-status-amber/20 text-status-amber' :
                  'bg-status-green/20 text-status-green'
                )}>
                  <rec.icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-textMain mb-1">{rec.title}</h3>
                  <p className="text-sm text-textMuted">{rec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
