import os
import json
from groq import Groq
from schemas.risk_schema import RiskAnalysisResponse

def analyze_contract_risk(contract_text: str) -> dict:
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY is missing from .env file!")

    client = Groq(api_key=api_key)
    
    # Get JSON Schema for Pydantic v2
    schema = RiskAnalysisResponse.model_json_schema()

    prompt = f"""
    You are an expert legal counsel AI. Analyze the following contract text for legal risks, unfavorable terms, and missing clauses.
    Return ONLY a JSON object matching this JSON schema:
    {json.dumps(schema)}

    Contract Text:
    {contract_text[:12000]}
    """

    # Updated active model: openai/gpt-oss-120b (Recommended replacement for Llama 3.3 70B)
    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"}
    )
    
    return json.loads(response.choices[0].message.content)