import { useState, useEffect } from "react";

const useUserData = (email: string) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("useEffect triggered, email:", email); // Check if useEffect is triggered
  
    if (!email) {
      setError("Email is required to fetch user data");
      setLoading(false);
      return;
    }
  
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/user?email=${email}`);
        console.log('Request sent');
        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to fetch user data`);
        }
        const userData = await response.json();
        console.log("User Data:", userData); // Log the response to check
        setUser(userData);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError("An unexpected error occurred");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [email]);
  

  return { user, loading, error };
};

export default useUserData;
