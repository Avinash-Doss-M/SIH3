import { dataService } from './dataService';

export async function fetchPlacementDashboard() {
  return await dataService.getPlacementDashboard();
}

export async function fetchPlacementDrives() {
  return await dataService.getPlacementDrives();
}
