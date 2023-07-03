import { Routes, Route } from "react-router-dom";

import "./App.css";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";

import Layout from "./Layout";
import RegistePage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
	return (
		<UserContextProvider>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<IndexPage />} />

					<Route path="/register" element={<RegistePage />} />
					<Route path="/account/:subpage?" element={<AccountPage />} />
					<Route path="/account/:subpage/:action" element={<AccountPage />} />
				</Route>
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</UserContextProvider>
	);
}

export default App;
