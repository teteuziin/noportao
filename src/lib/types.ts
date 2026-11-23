export interface Student {
  id: string;
  name: string;
  guardianName: string;
  guardianPhone: string;
  address: string;
  neighborhood: string;
  pickupTimeScheduled: string;
  status: "pending" | "approaching_10" | "approaching_5" | "at_stop" | "boarded" | "absent" | "no_show";
  guardianResponse?: "waiting" | "coming_down" | "absent_today";
  confirmedAt?: string;
  waitTimeSeconds: number;
  monthlyPunctualityRate: number; // percentage (e.g. 96)
  monthlyDelaysCount: number;
  accumulatedDelayMinutes: number;
}

export interface RouteInfo {
  id: string;
  name: string;
  vehicle: string;
  driverName: string;
  shift: "morning_in" | "afternoon_out";
  schoolName: string;
  schoolArrivalTime: string;
  contractualWaitMinutes: number;
}
