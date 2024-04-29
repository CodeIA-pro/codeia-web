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
    subsection:       string;
    is_Loading:       boolean;
    to_failed:        boolean;
    message_failed:   string;
    url_commit:       string;
    short_sha:        string;
}
