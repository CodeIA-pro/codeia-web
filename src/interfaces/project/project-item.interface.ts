export interface ProjectItem {
    id:             number;
    title:          string;
    branch:         string;
    url_repo:       string;
    user_repo:      string;
    latest_build:   string;
    last_version:   string;
    is_Loading:     boolean;
    message_failed: string;
    length:         number;
}
