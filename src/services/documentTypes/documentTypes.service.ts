// src/services/documentTypes/documentTypes.service.ts

import { apiClient } from '@/services/api/client';
import { ENDPOINTS } from '@/services/api/endpoints';
import type { ApiResponse, DocumentType } from '@/types/api.types';

/**
 * Document Types Service
 * Handles document type operations
 */
class DocumentTypesService {
  /**
   * Get all document types
   */
  async getDocumentTypes(): Promise<ApiResponse<DocumentType[]>> {
    const response = await apiClient.get<DocumentType[]>(ENDPOINTS.DOCUMENT_TYPES.BASE);
    return response;
  }

  /**
   * Get document type by ID
   */
  async getDocumentTypeById(id: number): Promise<ApiResponse<DocumentType>> {
    const response = await apiClient.get<DocumentType>(ENDPOINTS.DOCUMENT_TYPES.BY_ID(id));
    return response;
  }
}

export const documentTypesService = new DocumentTypesService();
