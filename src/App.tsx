import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import AuthContextProvider from "./contexts/AuthContext";
import AppContextProvider from "./contexts/AppContext";
import ThemeContextProvider from "./contexts/ThemeContext";
import UserContextProvider from "./contexts/UserContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Messages from "./pages/message/Inbox";
import MessageProfile from "./pages/message/[MessageProfile]";
import UserProfile from "./pages/profile/[Profile]";
import Notifications from "./pages/Notifications";
import Accounts from "./pages/Accounts";
import Settings from "./pages/settings/Settings";
import LocationSettings from "./pages/settings/Location";
import ThemeSettings from "./pages/settings/Theme";
import Qrcode from "./pages/share/QRCode";
import Link from "./pages/share/Link";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Global styles */
import "./styles/global.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <AuthContextProvider>
          <AppContextProvider>
            <ThemeContextProvider>
              <UserContextProvider>
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/signup">
                  <Signup />
                </Route>
                <PrivateRoute exact path="/home" component={Home} />
                <PrivateRoute exact path="/inbox" component={Messages} />
                <PrivateRoute
                  path="/inbox/profile/"
                  component={MessageProfile}
                />
                <PrivateRoute path="/profile" component={UserProfile} />
                <PrivateRoute path="/notifications" component={Notifications} />
                <PrivateRoute path="/accounts" component={Accounts} />
                <PrivateRoute path="/settings" component={Settings} />
                <PrivateRoute
                  path="/settings/location"
                  component={LocationSettings}
                />
                <PrivateRoute
                  path="/settings/theme"
                  component={ThemeSettings}
                />
                <PrivateRoute path="/share/qrcode" component={Qrcode} />
                <PrivateRoute path="/share/link" component={Link} />
              </UserContextProvider>
            </ThemeContextProvider>
          </AppContextProvider>
        </AuthContextProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
