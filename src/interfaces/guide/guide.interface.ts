export interface Guide {
    id:             number;
    title:          string;
    branch:         string;
    url_repo:       string;
    user_repo:      string;
    latest_build:   string;
    last_version:   string;
    assets:         Asset[];
    is_Loading:     boolean;
    status:         string;
    message_failed: string;
    length:         number;
}

export interface Asset {
    id:               number;
    version:          string;
    titulo:           string;
    description:      string;
    more_description: string;
    depth:            number;
    url:              string;
    is_father:        boolean;
    father_id:        number;
    privacy:          string;
    subsection:       Asset[];
    is_Loading:       boolean;
    to_failed:        boolean;
    message_failed:   string;
    project_id:       number;
    url_commit:       string;
    short_sha:        string;
    length:           number;
}

export interface Privacy {
    project_id: number;
    asset_id:   number;
    privacy:    string;
}

export interface PrivacyResponse {
    status: string;
    link:   string;
    privacy: string;
}