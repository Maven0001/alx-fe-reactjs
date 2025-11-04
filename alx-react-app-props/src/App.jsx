import "./App.css";
import WelcomeMessage from "./components/WelcomeMessage";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile";
import ProfilePage from "./components/ProfilePage";
import UserInfo from "./components/UserInfo";
import UserDetails from "./components/UserDetails";
import UserContext from "./components/UserContext";

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };
  return (
    <>
      <WelcomeMessage />
      <Header />
      <MainContent />
      <UserProfile name="Jane" age="25" bio="Loves hiking and photography" />
      <UserContext.Provider value={userData}>
        <ProfilePage />
      </UserContext.Provider>

      <UserInfo />
      <UserDetails />
      <Footer />
    </>
  );
}

export default App;
