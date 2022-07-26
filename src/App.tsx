import { useEffect, useState } from "react";
import keycloak from "./Services/keycloak";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    keycloak
      .init({})
      .then((authenticated) => {
        setIsInitialized(true);
        setIsAuthenticated(authenticated);
      })
      .catch(function () {
        alert("failed to initialize");
      });
  }, []);

  // If you try to call `keycloak.createLoginUrl` before the
  // keycloak instance is initialized, it will throw an error.
  if (!isInitialized) return null;

  return (
    <div className="App">
      <header className="App-header">
        {!isAuthenticated ? (
          <a className="App-link" href={keycloak.createLoginUrl()}>
            Sign In
          </a>
        ) : (
          <>
            <a
              className="App-link"
              href={keycloak.createLoginUrl({
                action: "UPDATE_PASSWORD",
              })}
            >
              Change Password (no prompt)
            </a>
            <a
              className="App-link"
              href={keycloak.createLoginUrl({
                action: "UPDATE_PASSWORD",
                prompt: "login",
              })}
            >
              Change Password (with prompt)
            </a>
            <a className="App-link" href={keycloak.createLogoutUrl()}>
              Sign Out
            </a>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
