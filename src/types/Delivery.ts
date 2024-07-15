export interface Truck {
  id: number;
  model: string;
  plateNumber: string;
  maxDeliveriesPerMonth: number;
}

export interface Delivery {
  id?: number;
  startTime: string;
  endTime?: string;
  destination: string;
  value: number;
  isValuable?: boolean;
  isInsurance?: boolean;
  isDangerous?: boolean;
  truckId: number;
  truck?: Truck; 
  cargoId: number;
  driveId: number;
}