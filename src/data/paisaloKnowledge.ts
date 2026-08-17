import { KnowledgeItem } from '../types';

export const PAISALO_KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: 'company-overview',
    category: 'Company Profile',
    title: 'Paisalo Digital Limited Overview',
    summary: 'Paisalo Digital Limited is a leading RBI-registered Systemically Important Non-Deposit taking Non-Banking Financial Company (NBFC) in India.',
    details: [
      'Paisalo Digital Limited (formerly S.E. Investments Limited) is a premier RBI-registered Systemically Important NBFC.',
      'Operational for over 30 years with deep outreach across rural, semi-urban, and urban India.',
      'Tagline: "Easy Loan, Easy Life". Listed on NSE and BSE.',
      'Primary mission: Financial inclusion, supporting micro-entrepreneurs, women empowerment, EV adopters, and small business owners.'
    ],
    keywords: ['paisalo', 'company', 'nbfc', 'rbi', 'about', 'overview', 'se investments']
  },
  {
    id: 'income-generation-loan',
    category: 'Loan Products',
    title: 'Income Generation / Small Business Loans',
    summary: 'Loans designed for small entrepreneurs, shopkeepers, and self-employed individuals to start or expand business.',
    details: [
      'Loan Amount: ₹10,000 to ₹1,00,000 for micro-loans (up to ₹20,000,000 for small business expansion).',
      'Tenor: 12 months to 36 months.',
      'Interest Rate: Competitive NBFC rates starting from 14% to 22% p.a. depending on borrower credit profile and co-lending terms.',
      'Eligibility: Indian citizen, age 21 to 60 years, active small business/shop/self-employment, valid Aadhaar & PAN.',
      'Documents Required: Aadhaar Card, PAN Card, Passport size photo, Bank Account details/Passbook copy, Business address or shop proof.'
    ],
    keywords: ['income generation', 'small business loan', 'micro finance', 'shopkeeper loan', 'business loan']
  },
  {
    id: 'ev-loan',
    category: 'Loan Products',
    title: 'E-Vehicle (EV) & E-Rickshaw Loans',
    summary: 'Loans for purchasing electric 2-wheelers, 3-wheelers, and e-rickshaws to generate eco-friendly livelihood.',
    details: [
      'Loan Amount: Up to 80% to 90% of the vehicle ex-showroom or on-road price (typically ₹50,000 to ₹3,00,000).',
      'Tenor: 12 months to 48 months.',
      'Interest Rate: Approximately 12% to 18% p.a.',
      'Eligibility: Age 21 to 60 years, valid driving license (where applicable for 2-wheeler/3-wheeler), resident proof, stable income.',
      'Documents Required: KYC documents (Aadhaar & PAN), vehicle proforma invoice/quotation from authorized dealer, bank statement/income proof, driving license.'
    ],
    keywords: ['ev loan', 'electric vehicle', 'e rickshaw', 'ebike', 'commercial ev']
  },
  {
    id: 'jlg-loan',
    category: 'Loan Products',
    title: 'Joint Liability Group (JLG) / Women Empowerment Loans',
    summary: 'Group micro-financing for women entrepreneurs in rural and semi-urban areas with mutual guarantee.',
    details: [
      'Loan Amount: ₹15,000 to ₹50,000 per member.',
      'Tenor: 12 months to 24 months.',
      'Target Audience: Groups of 5 women living in close proximity engaged in income-generating activities (stitching, dairy, handicrafts, local trading).',
      'Eligibility: Women aged 18 to 58 years, group mutual guarantee, no prior default.',
      'Documents Required: Member Aadhaar Card, PAN Card (or Form 60), Bank passbook, group photo.'
    ],
    keywords: ['jlg', 'group loan', 'women loan', 'microfinance group', 'empowerment']
  },
  {
    id: 'co-lending',
    category: 'Co-Lending',
    title: 'Bank Co-Lending Partnerships (SBI, BOB, PNB, UCO)',
    summary: 'Paisalo partners with major public sector banks to offer lower interest rates and faster loan processing.',
    details: [
      'Paisalo is a pioneer in bank co-lending with State Bank of India (SBI), Bank of Baroda (BOB), Punjab National Bank (PNB), UCO Bank, and Central Bank of India.',
      'Co-Lending Model: Bank provides 80% funding and Paisalo provides 20% funding.',
      'Benefit to Borrower: Enables borrowers to access low-cost bank credit with Paisalo’s fast, paperless digital underwriting at their doorstep.'
    ],
    keywords: ['co-lending', 'sbi', 'bank of baroda', 'pnb', 'uco bank', 'bank partnership']
  },
  {
    id: 'application-process',
    category: 'Application Steps',
    title: 'How to Apply for a Paisalo Loan (Digital & Branch)',
    summary: 'Simple, paperless digital application process through PAISALO Mobile App or nearest branch.',
    details: [
      'Step 1: Download the official PAISALO App from Google Play Store or visit the nearest Paisalo branch.',
      'Step 2: Enter mobile number and verify via OTP.',
      'Step 3: Complete instant e-KYC by uploading Aadhaar and PAN Card.',
      'Step 4: Enter loan requirements, bank account details, and income details for instant eligibility evaluation.',
      'Step 5: Quick field/digital verification -> Sign digital loan agreement & set up NACH e-mandate -> Loan amount disbursed directly into your bank account.'
    ],
    keywords: ['how to apply', 'application process', 'paisalo app', 'loan steps', 'apply online']
  },
  {
    id: 'repayment-emi',
    category: 'EMI & Repayment',
    title: 'Loan Repayment & EMI Payment Options',
    summary: 'Flexible and convenient online and offline repayment channels.',
    details: [
      'Automated EMI: Auto-debit via NACH / e-Mandate from registered bank account on EMI due date.',
      'Online Payment: Pay via UPI, Debit Card, Net Banking directly on the PAISALO App.',
      'BBPS Payment: Pay via Paytm, PhonePe, Google Pay under Bharat Bill Pay System (BBPS) by searching "Paisalo Digital Limited".',
      'Branch Cash Deposit: Pay in cash at any authorized Paisalo branch (always demand official SMS/digital receipt).',
      'Prepayment / Foreclosure: Allowed as per RBI guidelines with minimal or zero foreclosure charges for micro-loans.'
    ],
    keywords: ['emi', 'repayment', 'pay online', 'paytm', 'phonepe', 'nach', 'foreclosure']
  },
  {
    id: 'support-contact',
    category: 'Support Contacts',
    title: 'Paisalo Customer Care & Support Information',
    summary: 'Contact numbers and email addresses for customer support and career queries.',
    details: [
      'Customer Care Toll-Free Helpline: 1800 102 3456 or 011 4351 8888.',
      'Customer Support Email: customercare at paisalo dot in.',
      'HR / Communications Email: hrcommunication at paisalo dot in.',
      'Official Website: www dot paisalo dot in.',
      'Head Office: Paisalo Digital Limited, Registered Office in Delhi and Corporate Offices in Agra & New Delhi.'
    ],
    keywords: ['customer care', 'helpline', 'contact number', 'support email', 'hr email', 'address']
  },
  
  // HRMS KNOWLEDGE BASE (EMPLOYEES ONLY)
  {
    id: 'hrms-login-credentials',
    category: 'HRMS Portal',
    title: 'HRMS Login, Password & Credentials',
    summary: 'Login troubleshooting, forgot password flow, OTP issues, and employee code registration for Paisalo HRMS.',
    details: [
      'Login Failure / Cannot Login: Use correct password and OTP. If it still fails, contact HR with your employee code.',
      'Forgot Password / Reset: Open HRMS -> Forgot Password -> Enter employee code -> Verify OTP sent to registered mobile -> Set new password.',
      'OTP Not Received / Wrong OTP: Confirm mobile number is registered in HRMS (Profile -> Edit -> Update number). Retry Forgot Password with employee code.',
      'Employee Code Not Found: Fill the official Excel template in the correct format. Contact HR if code is still missing.',
      'Mobile Number Not Registered: Login with employee code -> Profile -> Edit -> Update mobile number.',
      'Role Not Mapped / No Access: Contact HR with your department and designation so your role can be mapped.',
      'Multiple Users on Same Account: Email hrcommunication at paisalo dot in with Name, Employee Code, official email, and phone.'
    ],
    keywords: ['hrms login', 'forgot password', 'otp not received', 'employee code', 'role not mapped', 'reset password', 'paisalo hrms']
  },
  {
    id: 'hrms-profile-documents',
    category: 'HRMS Portal',
    title: 'HRMS Profile, Documents & Transfers',
    summary: 'How to update personal profile details, upload employee documents, change reporting manager, and update branch after transfer.',
    details: [
      'Update Profile / Change Details: HRMS -> Click your name -> Profile -> Edit -> Update fields and save.',
      'Upload Documents: HRMS -> Click name -> Profile -> Edit -> Upload documents and save.',
      'Reporting Manager Change: Email hrcommunication at paisalo dot in with employee details and new reporting manager information.',
      'Creator & Branch After Transfer: Email hrcommunication at paisalo dot in with Creator Name and Branch details.'
    ],
    keywords: ['update profile', 'upload documents', 'reporting manager', 'branch transfer', 'creator name']
  },
  {
    id: 'hrms-attendance-leave',
    category: 'HRMS Portal',
    title: 'HRMS Attendance, Leave Application & Regularization',
    summary: 'Steps to apply for leave, request attendance regularization, and manage attendance approvals in Paisalo HRMS.',
    details: [
      'Apply Leave / Request Leave: Open HRMS -> Attendance dashboard -> Click the target date -> Select Leave -> Fill form -> Click Apply.',
      'Regularize Attendance: Open HRMS -> Click the target date -> Select Regularization -> Fill details -> Click Apply.',
      'Attendance Approvals: Go to Profile -> Attendance (left menu) to view and manage attendance approvals.'
    ],
    keywords: ['apply leave', 'regularize attendance', 'attendance approval', 'leave request', 'hrms leave']
  },
  {
    id: 'hrms-app-permissions',
    category: 'HRMS Portal',
    title: 'HRMS App Location & Permission Errors',
    summary: 'Troubleshooting location issues and app permission errors on the Paisalo HRMS Mobile App.',
    details: [
      'Location Not Working: Enable location permission for the HRMS app and for your mobile device (Settings -> Apps -> HRMS -> Permissions -> Location).',
      'Permission Error: Enable all required app permissions (especially Location) on your phone, then restart the HRMS app.'
    ],
    keywords: ['location not working', 'permission error', 'hrms app location', 'enable location']
  },
  {
    id: 'hrms-career-referrals',
    category: 'HRMS Portal',
    title: 'HRMS Career, Job Creation & Candidate Referrals',
    summary: 'How to initiate hiring requests and refer job candidates on the Paisalo Job Referrals portal.',
    details: [
      'Create Job / Hiring Request: HRMS -> Profile -> Career -> Hiring Request.',
      'Job Referral / Refer Candidate: Open https://predemoui.paisalo.in:4022/JobReferrals -> Select job -> Enter candidate details.',
      'Job Referrals Portal URL: predemoui dot paisalo dot in port 4022 slash JobReferrals.'
    ],
    keywords: ['hiring request', 'refer candidate', 'job referral', 'job referrals portal', 'career']
  },
  {
    id: 'hrms-hr-contact-rules',
    category: 'HRMS Portal',
    title: 'HRMS HR Contact Requirements Matrix',
    summary: 'Clear rules on when HR contact is required versus self-service in HRMS.',
    details: [
      'Contact HR REQUIRED: Reporting manager change (Email hrcommunication@paisalo.in), Creator & branch change after transfer (Email hrcommunication@paisalo.in), Role not mapped / no access (Contact HR with designation), Employee code missing (Fill template and contact HR), Multiple users on same account (Email hrcommunication@paisalo.in), Persistent login failure (Contact HR with employee code), General unresolved HR issues (Email hrcommunication@paisalo.in).',
      'Contact HR NOT REQUIRED (Self-service in HRMS): Applying leave or regularization (HRMS App -> Attendance), Resetting password (HRMS App -> Forgot Password via OTP), Updating mobile number or profile (HRMS App -> Profile -> Edit), Uploading documents (HRMS App -> Profile -> Edit), Referring candidates (Job Referrals Portal), Submitting resignation (HRMS App -> Resignation), Initiating PIP plan (HRMS App -> Improvement Plan).'
    ],
    keywords: ['need hr contact', 'contact hr required', 'is hr contact needed', 'when to contact hr']
  },
  {
    id: 'hrms-pip-resignation-contact',
    category: 'HRMS Portal',
    title: 'HRMS PIP, Resignation & HR Helpdesk Contact',
    summary: 'How to initiate PIP, submit resignation, and contact the Paisalo HR communication team for help.',
    details: [
      'PIP (Performance Improvement Plan): HRMS -> Improvement Plan -> Initiate New PIP.',
      'How to Resign: HRMS -> Profile menu -> Profile -> Resignation -> Follow on-screen steps.',
      'HR Helpdesk Email: Email hrcommunication at paisalo dot in with your employee code, issue description, and screenshot if possible.'
    ],
    keywords: ['pip plan', 'how to resign', 'resignation', 'hr contact', 'hr communication email']
  }
];

export function getFullKnowledgeText(): string {
  return PAISALO_KNOWLEDGE_BASE.map(item => {
    return `[CATEGORY: ${item.category} | TITLE: ${item.title}]\nSummary: ${item.summary}\nDetails:\n${item.details.map(d => `- ${d}`).join('\n')}\n`;
  }).join('\n---\n');
}

