from pydantic import BaseModel
from typing import List

class FlaggedClause(BaseModel):
    clause_title: str
    risk_level: str  # HIGH, MEDIUM, LOW
    original_text: str
    risk_explanation: str
    recommended_fix: str

class RiskAnalysisResponse(BaseModel):
    contract_type: str
    overall_risk_score: int  # 0 to 100
    summary: str
    flagged_clauses: List[FlaggedClause]
    missing_critical_clauses: List[str]