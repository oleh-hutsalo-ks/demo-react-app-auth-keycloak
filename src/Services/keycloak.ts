import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://keycloak-kid-sandbox.k8s.digital-ks.net/",
  realm: "subscribers",
  clientId: "demo-react-app",
});

export default keycloak;
