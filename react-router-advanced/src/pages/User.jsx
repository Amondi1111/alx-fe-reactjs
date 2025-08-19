import { useParams } from "react-router-dom";

export default function User() {
  const { id } = useParams(); 
  return <h2>User Profile for ID: {id}</h2>;
}
