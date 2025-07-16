// import { useEffect, useState } from "react";
// import api from "../api/api";
// import "./Profile.css";

// export default function Profile() {
//   const [news, setNews] = useState([]);
//   const [reporter, setReporter] = useState(null);

//   useEffect(() => {
//     api.get("/news/my").then((res) => setNews(res.data));

//     // you could store reporter name in localStorage or decode JWT
//     // for now we just show a placeholder name
//     setReporter({
//       name: "Reporter",
//       email: "reporter@example.com",
//       experience: "2 years",
//       expertise: "Economy, Finance",
//     });
//   }, []);

//   return (
//     <div className="profile-container">
//       <h2>Reporter Profile</h2>
//       <div className="profile-details">
//         <p><strong>Name:</strong> {reporter?.name}</p>
//         <p><strong>Email:</strong> {reporter?.email}</p>
//         <p><strong>Experience:</strong> {reporter?.experience}</p>
//         <p><strong>Expertise:</strong> {reporter?.expertise}</p>
//         <p><strong>Articles written:</strong> {news.length}</p>
//       </div>
//       <div className="article-list">
//         <h3>My Articles</h3>
//         {news.map((n) => (
//           <div className="article-card" key={n._id}>
//             <h4>{n.headline}</h4>
//             <p>{n.summary}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import api from "../api/api";
import {jwtDecode} from "jwt-decode";
import "./Profile.css";

export default function Profile() {
  const [news, setNews] = useState([]);
  const [reporter, setReporter] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        // decoded will contain name, email, experience, expertise (from signup payload)
        setReporter({
          name: decoded.name,
          email: decoded.email,
          experience: decoded.experience,
          expertise: decoded.expertise,
        });
      } catch (err) {
        console.error("Invalid token", err);
      }
    }

    api.get("/news/my").then((res) => setNews(res.data));
  }, []);

  return (
    <div className="profile-container">
      <h2>Reporter Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {reporter?.name}</p>
        <p><strong>Email:</strong> {reporter?.email}</p>
        <p><strong>Experience:</strong> {reporter?.experience}</p>
        <p><strong>Expertise:</strong> {reporter?.expertise}</p>
        <p><strong>Articles written:</strong> {news.length}</p>
      </div>
      <div className="article-list">
        <h3>My Articles</h3>
        {news.map((n) => (
          <div className="article-card" key={n._id}>
            <h4>{n.headline}</h4>
            <p>{n.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
