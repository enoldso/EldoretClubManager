// Mock database with dummy data
const mockDb = {
  query: {
    // Add your mock queries here
    users: {
      findMany: async () => [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      ],
      // Add more mock methods as needed
    },
    // Add other tables/collections as needed
  },
  // Add other database methods you might need
};

export const db = mockDb;
