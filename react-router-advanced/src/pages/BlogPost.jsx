import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams(); 

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Blog Post #{id}</h1>
      <p>This is the content of blog post with ID: {id}</p>
    </div>
  );
}
