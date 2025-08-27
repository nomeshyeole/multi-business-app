// Types
export type Business = {
  id: number;
  name: string;
  type: string;
  description: string | null;
  image_url: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  address: string | null;
  operating_hours: string | null;
  rating: number;
  review_count: number;
  owner_id: number | null;
  created_at: string;
};

export type Service = {
  id: number;
  business_id: number;
  name: string;
  description: string | null;
  price: string | null;
  duration: string | null;
  capacity: number | null;
  image_url: string | null;
  created_at: string;
};

export type Review = {
  id: number;
  business_id: number;
  user_id: number;
  rating: number;
  comment: string | null;
  created_at: string;
};

const API_URL = 'http://localhost:3000/api';

// Helper function for making authenticated requests
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'An unknown error occurred' }));
    throw new Error(error.error || response.statusText);
  }
  
  return response.json();
};

// Business API functions
export const businessApi = {
  // Get all businesses
  getAll: async (): Promise<Business[]> => {
    return fetchWithAuth(`${API_URL}/businesses`);
  },
  
  // Get businesses by type
  getByType: async (type: string): Promise<Business[]> => {
    return fetchWithAuth(`${API_URL}/businesses?type=${encodeURIComponent(type)}`);
  },
  
  // Get a single business
  getById: async (id: number): Promise<Business> => {
    return fetchWithAuth(`${API_URL}/businesses/${id}`);
  },
  
  // Create a new business
  create: async (business: Omit<Business, 'id' | 'rating' | 'review_count' | 'created_at'>): Promise<Business> => {
    return fetchWithAuth(`${API_URL}/businesses`, {
      method: 'POST',
      body: JSON.stringify(business),
    });
  },
  
  // Update a business
  update: async (id: number, business: Partial<Business>): Promise<Business> => {
    return fetchWithAuth(`${API_URL}/businesses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(business),
    });
  },
  
  // Delete a business
  delete: async (id: number): Promise<void> => {
    return fetchWithAuth(`${API_URL}/businesses/${id}`, {
      method: 'DELETE',
    });
  },
};

// Service API functions
export const serviceApi = {
  // Get services for a business
  getByBusinessId: async (businessId: number): Promise<Service[]> => {
    return fetchWithAuth(`${API_URL}/businesses/${businessId}/services`);
  },
  
  // Create a new service
  create: async (service: Omit<Service, 'id' | 'created_at'>): Promise<Service> => {
    return fetchWithAuth(`${API_URL}/services`, {
      method: 'POST',
      body: JSON.stringify(service),
    });
  },
  
  // Update a service
  update: async (id: number, service: Partial<Service>): Promise<Service> => {
    return fetchWithAuth(`${API_URL}/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(service),
    });
  },
  
  // Delete a service
  delete: async (id: number): Promise<void> => {
    return fetchWithAuth(`${API_URL}/services/${id}`, {
      method: 'DELETE',
    });
  },
};

// Review API functions
export const reviewApi = {
  // Get reviews for a business
  getByBusinessId: async (businessId: number): Promise<Review[]> => {
    return fetchWithAuth(`${API_URL}/businesses/${businessId}/reviews`);
  },
  
  // Create a new review
  create: async (review: Omit<Review, 'id' | 'created_at'>): Promise<Review> => {
    return fetchWithAuth(`${API_URL}/reviews`, {
      method: 'POST',
      body: JSON.stringify(review),
    });
  },
  
  // Delete a review
  delete: async (id: number): Promise<void> => {
    return fetchWithAuth(`${API_URL}/reviews/${id}`, {
      method: 'DELETE',
    });
  },
};
