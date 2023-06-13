from typing import Any
from datetime import datetime

from pydantic import BaseModel, Field

from app.domain.schemas.application import ApplicationResponse

class ApplicationData(BaseModel):
    application_type: str = Field(min_length=5, max_length=255)
    project: str = Field(min_length=5, max_length=255) 
    goal: str = Field(min_length=5, max_length=255) 

class PersonalData(BaseModel):
    application_for: str = Field(max_length=255)
    name: str = Field(max_length=255)
    identification_number: str = Field(max_length=255)
    city: str = Field(max_length=255)
    address: str | None = Field(max_length=255)
    landline: str = Field(max_length=255) 
    email: str = Field(max_length=255)
    phone: str = Field(max_length=255)
    institution: str | None = Field(max_length=255)
    academic_unit: str | None = Field(max_length=255)

class tickets(BaseModel):
    #birthdate: datetime
    place_birth: str = Field(max_length=255)
    departure_date: datetime
    departure_place: str = Field(max_length=255)
    arrival_date: datetime
    arrival_place: str = Field(max_length=255)

#Avances, viaticos y apoyos economicos
class AdvancePayment(BaseModel):
    name: str = Field(max_length=255)
    id: str = Field(max_length=255)
    bank: str = Field(max_length=255)
    value: str = Field(max_length=255) 
    account_number: str = Field(max_length=255)
    account_type: str = Field(max_length=255)
    start_date: datetime
    end_date: datetime

class Subdepartment(BaseModel):
    id: int | None
    name: str | None
        

class Dependence(BaseModel):
    id: int
    name: str
    subdepartment: list[Subdepartment] | None

class EconomicSupportBase(BaseModel):
    dependence: list[Dependence]
    application_data: ApplicationData
    personal_data: PersonalData
    tickets: tickets
    payment: AdvancePayment
    documents: list[Any]


class EconomicSupportCreate(EconomicSupportBase):
    application_sub_type_id: int = 14

class EconomicSupportUpdate(EconomicSupportBase):
    application_sub_type_id: int = 14

class EconomicSupportInDB(EconomicSupportBase):
    economic_support: EconomicSupportBase | None

class EconomicSupportResponse(ApplicationResponse):
    economic_support: EconomicSupportInDB