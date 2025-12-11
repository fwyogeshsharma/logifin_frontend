// src/services/trips/trips.service.ts

import { apiClient } from '@/services/api/client';
import { ENDPOINTS } from '@/services/api/endpoints';
import type { ApiResponse, CreateTripRequest, Trip } from '@/types/api.types';

/**
 * Trips Service
 * Handles trip creation and management for transporters
 */
class TripsService {
  /**
   * Create a new trip
   */
  async createTrip(data: CreateTripRequest): Promise<ApiResponse<Trip>> {
    const response = await apiClient.post<Trip>(ENDPOINTS.TRIPS.BASE, data);
    return response;
  }

  /**
   * Get trip by ID
   */
  async getTripById(id: string | number): Promise<ApiResponse<Trip>> {
    const response = await apiClient.get<Trip>(ENDPOINTS.TRIPS.BY_ID(id));
    return response;
  }

  /**
   * Get trips by user ID (created by user)
   */
  async getTripsByUserId(userId: number): Promise<ApiResponse<Trip[]>> {
    const response = await apiClient.get<Trip[]>(
      ENDPOINTS.TRIPS.LIST,
      { createdByUserId: userId }
    );
    return response;
  }
}

export const tripsService = new TripsService();
