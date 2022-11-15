from io import BytesIO

from fastapi import APIRouter, File, UploadFile, Response, HTTPException, Depends
from fastapi.responses import FileResponse, StreamingResponse

from app.api.middlewares.jwt_bearer import get_current_active_user
from app.services.aws import s3
from app.core.logging import get_logging
from app.core.config import get_app_settings
from app.domain.models import User

log = get_logging(__name__)
settings = get_app_settings()

router = APIRouter()


@router.post("/")
def upload_doc(files: list[UploadFile],
                     current_user: User = Depends(get_current_active_user)):
    contents: list[BytesIO] = []
    files_paths: list[str] = []

    for file in files:
        try:
            content = file.file.read()
            temp_file = BytesIO()
            temp_file.write(content)
            temp_file.seek(0)
            contents += [temp_file]
            files_paths += []
        except Exception:
            raise HTTPException(
                422, f"Los documentos no se pudieron subir, {file.filename} está corrupto")
    
    for content, file in zip (contents, files):
        path = f'user_{current_user.id}/' + file.filename
        response = s3.push_data_to_s3_bucket(settings.aws_bucket_name, content,
                                    file_name=path, content_type=file.content_type)
        if response:
            files_paths += [path]
    return {"files_paths": files_paths}


@router.get("/")
def get_doc(key: str, current_user: User = Depends(get_current_active_user)):
    try:
        result = s3.get_data_from_s3_bucket(settings.aws_bucket_name, key)
    except Exception as e:
        if hasattr(e, "message"):
            raise HTTPException(
                status_code=e.message["response"]["Error"]["Code"],
                detail=e.message["response"]["Error"]["Message"],
            )
        else:
            raise HTTPException(status_code=500, detail=str(e))
    return StreamingResponse(content=result["Body"].iter_chunks())