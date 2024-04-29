import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouterLayout } from "../layouts/RouterLayout";
import { RedirectGithubView } from "../components/Github/RedirectGithubView";
import ProtectedRoute from "../security/ProtectedRoute";
import HomeView from "../pages/HomeView";
import LoginView from "../pages/Login";
import ProjectView from "../pages/ProjectView";
import WorkSpaceView from "../pages/WorkspaceView";
import ReferenceGuideView from "../pages/ReferenceGuideView";
import VerifyView from "../pages/VerifyView";
import RegisterView from "../pages/RegisterView";
import TwoFAView from "../pages/2FAView";
import ForgottenPassword from "../pages/ForgottenPassword";
import ResetPassword from "../pages/ResetPassword";
import NotFound from "../pages/NotFound";
//import { AppTwo } from "../App copy";

export const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RouterLayout/>}>
                    <Route path="/" element={<HomeView/>} />
                    <Route path="/login" element={<LoginView/>} />
                    <Route path="/register" element={<RegisterView/>} />
                    <Route path="/verify" element={<VerifyView/>} />
                    <Route path="/2FA" element={<TwoFAView/>} />
                    <Route path="/forgot-password" element={<ForgottenPassword/>} />
                    <Route path="/auth/password/reset/:code" element={<ResetPassword/>} />
                    <Route path="/connection" element={<ProtectedRoute component={RedirectGithubView} />} />
                    <Route path="/projects" element={<ProtectedRoute component={ProjectView} />} />
                    <Route path="/workspace/:name" element={<ProtectedRoute component={WorkSpaceView} />} />
                    <Route path="/info/:owner/:project" element={<ProtectedRoute component={ReferenceGuideView} />} />
                    <Route path="*" element={<NotFound root=""/>} />
                   {/*  <Route path="/projects/:name" element={<ProtectedRoute component={ProjectView} />} /> */}
                </Route>
            </Routes>
        </Router>
    );
};
/*  
<Route path="/login" element={<LoginPage/>} />
<Route path="/register" element={<RegisterPage/>} />
<Route path="/connection" element={<ProtectedRoute component={ConnectionPage} />} />
<Route path="/projects" element={<ProtectedRoute component={ProjectPage} />} />
<Route path="/select-repo" element={<ProtectedRoute component={RepoPage} />} />

<Route path="/guide/:user/:project/:version" element={<ProtectedRoute component={ReferenceGuidePage} />} />
<Route path="*" element={<NotFoundPage/>} />
*/