import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./page/Dashboard";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";
import Layout from "./component/Layout";
import PostList from "./page/PostList";
import PrivetRoute from "./component/PrivetRoute";
import Error from "./page/Error";
import { ROUTERS } from "./constant/Constant";

function App() {
  return (
    <div className="main_container">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path={ROUTERS.SIGN_IN} element={<SignIn />} />
            <Route path={ROUTERS.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTERS.HOME} element={<PrivetRoute />}>
              <Route path={ROUTERS.HOME} element={<Dashboard />} />
              <Route path={ROUTERS.POST_LIST} element={<PostList />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
