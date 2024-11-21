// "use client";
// import { useEffect, useState } from "react";
// import Layout from "../components/Layout";
// import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";
// import "./globals.css";

// export default function Home() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [userData, setUserData] = useState<any>(null);

//   useEffect(() => {
//     const data = searchParams.get("userData");
//     if (data) {
//       setUserData(JSON.parse(data));
//     }
//     //  else {
//     //   router.push("/account/login"); // Redirect to login if no userData is available
//     // }
//   }, [searchParams, router]);

//   return (
//     <>
//       {userData ? (
//         <Layout userData={userData} /> // Pass userData to Layout component
//       ) : (
//         <p>Loading...</p> // Show loading while fetching userData
//       )}
//     </>
//   );
// }

import Layout from "../components/Layout";
import "./globals.css";

export default function Home() {
  return (
    <>
      <Layout />
    </>
  );
}
