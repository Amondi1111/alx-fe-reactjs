
import { useState } from "react";

export default function useAuth() {
  
  const [isAuthenticated] = useState(true); 
  return { isAuthenticated };
}
