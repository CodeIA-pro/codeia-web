import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouterLayout } from "../layouts/RouterLayout";
import { RedirectGithubView } from "../components/Github/RedirectGithubView";
import ProtectedRoute from "../security/ProtectedRoute";
import HomeView from "../pages/home/HomeView";
import LoginView from "../pages/auth/login/Login";
import ProjectView from "../pages/files/ProjectView";
import WorkSpaceView from "../pages/workspace/WorkspaceView";
import ReferenceGuideView from "../pages/guide/ReferenceGuideView";
import VerifyView from "../pages/auth/verify/VerifyView";
import RegisterView from "../pages/auth/register/RegisterView";
import TwoFAView from "../pages/auth/two_factor/2FAView";
import ForgottenPassword from "../pages/auth/forgotten_password/ForgottenPassword";
import ResetPassword from "../pages/auth/forgotten_password/ResetPassword";
import NotFound from "../common/Not_found/NotFound";
import ReferenceGuideInfoView from "../pages/guide/ReferenceGuideInfoView";
import ReferenceGuideInfoSharedView from "../pages/guide/ReferenceGuideInfoSharedView";
import ProfileView from "../pages/auth/profile/ProfileView";
import PlanView from "../pages/plan/PlanView";
export const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/guide/shared/:url" element={<ReferenceGuideInfoSharedView/>} />
                <Route path="/" element={<RouterLayout/>}>
                    <Route path="/" element={<HomeView/>} />
                    <Route path="/login" element={<LoginView/>} />
                    <Route path="/register" element={<RegisterView/>} />
                    <Route path="/pricing" element={<PlanView/>} />
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