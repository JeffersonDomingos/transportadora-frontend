export interface Truck {
    id: number;
    model: string;
    plateNumber: string;
    maxDeliveriesPerMonth: number;
    deliveriesCount: number;
  }

  export interface CreateTruckDTO {
    model: string;
    plateNumber: string;
    maxDeliveriesPerMonth: number;
    deliveriesCount: number;
  }