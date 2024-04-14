import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouterLayout } from "../layouts/RouterLayout";
import { RedirectGithubView } from "../components/Github/RedirectGithubView";
import ProtectedRoute from "../security/ProtectedRoute";
import HomeView from "../pages/HomeView";
import LoginView from "../pages/Login";
import GithubView from "../pages/GithubView";
import ProjectView from "../pages/ProjectView";
//import { AppTwo } from "../App copy";

export const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RouterLayout/>}>
                    <Route path="/" element={<HomeView/>} />
                    <Route path="/login" element={<LoginView/>} />
                    <Route path="/select-repo" element={<GithubView/>} />
                    {/* <Route path="/connection" element={<ProtectedRoute component={ConnectionPage} />} /> */}
                    <Route path="/connection" element={<ProtectedRoute component={RedirectGithubView} />} />
                    <Route path="/projects" element={<ProtectedRoute component={ProjectView} />} />
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
<Route path="/info/:user/:project" element={<ProtectedRoute component={ReferenceGuideInfoPage} />} />
<Route path="/guide/:user/:project/:version" element={<ProtectedRoute component={ReferenceGuidePage} />} />
<Route path="*" element={<NotFoundPage/>} />
*/