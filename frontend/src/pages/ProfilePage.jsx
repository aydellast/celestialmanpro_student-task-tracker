import {
  useState,
} from "react";

import MainLayout from
"../components/layout/MainLayout";

import "../styles/profile.css";

function ProfilePage() {

  const [username,
    setUsername] =
    useState(
      localStorage.getItem(
        "username"
      ) || ""
    );

  const [email,
    setEmail] =
    useState(
      localStorage.getItem(
        "email"
      ) || ""
    );

  const [isEditing,
    setIsEditing] =
    useState(false);

  const handleSave =
    () => {

      localStorage.setItem(
        "username",
        username
      );

      localStorage.setItem(
        "email",
        email
      );

      alert(
        "Profile berhasil diperbarui 🚀"
      );

      setIsEditing(false);

    };

  return (

    <MainLayout>

      <div className="profile-container">

        <div className="profile-header">

          <div className="profile-avatar">

            👤

          </div>

          {isEditing ? (

            <>

              <input
                className="profile-input"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
              />

              <input
                className="profile-input"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />

            </>

          ) : (

            <>

              <h1>
                {username}
              </h1>

              <p>
                {email}
              </p>

            </>

          )}

        </div>

        <div className="profile-stats">
        </div>

        {isEditing ? (

          <button
            className="save-btn"
            onClick={handleSave}
          >

            Simpan

          </button>

        ) : (

          <button
            className="edit-btn"
            onClick={() =>
              setIsEditing(true)
            }
          >

            Edit Profile

          </button>

        )}

        <button
          className="logout-btn"

          onClick={() => {

            localStorage.clear();

            window.location.href =
              "/login";

          }}

        >

          Logout

        </button>

      </div>

    </MainLayout>

  );
}

export default ProfilePage;