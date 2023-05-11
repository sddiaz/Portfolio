import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react"
import { auth } from "../../firebase"

export default function AuthDetails() {
    const [authUser, setAuthUser] = useState(null);

    // Listen for a new user, if there is one, set authUser to that. 
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuthUser(user);
        } else {
            setAuthUser(null);
        }
        });
        return () => {
        listen();
        };
    }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="footer">
      {authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <button onClick={userSignOut}>Sign Out</button>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};