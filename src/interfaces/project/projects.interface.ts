export interface Project {
    id:            number;
    title:         string;
    description:   string;
    created_at:    string;
    project_count: number;
    length:        number;
}

export interface CreateProject {
    id?:            number;
    title:         string;
    description:   string;
}

export interface ChangeProject {
    project_id:    number;
    repo_origin:   string;
    repo_destiny:  string;
}

export interface CreateProjectGithub {
    title?: string;
    branch: string;
    url_repo?: string;
    user_repo?: string;
    root: string;
    project_id: number;
}

export interface ResponseCreateProject {
    id: number;
    title: string;
    branch: string;
    url_repo: string;
    user_repo: string;
    root: string;
}
 
export interface GenerateReferenceGuide {
    sections: string;
    token?: string;
    project_id: number;
    lang: string;
    theme: string;
    owner?: string;
    project_name?: string;
}