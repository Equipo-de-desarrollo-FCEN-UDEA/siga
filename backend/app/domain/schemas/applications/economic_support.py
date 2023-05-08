from typing import Any
from datetime import datetime

from pydantic import BaseModel, validator, Field

from app.domain.schemas.application import ApplicationResponse

class ApplicationData(BaseModel):
    type_applicant: str
    project: str 
    goal: str 

class PersonalData(BaseModel):
    application_for: str
    name: str
    identification_number: str
    city: str
    address: str | None
    landline: str 
    email: str
    phone: str
    institution: str | None
    academic_unit: str | None

class tickets(BaseModel):
    birthdate: datetime
    place_birth: str
    departure_date: datetime
    departure_place: str
    arrival_date: datetime
    arrival_place: str

#Avances, viaticos y apoyos economicos
class AdvancePayment(BaseModel):
    name: str
    id: str
    bank: str
    value: str
    account_number: str
    account_type: str
    start_date: datetime
    end_date: datetime
        

class EconomicSupportBase(BaseModel):
    application_data: list[ApplicationData]
    persona_data: list[PersonalData]
    tickets: list[tickets]
    payment: list[AdvancePayment]
    document: list[Any] | None


class EconomicSupportCreate(EconomicSupportBase):
    application_sub_type_id: int

class EconomicSupportUpdate(EconomicSupportBase):
    application_sub_type_id: int

class EconomicSupportInDB(EconomicSupportBase):
    economic_support: EconomicSupportBase | None
    document: list[Any] | None

class EconomicSupportResponse(ApplicationResponse):
    economic_support: EconomicSupportInDB