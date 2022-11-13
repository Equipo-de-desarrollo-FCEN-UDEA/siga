from boto3 import resource
from botocore.exceptions import ClientError

from app.core.config import get_app_settings


settings = get_app_settings()


class AmazonS3:

    def __init__(self, aws_access_key_id, aws_secret_access_key, region_name):
        self.s3 = resource('s3',
                           aws_access_key_id=aws_access_key_id,
                           aws_secret_access_key=aws_secret_access_key,
                           region_name=region_name)

    def push_data_to_s3_bucket(self, bucket_name, data, file_name, content_type) -> bool:
        try:
            self.s3.Object(bucket_name, file_name).upload_fileobj(data,
                                                                  ExtraArgs={
                                                                      'ContentType': content_type}
                                                                  )
        except ClientError as e:
            return False
        return True

    def delete_contents_s3_bucket(self, bucket_name, file_name):
        self.s3.Object(bucket_name, file_name).delete()
        self.show_contents_s3_bucket(bucket_name)

    def get_data_from_s3_bucket(self, bucket_name, file_name):
        return self.s3.Object(bucket_name, file_name).get()

    def empty_bucket(self, bucket_name):
        self.s3.Bucket(bucket_name).objects.all().delete()


s3 = AmazonS3(settings.aws_access_key_id,
              settings.aws_access_secret_key, settings.aws_region_name)
