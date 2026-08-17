"""
Paisalo Knowledge Base in Python
Grounding data for Paisalo Digital Limited AI Assistant
"""

PAISALO_KNOWLEDGE_BASE = [
    {
        "id": "ev-rickshaw-loan",
        "category": "Loans & Products",
        "title": "EV & E-Rickshaw Loan Details",
        "summary": "Financing solutions for Electric Vehicles and E-Rickshaws with easy EMIs.",
        "details": [
            "Paisalo offers quick loans for buying Electric Rickshaws (E-Rickshaws) and Electric 2/3 wheelers.",
            "Loan amount: Up to 80% to 85% of on-road vehicle cost.",
            "Repayment tenure: Flexible tenure ranging from 12 months to 36 months.",
            "Daily / Weekly / Monthly collection options available for drivers.",
            "Processing fee: Nominal processing fees applicable (approx 2%)."
        ],
        "keywords": ["ev loan", "e-rickshaw", "electric vehicle", "auto loan", "two wheeler ev"]
    },
    {
        "id": "small-business-loan",
        "category": "Loans & Products",
        "title": "Small Business Loan & Microfinance",
        "summary": "Income-generating micro-loans for small shopkeepers, artisans, and entrepreneurs.",
        "details": [
            "Tailored for small business owners, kirana stores, street vendors, and women entrepreneurs.",
            "Loan range: ₹10,000 up to ₹2,000,000 depending on business category and eligibility.",
            "Minimal documentation required, prioritizing financial inclusion.",
            "Co-lending support through partner banks like State Bank of India (SBI)."
        ],
        "keywords": ["small business loan", "microfinance", "income generation", "business loan", "sbi co-lending"]
    },
    {
        "id": "ev-loan-documents",
        "category": "Documentation",
        "title": "Documents Required for EV / Business Loan",
        "summary": "List of essential KYC and financial documents required for loan approval.",
        "details": [
            "Identity Proof: Aadhaar Card (Mandatory), Voter ID, or Passport.",
            "Address Proof: Aadhaar Card, Utility bill (Electricity/Water), or Ration Card.",
            "Income / Business Proof: Bank statement (last 3-6 months), GST registration if applicable, or shop photos.",
            "PAN Card or Form 60.",
            "Passport size photographs (2)."
        ],
        "keywords": ["documents required", "kyc", "aadhaar", "pan card", "bank statement"]
    },
    {
        "id": "sbi-colending",
        "category": "Partnerships",
        "title": "SBI & Paisalo Co-Lending Model",
        "summary": "Joint lending framework between Paisalo Digital Limited and State Bank of India.",
        "details": [
            "Paisalo originates, processes, and services loan applications while SBI provides major credit funding.",
            "Enables lower interest rates and seamless credit disbursal to priority sectors.",
            "Transparent digital processing with quick turnaround times."
        ],
        "keywords": ["sbi co lending", "state bank of india", "partnership", "joint loan"]
    },
    {
        "id": "customer-care-contact",
        "category": "Support",
        "title": "Customer Care & Official Contact",
        "summary": "Toll-free numbers, email addresses, and corporate headquarters location.",
        "details": [
            "Customer Care Email: customercare@paisalo.in",
            "HR Communication Email: hrcommunication@paisalo.in",
            "Headquarters: Paisalo Digital Limited, Registered Office: Delhi / Agra, India.",
            "Website: www.paisalo.in"
        ],
        "keywords": ["customer care", "toll free", "contact number", "email", "support"]
    },
    {
        "id": "emi-payment-methods",
        "category": "Payments",
        "title": "Online EMI Payment Methods",
        "summary": "How to pay loan EMIs using UPI, Paytm, PhonePe, and Net Banking.",
        "details": [
            "Paytm / PhonePe / Google Pay: Go to Loan Repayment section -> Select 'Paisalo Digital Limited' -> Enter Loan Account Number.",
            "Paisalo Mobile App: Download 'Paisalo' App from Google Play Store -> Log in -> Pay EMI via UPI/Debit Card.",
            "Collection Executives: Pay via official digital receipt issued by authorized Paisalo loan officers."
        ],
        "keywords": ["pay emi", "online payment", "paytm emi", "phonepe emi", "upi payment"]
    },
    {
        "id": "hrms-login-credentials",
        "category": "HRMS Portal",
        "title": "HRMS Login & Credentials Troubleshooting",
        "summary": "Solutions for HRMS app login failures, password resets, and mobile number updates.",
        "details": [
            "Login Failure: Ensure correct Employee Code and password. If error persists, verify mobile number & OTP.",
            "Forgot / Reset Password: Open HRMS App -> Click 'Forgot Password' -> Enter Employee Code -> Enter OTP received on registered mobile -> Set New Password.",
            "Mobile Number Update: Update in HRMS profile settings or contact HR if unable to receive OTP.",
            "Role Not Mapped / No Access: If login succeeds but menu is blank, request HR to assign your role mapping.",
            "Employee Code Not Found: Fill the new joiner template and submit to HR for employee code creation."
        ],
        "keywords": ["hrms login", "reset password", "forgot password", "login failure", "employee code"]
    },
    {
        "id": "hrms-[#hr-contact-rules]",
        "category": "HRMS Portal",
        "title": "HRMS HR Contact Requirements Matrix",
        "summary": "Clear rules on when HR contact is required versus self-service in HRMS.",
        "details": [
            "Contact HR REQUIRED: Reporting manager change (Email hrcommunication@paisalo.in), Creator & branch change after transfer (Email hrcommunication@paisalo.in), Role not mapped / no access (Contact HR with designation), Employee code missing (Fill template and contact HR), Multiple users on same account (Email hrcommunication@paisalo.in), Persistent login failure (Contact HR with employee code), General unresolved HR issues (Email hrcommunication@paisalo.in).",
            "Contact HR NOT REQUIRED (Self-service in HRMS): Applying leave or regularization (HRMS App -> Attendance), Resetting password (HRMS App -> Forgot Password via OTP), Updating mobile number or profile (HRMS App -> Profile -> Edit), Uploading documents (HRMS App -> Profile -> Edit), Referring candidates (Job Referrals Portal), Submitting resignation (HRMS App -> Resignation), Initiating PIP plan (HRMS App -> Improvement Plan)."
        ],
        "keywords": ["need hr contact", "contact hr required", "is hr contact needed", "when to contact hr"]
    }
]

def get_full_knowledge_text() -> str:
    lines = []
    for item in PAISALO_KNOWLEDGE_BASE:
        lines.append(f"### TOPIC: {item['title']} (Category: {item['category']})")
        lines.append(f"Summary: {item['summary']}")
        lines.append("Details:")
        for detail in item['details']:
            lines.append(f"- {detail}")
        lines.append("")
    return "\n".join(lines)
