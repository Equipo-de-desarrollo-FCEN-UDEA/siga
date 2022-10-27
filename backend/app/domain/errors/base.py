class BaseErrors(Exception):
    def __init__(self, code: int, detail: str):
        self.code = code
        self.detail = detail

