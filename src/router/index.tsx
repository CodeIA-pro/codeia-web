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
import ReferenceGuideInfoView from "../pages/ReferenceGuideInfoView";
import ReferenceGuideInfoSharedView from "../pages/ReferenceGuideInfoSharedView";
import ProfileView from "../pages/ProfileView";
export const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/guide/shared/:url" element={<ReferenceGuideInfoSharedView/>} />
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
                    <Route path="/profile" element={<ProtectedRoute component={ProfileView} />} />
                    <Route path="/info/:owner/:project" element={<ProtectedRoute component={ReferenceGuideView} />} />
                    <Route path="/guide/:owner/:project/:version" element={<ProtectedRoute component={ReferenceGuideInfoView} />} />
                    <Route path="*" element={<NotFound root=""/>} />
                </Route>
            </Routes>
        </Router>
    );
};