from typing import Any

from odmantic import Model, EmbeddedModel


class Applicant(EmbeddedModel):
    email: str
    acepted: bool | None = None
    role: str


class Product(EmbeddedModel):
    name: str
    description: str


class HourAval(Model):
    time: int
    hours_week: int
    title: str 
    description: str
    announcement: str
    entity: str | None
    role: str
    another_applicants: list[Applicant]
    documents: list[Any] | None
    products: list[Product]
    backrest: str | None
