// Mock Supabase client - email only version
export const supabase = {
  from: (table: string) => ({
    insert: async (data: any) => {
      console.log('Mock insert into', table, data);
      return { 
        data: [data], 
        error: null 
      };
    },
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null })
      })
    })
  }),
  auth: {
    signUp: async (credentials: any) => {
      console.log('Mock signUp:', credentials.email);
      return { data: { user: null, session: null }, error: null };
    },
    signIn: async (credentials: any) => {
      console.log('Mock signIn:', credentials.email);
      return { data: { user: null, session: null }, error: null };
    }
  }
};
