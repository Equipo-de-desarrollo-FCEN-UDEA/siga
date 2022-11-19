export interface DocumentsResponse {
    files_paths: file_path[];
}

export interface file_path {
    name: string;
    path: string;
}