// Medixis Privacy Policy, Version 1.0 — text from "Privacy Policy - Medixis.pdf" (draft dated 15 November 2026).

export type Block =
  | { p: string }
  | { list: string[] }
  | { table: { head: [string, string]; rows: [string, string][] } };

export const privacyMeta = {
  version: "1.0",
  effective: "",
};

export const privacySections: { n: number; title: string; blocks: Block[] }[] = [
  {
    n: 1, title: "Introduction", blocks: [
      { p: "1.1 This Privacy Policy explains how Medixis Group LLC (“Medixis”, “we”, “us” or “our”) collects, uses, shares and protects personal data in connection with our website at medixisgroup.com (the “Website”), our medical equipment procurement and supplier-matching services (the “Services”), and our business communications." },
      { p: "1.2 We are committed to processing personal data lawfully, fairly and transparently, in accordance with Regulation (EU) 2016/679 (the General Data Protection Regulation, “GDPR”) and all other applicable data protection laws." },
      { p: "1.3 Our Services are provided to businesses. The personal data we process relates mainly to individuals acting on behalf of clinics, hospitals, suppliers and other organisations (“you”)." },
      { p: "1.4 We do not seek to collect, and you should not provide to us, any patient data or any other information concerning the health of an individual." },
    ],
  },
  {
    n: 2, title: "Who we are", blocks: [
      { p: "2.1 Controller. The controller responsible for your personal data is Medixis Group LLC, a limited liability company registered in the State of Wyoming, United States, under Filing ID 2026-002124541, with its registered office at 30 N Gould St Ste R, Sheridan, WY 82801, USA." },
      { p: "2.2 Contact. Questions about this Privacy Policy or our handling of personal data may be sent to contact@medixisgroup.com." },
      { p: "2.3 EU representative. As we are established outside the European Union, we have appointed a representative in the Union in accordance with Article 27 GDPR: Jonas Jørgensen, Denmark, jonas@medixisgroup.com. You may contact our EU representative, in addition to or instead of us, on any matter relating to the processing of your personal data." },
      { p: "2.4 Data protection officer. We are not required to appoint a data protection officer and have not done so." },
    ],
  },
  {
    n: 3, title: "Personal data we collect", blocks: [
      { p: "3.1 Depending on your relationship with us, we may process the following categories of personal data:" },
      { table: { head: ["Category", "Examples"], rows: [
        ["Identity and contact data", "Name, job title, employer, business email address, business telephone number, business address"],
        ["Professional profile data", "Publicly available information about your role and organisation, including your professional networking profile"],
        ["Procurement data", "Equipment requirements, specifications, budgets, timelines, quotations and purchasing decisions"],
        ["Supplier data", "Product ranges, certifications, regulatory documentation, regions served, distribution arrangements and commercial terms"],
        ["Communications data", "The content of correspondence and records of meetings and calls"],
        ["Transaction and financial data", "Invoicing details, commission records and bank details required to make or receive payments"],
        ["Technical data", "IP address, browser type and device information recorded in our hosting provider\u2019s server logs"],
        ["Preference data", "Your preferences regarding communications from us, including any objection you have made"],
      ] } },
      { p: "3.2 We do not intentionally collect special categories of personal data within the meaning of Article 9 GDPR." },
    ],
  },
  {
    n: 4, title: "How we collect personal data", blocks: [
      { p: "4.1 Directly from you, when you complete a form on the Website, correspond with us, speak with us by telephone or in person, or enter into an agreement with us." },
      { p: "4.2 From publicly available sources, including organisation websites, professional networking platforms such as LinkedIn, and public business registers and directories." },
      { p: "4.3 From third parties, including clinics, hospitals, suppliers, partners and affiliates who introduce you to us or with whom we work in providing the Services." },
      { p: "4.4 Automatically, when you use the Website, through the server logs kept by our hosting provider, as described in section 12." },
    ],
  },
  {
    n: 5, title: "Purposes and legal bases", blocks: [
      { p: "5.1 We process personal data only where we have a lawful basis for doing so. The purposes for which we process personal data, and the corresponding legal bases, are as follows:" },
      { table: { head: ["Purpose", "Legal basis"], rows: [
        ["Responding to enquiries and providing the Services, including identifying, assessing and introducing suitable suppliers and preparing quotation comparisons", "Performance of a contract, or steps taken at your request before entering into a contract (Art. 6(1)(b)); our legitimate interest in providing the Services to the organisation you represent (Art. 6(1)(f))"],
        ["Assessing and onboarding suppliers, including verifying company registration, certifications and regulatory compliance", "Our legitimate interest in ensuring that the suppliers we introduce are reliable and compliant (Art. 6(1)(f)); performance of a contract (Art. 6(1)(b))"],
        ["Managing relationships with clinics, suppliers, partners and affiliates, including agreements, commissions and payments", "Performance of a contract (Art. 6(1)(b)); compliance with a legal obligation (Art. 6(1)(c))"],
        ["Contacting organisations that may benefit from our Services", "Our legitimate interest in developing our business (Art. 6(1)(f)); your consent, where required by applicable electronic marketing laws (Art. 6(1)(a))"],
        ["Operating, maintaining, securing and improving the Website", "Our legitimate interest in providing a secure and functional website (Art. 6(1)(f))"],
        ["Complying with accounting, tax, record-keeping and other legal obligations", "Compliance with a legal obligation (Art. 6(1)(c))"],
        ["Establishing, exercising or defending legal claims", "Our legitimate interest in protecting our legal rights (Art. 6(1)(f))"],
      ] } },
      { p: "5.2 Legitimate interests. Where we rely on legitimate interests, we have assessed that our interests are not overridden by your interests, rights and freedoms. You may request further information about this assessment by contacting us." },
      { p: "5.3 Consent. Where we rely on your consent, you may withdraw it at any time. Withdrawal does not affect the lawfulness of processing carried out before it." },
      { p: "5.4 Provision of data. Providing personal data to us is generally voluntary. However, if you do not provide information we reasonably require, we may be unable to respond to your request or provide the Services." },
      { p: "5.5 Automated decision-making. We do not make decisions based solely on automated processing, including profiling, that produce legal effects concerning you or similarly significantly affect you." },
    ],
  },
  {
    n: 6, title: "Business communications", blocks: [
      { p: "6.1 We may contact individuals in purchasing, management and sales roles at organisations we reasonably believe may benefit from our Services, using business contact details obtained directly or from publicly available sources." },
      { p: "6.2 Every such communication identifies Medixis and explains how to opt out. You may object to receiving further communications at any time, free of charge, by replying to the message or contacting us at the address in section 16. We will then cease contacting you and retain only the minimum information necessary to respect your objection." },
    ],
  },
  {
    n: 7, title: "Disclosure of personal data", blocks: [
      { p: "7.1 We do not sell personal data." },
      { p: "7.2 We disclose personal data only to the extent necessary for the purposes described in section 5, to the following categories of recipient:" },
      { list: [
        "(a) suppliers, where a clinic or hospital has requested our Services: we share relevant requirements and contact details with suppliers we have selected, to enable them to provide a quotation. We inform the requesting organisation before doing so. Suppliers act as independent controllers and are contractually required to use such data only for that purpose;",
        "(b) clinics and hospitals, to which we provide supplier contact and product information in the course of the Services;",
        "(c) team members and affiliates working on our behalf in particular markets, each of whom is bound by written confidentiality and data protection obligations;",
        "(d) service providers supplying IT, hosting, email, customer relationship management, communication and accounting services, acting as processors on our behalf under written agreements;",
        "(e) professional advisers, including lawyers, accountants and auditors, under duties of confidentiality;",
        "(f) public authorities, regulators and courts, where required by law or necessary to protect our rights or the rights of others;",
        "(g) a purchaser or successor, in connection with a merger, acquisition, reorganisation or sale of all or part of our business, subject to appropriate confidentiality undertakings.",
      ] },
    ],
  },
  {
    n: 8, title: "International transfers", blocks: [
      { p: "8.1 Medixis is established in the United States, and our team members, partners and suppliers are located in several countries, including countries outside the European Economic Area (“EEA”) such as the United States and Morocco. Personal data may therefore be transferred to and processed in countries whose laws may not provide the same level of protection as the laws of the EEA." },
      { p: "8.2 Where personal data is transferred outside the EEA, we ensure that the transfer is subject to an appropriate safeguard, namely:" },
      { list: [
        "(a) an adequacy decision of the European Commission in respect of the destination country, including, for transfers to the United States, the EU-US Data Privacy Framework where the recipient is certified under it;",
        "(b) the standard contractual clauses adopted by the European Commission by Implementing Decision (EU) 2021/914; or",
        "(c) where neither of the above is available, a derogation under Article 49 GDPR, in particular where the transfer is necessary for the performance of a contract concluded in your interest or at your request.",
      ] },
      { p: "8.3 You may obtain a copy of the safeguards applicable to your personal data by contacting us." },
    ],
  },
  {
    n: 9, title: "Retention", blocks: [
      { p: "9.1 We retain personal data only for as long as necessary for the purposes for which it was collected, in accordance with the following periods:" },
      { table: { head: ["Category", "Retention period"], rows: [
        ["Enquiries, procurement data and records of introductions", "3 years from our last contact with you or your organisation"],
        ["Supplier data", "3 years from the end of our relationship with the supplier"],
        ["Contracts, invoices and commission records", "The period required by applicable tax and accounting law, currently 7 years"],
        ["Business contact data of individuals who do not respond to our communications", "12 months from first contact"],
        ["Technical data collected through the Website", "14 months from collection"],
      ] } },
      { p: "9.2 At the end of the applicable period, personal data is deleted or anonymised, unless a longer retention period is required by law or necessary to establish, exercise or defend legal claims." },
    ],
  },
  {
    n: 10, title: "Security", blocks: [
      { p: "10.1 We implement appropriate technical and organisational measures to protect personal data against unauthorised or unlawful processing, accidental loss, destruction or damage. These include access restricted to personnel who need it, multi-factor authentication, encryption of data in transit and at rest within our business systems, and written confidentiality obligations for everyone who handles personal data on our behalf." },
      { p: "10.2 No method of transmission or storage is completely secure. In the event of a personal data breach, we will notify the competent supervisory authority and affected individuals where required by law." },
    ],
  },
  {
    n: 11, title: "Your rights", blocks: [
      { p: "11.1 Subject to the conditions and exceptions set out in the GDPR, you have the right to:" },
      { list: [
        "(a) request access to the personal data we hold about you (Article 15);",
        "(b) request the rectification of inaccurate or incomplete personal data (Article 16);",
        "(c) request the erasure of your personal data (Article 17);",
        "(d) request the restriction of processing of your personal data (Article 18);",
        "(e) receive your personal data in a structured, commonly used and machine-readable format, and have it transmitted to another controller (Article 20);",
        "(f) object to processing based on our legitimate interests, including an absolute right to object to direct marketing (Article 21);",
        "(g) withdraw your consent at any time, where processing is based on consent (Article 7(3)).",
      ] },
      { p: "11.2 Exercising your rights. You may exercise these rights by contacting us or our EU representative using the details in section 16. We may ask you to verify your identity before responding. We will respond within one month of receipt of your request. This period may be extended by two further months where necessary, taking into account the complexity and number of requests, in which case we will inform you within the first month. We do not charge a fee unless a request is manifestly unfounded or excessive." },
      { p: "11.3 Complaints. You have the right to lodge a complaint with a supervisory authority, in particular in the EU member state of your habitual residence, place of work or the place of the alleged infringement. In Denmark, this is Datatilsynet. We would, however, welcome the opportunity to address your concerns before you approach a supervisory authority." },
    ],
  },
  {
    n: 12, title: "Cookies", blocks: [
      { p: "12.1 The Website does not use cookies, analytics or other tracking technologies, and we do not show a cookie banner because none is needed." },
      { p: "12.2 The Website stores one small setting in your browser\u2019s session storage so that the homepage introduction plays only once per visit. It is never sent to us and is deleted when you close the browser tab." },
      { p: "12.3 Like any web host, our hosting provider keeps server logs, including IP addresses, to deliver and secure the Website." },
    ],
  },
  {
    n: 13, title: "Third-party websites", blocks: [
      { p: "13.1 The Website may contain links to third-party websites and platforms, including professional networking platforms. We are not responsible for the privacy practices of those third parties, and we encourage you to read their privacy policies." },
    ],
  },
  {
    n: 14, title: "Children", blocks: [
      { p: "14.1 Our Website and Services are intended for businesses and are not directed at individuals under the age of 16. We do not knowingly collect personal data from children." },
    ],
  },
  {
    n: 15, title: "Changes to this Privacy Policy", blocks: [
      { p: "15.1 We may update this Privacy Policy from time to time. The current version will always be available on the Website, with its effective date shown at the top. Where we make material changes, we will take reasonable steps to inform those affected." },
    ],
  },
  {
    n: 16, title: "Contact details", blocks: [
      { table: { head: ["Role", "Details"], rows: [
        ["Controller", "Medixis Group LLC, 30 N Gould St Ste R, Sheridan, WY 82801, USA"],
        ["Privacy contact", "contact@medixisgroup.com"],
        ["EU representative", "Jonas Jørgensen, Denmark, jonas@medixisgroup.com"],
      ] } },
    ],
  },
];
