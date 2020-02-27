import React from "react";
import useSetLoading from "../../hooks/useSetLoading";

import "./terms.css";

const TermsAndConditions = () => {
  useSetLoading(false);
  return (
    <>
      <div class="terms-container">
        <h3>
          User Agreement
          <small>last revised: Febuary 15, 2020</small>
        </h3>
        <div class="mini-rule"></div>
        <h4>1. About this Agreement</h4>

        <p>
          These terms of use and user agreement (collectively, the “Agreement”)
          constitutes a legally binding agreement between Nyborg-Christensen
          Fitnses, a Norwegian sole proprietorship. (“Chadify” or “we” or “us”)
          and you (or “you” or “your”) and govern your use of Chadify.me, the
          Chadify platform, and all services provided in connection with the
          site and platform (collectively, the “Platform”). The Platform intends
          to provide a platform where you can create workout plans and track
          your workouts and the sale and purchase of workout plans(collectively,
          "Workout Plans" or "Digital Goods") to third party users of the
          Platform (collectively, the "Users").
        </p>

        <p>
          Please read this Agreement carefully. By clicking on the “Create
          Account” button during the Account registration process, completing a
          transaction using the Platform, browsing Chadify.me, and/or
          downloading Chadify’s mobile application(s), you represent that (1)
          you have read, understand, and agree to be bound by this Agreement;
          (2) you are of legal age to form a binding contract with Chadify; and
          (3) you have the authority to enter into this Agreement as yourself or
          on behalf of a Principal (as defined in Section 3.1.1) and to bind
          such Principal to this Agreement. If you do not agree with the terms
          of this Agreement, please do not use the Platform any further.
        </p>

        <p>
          Please also read our{" "}
          <a href="https://www.chadify.me/privacy">Privacy Policy</a>, which
          explains how we collect, use, and share your personal information
          and/or data.
        </p>

        <p>
          PLEASE NOTE THAT THIS AGREEMENT IS SUBJECT TO CHANGE BY US IN OUR SOLE
          DISCRETION AT ANY TIME. When changes are made, we will make a new copy
          of the Agreement available on or through this site. Except as stated
          elsewhere or as required by law, court order, or otherwise (in which
          case, all amended terms shall be effective immediately and your
          continued use of the Platform signifies and will be deemed your assent
          to and acceptance of the revised Agreement), all amended terms shall
          automatically be effective thirty (30) days after they are initially
          posted. When Chadify amends this Agreement, Chadify will make
          reasonable efforts to provide you with general, not specific, notice
          of such changes by posting an announcement at on its site, and/or
          notifying you through electronic mail/delivery. Such announcement
          shall be maintained for no less than thirty (30) days following the
          effective date of such amendment. If you do not agree with the amended
          terms and, accordingly, the Agreement, please do not use the Platform
          any further. Nonetheless, we suggest that you regularly check this
          site to view the then-current Agreement. This Agreement may not be
          otherwise amended except in a writing hand signed by you and us. For
          purposes of this provision, a “writing” does not include an email
          message and a signature does not include an electronic signature.{" "}
        </p>

        <h4>2. Grant of License to Use the Platform</h4>

        <p>
          Chadify grants you, and you accept, a non-exclusive, personal,
          non-transferable limited license to access and use the Platform,
          subject to your full compliance with the terms and conditions of this
          Agreement.
        </p>

        <h4>3. Account Creation and Management</h4>

        <p>
          3.1 General Account Creation. Certain features and functionalities of
          the Platform may require you to create a Chadify account (the
          “Account”). In establishing an Account, you agree to provide only
          true, accurate, current and complete information about yourself (or
          your Principal; see below) and to update such information as necessary
          to maintain its truth and accuracy.{" "}
        </p>

        <p>
          3.1.1 Registration on Behalf of Principal. In the event you create an
          Account as an agent acting on behalf of a business, employer or third
          party because, you represent and warrant that you have the authority
          to do so (e.g., you are an authorized employee or agent (collectively,
          the “Agent”) of such business, employer or third party (collectively,
          the “Principal”). In creating an Account on behalf of a Principal, you
          (as Agent) agree to provide such Principal’s full legal name and any
          applicable fictitious business name(s) (including the proper trade
          names or “doing business as” names). In all such cases where an Agent
          creates and/or uses an Account for the Principal, the Agent agrees and
          acknowledges that he/she undertakes all such activities on behalf of
          the Principal, and that the Principal shall be the party to this
          Agreement for all purposes, regardless of whether the Agent had the
          proper authority to create the Account, maintained the Account, and/or
          transferred the Account to another Agent. Accordingly, only the
          Principal is entitled to any rights, remedies or benefits under this
          Agreement and only the Principal may control or direct the Account and
          all information related thereto; the Agent does not acquire or retain
          any personal rights with respect to such Account. The Principal is
          likewise subject to all of the covenants, restrictions, limitations,
          representations, warranties, waivers and releases included in this
          Agreement.
        </p>

        <p>
          Furthermore, you hereby represent and warrant that you (as the Agent):
          (i) may be held liable by and to Chadify for any misrepresentation
          made by you in connection with your registration for and use of the
          Account; (ii) may be held liable by and to the Principal; and (iii)
          may be held liable by law enforcement, governmental authority or court
          order. You (as Agent) agreement to indemnify, defend, and hold
          harmless Chadify for any breach of the representations, warranties,
          and covenants contained in this Section 3 in accordance with Section
          15 (Indemnification) of this Agreement.
        </p>

        <p>
          3.2 Account Management. Ultimately, the Principal is responsible for
          all activities that occur under the Account, including, but not
          limited to, Account and password management, and neither Principal nor
          Agent will agree to sell, transfer or assign the Account or any
          Account related rights without the express written consent of Chadify.
          You are also responsible for maintaining the privacy and security of
          your network settings and systems to ensure that all sensitive or
          confidential information originating from your systems is properly
          transmitted and handled.{" "}
        </p>

        <p>
          3.3 Stripe Connected Account Agreement. Some payment processing
          services made available through the Platform to certain Users are
          provided by Stripe and are subject to the{" "}
          <a href="https://www.stripe.com/connect/account-terms">
            Stripe Connected Account Agreement
          </a>
          , which includes the Stripe Terms of Service (collectively, the
          “Stripe Service Agreement”). By agreeing to this Agreement, you also
          agree, to the extent applicable, to be bound by the Stripe Services
          Agreement (which may be modified from time to time by Stripe). As a
          condition of Chadify enabling payment processing services through
          Stripe, you agree to provide only true, accurate, current and complete
          information about yourself (or your Principal; see above) and to
          update such information as necessary to maintain its truth and
          accuracy. You also authorize Chadify to share such information and
          other transaction information related to your use of the payment
          processing services provided by Stripe.
        </p>

        <h4>4. Chadify Services</h4>

        <p>
          Upon creation of an Account, Chadify will provide you access to the
          Chadify Supplier service and/or, if applicable, the Chadify
          Sub-merchant service (please see below).{" "}
        </p>

        <p>
          4.1 Chadify Supplier. The Chadify Supplier service allows you to
          promote, market or advertise (“Promote”) your Workout Plans and sell,
          distribute or provide (“Deliver”) such Workout Plans to a third party
          purchaser (a “Buyer”).{" "}
        </p>

        <p>
          With respect to the Chadify Supplier, Chadify Sub-merchant service, or
          Chadify Affiliate Program, Chadify may require, and you agree to
          promptly furnish, additional information from you, including, but not
          limited to, tax identification number, social security number,
          identity verification, taxpayer information, or other information as
          the case may be. Failure to promptly provide such additional
          information to Chadify may result in Account suspension and/or
          termination pursuant to Section 8.
        </p>

        <h4>5. Fees, Balance Redemption, Taxes, and Conversion</h4>

        <p>
          5.1 Fees. Chadify does not assess or collect “listing” or “insertion”
          fees, but will assess and collect a per transaction fee (the “Chadify
          Fee”) equivalent to or greater than: 10% multiplied by the sum of (the
          Retail Price <em>plus</em> applicable shipping and handling fees),{" "}
          <em>plus</em> $0.25 USD.
        </p>

        <p>
          The details of the fees with respect to Workout Plans are as follows:
        </p>

        <p>
          5.1.1 Workout Plans. With respect to your Workout Plans, you may
          create one and Promote the Digital Good at a retail price determined
          by you, in your sole and absolute discretion (the “Retail Price”).
          Upon receiving a Buyer’s offer to purchase the Digital Good, Chadify
          will immediately undertake technological efforts to digitally
          duplicate the Digital Good (with the result, the “Digital Duplicate”)
          and purchase such Digital Duplicate from you at a price equivalent to
          the Retail Price <em>minus</em> the Chadify Fee <em>minus</em> the
          Affiliate Fee (see above) (the resulting amount, the “Wholesale
          Price”). The Wholesale Price will be paid to you and accumulate as
          part of your balance (the “Balance”). Upon purchase of the Digital
          Duplicate from you, Chadify takes legal custody of the Digital
          Duplicate and agrees to sell the Digital Duplicate to the Buyer at the
          Retail Price plus any applicable Value Added Tax that may be required
          (see Section 5.3).
        </p>

        <p>5.2 Balance Redemption</p>

        <p>
          5.2.1 Chadify Supplier Balance Redemption. For a Chadify Supplier
          Account with a Balance exceeding $10.00 USD, you may redeem the
          Balance (each, a “Redemption”) not more than once per one-week period
          for all sales completed up to a week prior to the payment date (each,
          a “Supplier Pay Period”). The Supplier Pay Period ends at 11:59:59pm
          UTC every Friday, as determined solely by the date-/timestamp of
          Chadify’s system. You may access information regarding your next
          Redemption on your balance page. In most cases, a deposit initiated by
          a Redemption may take up to two (2) business days to reach your bank
          account; provided, however, that Redemption payments may be
          temporarily delayed or withheld in by Chadify in certain cases
          pursuant to Section 7.
        </p>

        <p>
          5.2.2 Chadify Sub-merchant Balance Redemption. For a Chadify
          Sub-merchant Account with a Balance exceeding $10.00 USD, you may
          choose a Redemption of Balance not more than once per one-week period
          for all sales completed up to a week prior to the payment date (the
          “Sub-merchant Pay Period”). The Sub-merchant Pay Period ends at
          11:59:59pm UTC every Friday, as determined solely by the
          date-/timestamp of Chadify’s system(s). You may access information
          regarding your next Redemption on your balance page. In most cases, a
          deposit initiated by a Redemption may take up to two (2) business days
          to reach your bank account; provided, however, that Redemption
          payments may be temporarily delayed or withheld by Chadify in certain
          cases pursuant to Section 7.
        </p>

        <p>
          5.3 Taxes. The purpose of this section is to highlight some of the
          more important taxation issues that you will need to consider if you
          are using our platform. You agree to be solely responsible and liable
          for the proper administration, imposition, collection, reporting, and
          remitting of all applicable taxes. We emphasise that this information
          is not intended and should not be used as legal advice. If you are
          unsure as to your tax responsibilities then you should seek advice
          from experts on this subject.
        </p>

        <p>
          5.3.1 Direct Taxation. It is your personal responsibility to disclose
          your earnings to your relevant tax authority and you must ensure that
          you are paying the correct amount of tax. This is particularly
          relevant for users who are operating as a business.
        </p>

        <p>
          With respect to sales of applicable Digital Goods made to European
          Union consumers, Chadify will, collect, report, and remit Value Added
          Tax governing “telecommunications, broadcasting, and electronic
          services” in accordance with the applicable European European
          Commission{" "}
          <a href="http://ec.europa.eu/taxation_customs/taxation/vat/how_vat_works/telecom/index_en.htm#rulesapp2015">
            VAT regulations
          </a>
          .
        </p>

        <p>
          5.3.3 Affiliate Taxation. If you are enrolled in the Affiliate program
          and reside outside of the United States or refer buyers that reside
          outside the United States you may be liable for VAT or GST. If you are
          unsure if this applies to you you should contact your local tax
          office.
        </p>

        <p>
          5.4 Conversion. Chadify will calculate and render a converted exchange
          rate in United States Dollar (USD), regardless of whether you listed
          the Retail Price of your Workout Plan in a currency other than USD.
          All transactions will settle in USD, and, accordingly, your Balance
          will be denominated and redeemable only in USD. Chadify cannot and
          does not guarantee the accuracy of the exchange rates displayed due to
          the fluctuating nature of market rates. Accordingly, Chadify
          recommends that you confirm current rates before engaging in any
          transactions on the Platform.
        </p>

        <h4>6. Use of the Platform.</h4>

        <p>When you use the Platform, you assent that: </p>

        <p>
          6.1 You will not, or attempt to, make any unlicensed or unauthorized
          use of, or otherwise infringe violate or misappropriate, any patent,
          copyright, trademark, trade secret, right of privacy, right of
          publicity, or other intellectual property or proprietary right
          (collectively, “IP Rights”) of any entity or individual, including,
          without limitation, incorporating any original, variation or
          misspellings of any third-party trademarks, service marks, creative
          assets, or other brand identifiers without proper authorization;
        </p>

        <p>
          6.2 You will not, or attempt to, Promote or Deliver Digital Goods
          that: (i) violates, or may violate, the rules or policies of Card
          Networks or payment partners; (ii) constitutes illegal activity or is
          illegal; (iii) promotes or encourages discrimination based upon race,
          sex, religion, nationality, disability, sexual orientation or age;
          (iv) targets, or intends to distribute to, children under the age of
          thirteen (13) years old; (v) or is abusive towards other people;
        </p>

        <p>
          6.3 You will not, or attempt to, defame or impersonate any entity or
          person, including, without limitation, copying the “look and feel” of
          any third-party website or branding, or conveying or implying that you
          are operating a third-party website or entity;
        </p>

        <p>
          6.4 You will not, or attempt to, probe, exploit, disable, avoid,
          deactivate, remove, circumvent, crawl, scan, penetrate, or test the
          integrity and vulnerability of the Platform in any manner, including
          any client or server machine, or other security or authentication
          measures and safeguards;
        </p>

        <p>
          6.5 You will not, or attempt to, disassemble, reverse engineer, or
          decompile any part of the Platform;
        </p>

        <p>
          6.6 You will not, or attempt to, embed, insert, include, or
          disseminate any viruses or other harmful, or potentially harmful, data
          or technology into or through the Platform, including, without
          limitation, for the purposes of disrupting, damaging, or interfering
          with the Platform and/or other users of the Platform;
        </p>

        <p>
          6.7 You will undertake best efforts to ensure that all communications
          and/or representations you make in connection with your Workout Plan
          will: (i) be accurate and contain all disclosures and disclaimers
          necessary to prevent such communications and/or representations from
          being false, deceptive, or misleading; and (ii) otherwise comply with
          all applicable laws, regulations, advisories, and policies related to
          consumer protection;
        </p>

        <p>
          6.9 You will not require or suggest that a Buyer agree to any terms
          that reduce or limit Chadify’s return and refund policy (see Section
          7, below);
        </p>

        <p>
          6.10 You will promptly: (i) respond to inquiries from Chadify; (ii)
          notify Chadify of any regulatory or legal complaints, or threats of
          such complaints, that you receive in connection with or in relation to
          Workout Plan; and (iii) in connection with (ii) directly above,
          assist, at your sole cost and expense, in taking any appropriate or
          necessary actions reasonably requested by Chadify to respond to and/or
          resolve such complaints; and
        </p>

        <p>
          6.11 You will comply with all applicable laws, regulations, court
          orders, third party rights, applicable industry requirements
          (including, but not limited to, any and all applicable provisions of
          the{" "}
          <a href="http://usa.visa.com/merchants/merchant-support/international-operating-regulations.jsp">
            Visa International Operating Regulations
          </a>
          ,{" "}
          <a href="http://www.mastercard.us/merchants/support/rules.html">
            MasterCard Merchant Rules
          </a>
          , and{" "}
          <a href="https://www.pcisecuritystandards.org/">
            PCI compliance standards
          </a>
          ), and any Chadify policy or standard that may be issued from time to
          time.
        </p>

        <p>
          6.12 In the event you Promote or Deliver Digital Goods that contain
          personal information of any other individual, you must have provided
          any such notice to data subjects that may be required under applicable
          law and, to the extent required under applicable law, established a
          legal basis for your use of such personal data.
        </p>

        <h4>7. Return and Refund Policy</h4>

        <p>
          7.1 Chadify, in its sole and absolute discretion, will allow for a
          refund (partial or full; please see Section 7.3 below) of the Retail
          Price of any Digital Good purchased using the Platform within 60 days
          from the Buyer’s date of purchase for any of the following reasons:{" "}
        </p>

        <p>7.1.1 If the Digital Good violated Section 6.2;</p>

        <p>
          7.1.2 If the transaction for the Digital Good is proven to be
          fraudulent or unauthorized;
        </p>

        <p>
          7.1.3 In order for Chadify to comply with applicable industry or other
          contractual requirements (i.e. credit card industry, ACH, PayPal,
          Stripe, Zengin), applicable laws and regulations, and or requests from
          law enforcement or judiciary bodies; or
        </p>

        <p>7.1.4 For any reason Chadify deems appropriate.</p>

        <p>
          7.2 Upon issuance of a refund pursuant to Section 7.1, the full value
          of the refund will be debited against your Balance.{" "}
        </p>

        <p>
          7.3 Due to the nature of Digital Goods, when a Buyer requests a refund
          for a Digital Good, the Buyer may retain a copy of the Digital Good
          and, in many cases, will already have received a benefit from the
          Digital Good prior to issuance of the refund. In such cases, Chadify,
          in its sole and absolute discretion, may issue a refund for less than
          the full Retail Price of such Digital Good.
        </p>

        <p>
          7.4 It is the Buyer’s sole responsibility to appropriately handle,
          remove or destroy any Digital Good that may cause Buyer to: (i) incur
          additional liability, including, but not limited to, criminal and/or
          civil liability; or (ii) experience additional adverse effects,
          including, but not limited to, potential privacy, security, or
          technical vulnerabilities.
        </p>

        <h4>8. Availability of Services, Suspension and Termination</h4>

        <p>
          Subject to the terms and conditions of this Agreement and Chadify's
          policies and procedures, Chadify shall use commercially reasonable
          efforts to provide the Platform in a manner that will not disrupt your
          business. You acknowledge and agree that from time-to-time, the
          Platform may be inaccessible or inoperable for reasons including,
          without limitation: (i) equipment malfunctions; (ii) periodic
          maintenance procedures or repairs; or (iii) causes beyond the
          reasonable control of Chadify or that are reasonably unforeseeable by
          Chadify, including, without limitation, interruption or failure of
          telecommunication or digital transmission links, hostile network
          attacks, network congestion or other failures. You acknowledge and
          agree that Chadify is not liable for interruptions to the availability
          of the Platform and further acknowledge that Chadify does not
          guarantee access to the Platform on a continuous and uninterrupted
          basis.{" "}
        </p>

        <p>
          Chadify may decline, remove or halt sales of any Digital Good, suspend
          or terminate an Account, and/or suspend or terminate the Platform at
          any time, in its sole discretion, without cause or notice to you or
          any penalty or liability for doing so.{" "}
        </p>

        <p>
          Chadify, in its sole discretion, may suspend or terminate your
          Account(s), or retain any or all funds in your Balance, if Chadify
          suspects or has reason to believe and/or if a person otherwise claims
          that you have violated the law or breached any term of this Agreement.
          In addition to the foregoing, and all other rights and remedies
          available to Chadify at law or in equity and notwithstanding anything
          in the Agreement to the contrary, in the event you breach any term of
          this Agreement, or your Account becomes dormant and/or has a negative
          Balance, Chadify will have the right to immediately suspend or
          terminate your Account and your rights to access, use and/or otherwise
          participate in the Platform. Upon such termination, you agree to
          immediately cease all use of the Platform. Without limiting the
          foregoing, Chadify shall have the right to immediately terminate your
          access and use of the Platform, or any portion thereof, in the event
          of any conduct that Chadify, in its sole discretion, considers
          unacceptable. Following suspension or termination of an Account or
          retaining of funds pursuant to this Section, Chadify will review your
          Account in a manner determined by Chadify in its sole discretion. You
          agree to cooperate with this review if asked. If the review concludes
          that there is a reasonable basis to believe misconduct has occurred,
          you agree that Chadify may retain funds in your Chadify Account as
          liquidated damages and/or for the benefit of Chadify or third parties
          affected by the misconduct. You acknowledge and agree that such
          liquidated damages: (i) are not a penalty, and (ii) are reasonable and
          not disproportionate to such presumed damages to Chadify.{" "}
        </p>

        <p>
          Chadify may temporarily withhold any portion of the funds in your
          Account if Chadify, in its sole discretion, determines such action is
          necessary to secure payment for, performance of, and/or assurances
          regarding any liabilities, obligations, or indebtedness you may have
          incurred with Chadify or any Buyer. If you maintain a refund rate in
          excess of 15%, you agree that we may retain an amount equal to 25% of
          your current Balance for 90 days on a rolling basis to cover the cost
          of refunds. If you maintain a refund rate significantly above this
          amount, your Account may be subject to additional fees.{" "}
        </p>

        <h4>9. Marketing Restrictions</h4>

        <p>
          9.1 CAN-SPAM Act. If you send emails, directly or indirectly, in
          connection with any Digital Good, then you agree, acknowledge,
          represent and warrant that all such emails, and procurement of email
          addresses thereto, shall be in compliance with all applicable federal,
          state, and international laws and regulations regarding the use of
          electronic messages, including without limitation the Controlling the
          Assault of Non-Solicited Pornography and Marketing Act and the
          Children's Online Privacy Protection Act.{" "}
        </p>

        <p>
          9.2 Telephone Consumer Protection Act. If you send, initiate or
          procure a “call” (as that term is defined by the Telephone Consumer
          Protection Act), directly or indirectly, in connection with any
          Digital Good, you agree, acknowledge, represent and warrant that you
          have obtained all necessary consents and authorizations under, and
          will be in full compliance with, applicable laws and regulations,
          including without limitation regulations issued by the Federal Trade
          Commission, Federal Communications Commission, and state laws related
          to anti-spam, text messages and Do-Not-Call Registries.
        </p>

        <h4>10. Chadify's IP Rights</h4>

        <p>
          Except as expressly permitted by Section 10.1 below, you may not use
          Chadify's name, trademarks, service marks or any other IP Right of
          Chadify in any manner whatsoever to suggest association or affiliation
          with or endorsement by Chadify without the express prior written
          consent of Chadify, which Chadify may withhold at its sole discretion.{" "}
        </p>

        <p>
          10.1 Permissible Uses of Chadify IP Right. Subject to the following
          terms and conditions, Chadify grants you a limited, revocable license
          to use Chadify's name pursuant to the following usage guidelines (and
          other expressly permitted guidelines, as may be the case in the
          future) in connection with such use: (i) as a watermark, Internet
          search engine description, keyword, search term or seeding element
          with any Internet search engines or keyword-triggered advertising
          programs; and (ii) in metatags or hidden text, in each case solely for
          the purpose of driving traffic to the Platform to Promote your Digital
          Good. Chadify may revoke the foregoing license and/or provide
          restrictions upon your use of Chadify's name, including requiring the
          use of such disclaimers as Chadify may provide, in connection with
          your use of Chadify's name, at any time and for any reason in
          Chadify's sole discretion.
        </p>

        <p>
          10.2 Reservation of Rights. Notwithstanding the limited revocable
          license in Section 10.1, as between the parties, Chadify shall be and
          remain the sole owner of all right, title and interest in and to the
          Platform (including, without limitation, all IP Rights therein) and
          any other IP Rights, materials or other properties owned, licensed or
          controlled by Chadify, and you hereby assign to Chadify all right,
          title and interest you may be deemed to have therein. Accordingly, any
          use of the IP Right of Chadify shall inure to the exclusive benefit of
          Chadify. All rights not specifically granted to you under this
          Agreement are expressly reserved by Chadify.{" "}
        </p>

        <h4>11. Confidentiality and Non-disclosure Obligations; Privacy</h4>

        <p>
          11.1 In connection with this Agreement, Chadify may disclose to you
          and/or you may otherwise receive or have access to sensitive,
          confidential, and/or proprietary information of Chadify (collectively,
          “Confidential Information”). Except as required to perform your
          obligations under and in accordance with the terms of this Agreement,
          you shall not disclose or use the Confidential Information, without
          the express prior written consent of Chadify. You may not use any
          Confidential Information for the purpose of soliciting, or to permit
          others to solicit, Users to subscribe to any other services or promote
          the sale of any products that compete, either directly or indirectly,
          with Chadify or the functionality and services offered by the
          Platform. You agree and acknowledge that Chadify may be required to
          provide to governmental agencies or other third parties information in
          its possession regarding you or the business you conduct with Chadify
          or via the Platform.{" "}
        </p>

        <p>
          11.2 Chadify does not invite and cannot accept any ideas or
          information you consider to be confidential and/or proprietary. Except
          with respect to your personally identifiable information (as expressly
          provided for in the Chadify Privacy Policy, any suggestions,
          submissions, comments, ideas, concepts, know-how, techniques material
          or feedback conveyed, offered or transmitted by you to Chadify, or
          otherwise in connection with the Platform (collectively, the
          “Submissions”), shall be deemed to be non- confidential and
          non-proprietary and Chadify shall have no obligation of any kind with
          respect to such Submissions, unless otherwise expressly agreed to in a
          writing executed by you and a duly authorized officer of Chadify. You
          hereby grant to Chadify and its licensees a worldwide, perpetual, non-
          exclusive, fully-paid, royalty-free, transferable right and license,
          with right to sublicense, to reproduce, publicly display, distribute,
          perform, transmit, edit, modify, create derivatives works of, publish,
          sell, commercially exploit, use, and disclose the Submissions for any
          purpose and in all forms and all media whether now known or to become
          known in the future. Chadify shall have no obligation to compensate
          you for any such Submissions in any manner. You hereby represent and
          warrant that: (a) you own or otherwise have the right to grant the
          foregoing license to Chadify with respect to your Submissions; and (b)
          your Submissions and any use thereof by Chadify will not infringe or
          violate the rights of any person. You are and shall remain solely
          responsible for the content of any Submissions you make and
          acknowledge that Chadify is under no obligation to respond to or use
          any Submission you may provide.{" "}
        </p>

        <p>
          11.3 In the event you Promote or Deliver Digital Goods through the
          Platform, you agree to provide any such disclosures as may required by
          applicable law pertaining to your privacy and/or data protection
          policy and practices, including, to the extent required, disclosures
          that adequately describe your use of the Platform.{" "}
        </p>

        <p>
          11.4 You agree that when you collect personal information about buyers
          through the Platform, including in connection with a purchase, you
          must provide the buyer a chance to remove themselves from your
          database and a chance to review what information you have collected
          about them. In addition, you agree that you will use personal
          information you receive through the Platform only for: Chadify
          transaction-related purposes that are not unsolicited commercial
          messages; using services offered through Chadify (such as shipping and
          fraud complaints), or other purposes that a User expressly chooses.
        </p>

        <p>
          11.5 You acknowledge and agree that when you use the Platform to send
          emails, we may automatically scan and may manually filter messages to
          check for spam, viruses, phishing attacks and other malicious activity
          or illegal or prohibited content, and we do not permanently store
          messages sent through these tools. If you send an e-mail to an e-mail
          address that is not registered in our community, we do not permanently
          store that e-mail or use that e-mail address for any marketing
          purpose. We do not rent or sell these e-mail addresses.
        </p>

        <p>
          11.6 If the EU General Data Protection Regulation (“GDPR”) applies to
          you in connection with your use of the Platform, upon your request,
          Chadify will make available a Data Protection Addendum (“DPA”)
          designed to meet the requirements of Article 28 of the GDPR pertaining
          to data processing. You may request Chadify’s DPA by emailing
          support@chadify.me. You agree not to collect any personal data through
          our Platform that may be governed by the GDPR before executing
          Chadify’s DPA. Notwithstanding the foregoing, if Chadify reasonably
          believes that your processing of personal data through the Platform is
          subject to the GDPR, Chadify may require you to execute its DPA as
          condition of your use, or continued use, of the Platform, and you
          authorize Chadify to take such remedial steps as may be warranted
          until such time as the DPA is executed{" "}
        </p>

        <h4>12. Export Control</h4>

        <h4>13. PCI DSS Applicability and Requirement</h4>

        <p>
          Chadify, to the extent it is a Service Provider (as that term is
          defined and/or used by the then-current Payment Card Industry (PCI)
          Data Security Standard v3.0), shall be responsible for the security of
          cardholder data, which may include primary account number (PAN),
          cardholder name, expiration date, and service code, it possesses or
          otherwise stores, processes, or transmits.
        </p>

        <h4>14. Required Permits</h4>

        <p>
          It is your sole responsibility to obtain and maintain all applicable
          consents, licenses and permits required for the operation of your
          business.{" "}
        </p>

        <h4>15. Indemnification</h4>

        <p>
          In the event a third party makes any demand or complaint, or commences
          any action or files any claim whatsoever (each, a “Claim”) in
          connection with your use of the Platform, including without limitation
          your activities to Promote and/or Deliver Digital Goods, you shall
          defend, indemnify and hold harmless Chadify, its related parties and
          affiliates, and its officers, directors, employees, representatives,
          agents, licensors, attorneys, heirs, successors, and assignees (each,
          a “Chadify Party”; and collectively, the “Chadify Parties”), from and
          against any and all damages, liabilities, claims or costs (including
          the costs of investigation, defense, litigation, and reasonable
          attorneys' fees and costs) (“Losses”) incurred by any Chadify Party as
          a result of such Claim, regardless of whether such Losses are direct,
          incidental, consequential, punitive or statutory.{" "}
        </p>

        <p>
          Upon receiving notice of a Claim for which Chadify is entitled to
          indemnification by you, Chadify shall provide you with written
          notification and the opportunity to assume sole control over the
          defense or settlement of the Claim and reasonable assistance to settle
          and/or defend the Claim at your sole expense; provided, however, that
          (i) any settlement which would impose a non-monetary obligation on
          and/or admission or finding of liability or wrongdoing by Chadify will
          require Chadify's prior written consent; (ii) the failure to provide
          timely notice, control, or assistance shall not relieve you of your
          indemnification obligations; and (iii) Chadify may have its own
          counsel present at and participating in all proceedings or
          negotiations relating to a Claim, at Chadify's own expense, unless you
          fail or refuse to secure legal counsel to defend any Claim in a timely
          manner, in which case you shall pay all expenses related to Chadify's
          use of such counsel.{" "}
        </p>

        <p>
          In the event that Chadify incurs costs, attorneys' fees or other
          expenses responding to any complaint other than a Claim, in connection
          with or in relation to your Digital Goods (or your activities to
          Promote and/or Deliver thereto), including copyright infringement
          complaints under the DMCA (see below), Chadify reserves the right, in
          its sole discretion, to recover such costs and expenses by deducting a
          reasonable, commensurate amount from any monies owed to you by Chadify
          up to a maximum of ten thousand dollars ($10,000) per event. In the
          event that Chadify incurs any Losses relating to your violation of
          Section 9 (Marketing Restrictions) above, Chadify reserves the right,
          in its sole discretion, first to recover such Losses by deducting a
          reasonable, commensurate amount from any monies owed to you by Chadify
          up to a maximum of twenty thousand dollars ($20,000) per event. You
          understand and agree that the remedies set forth above are not
          exhaustive and that Chadify retains all rights to indemnification
          described herein. You authorize Chadify to make, and release Chadify
          from any liability in connection with, any such deductions.{" "}
        </p>

        <h4>16. Limitation of Liability</h4>

        <p>
          In no event shall any Chadify party, or its heirs, successors and
          assigns, be liable for any indirect, incidental, special, punitive, or
          consequential damages whatsoever arising out of, resulting from, or in
          connection with this agreement and/or any (a) use of or inability to
          use the platform, (b) personal injury, property damage, or losses of
          any kind, resulting from your access to and/or use of the platform,
          (c) unauthorized access to or use of any and all personal information
          and/or financial information stored therein, (d) interruption or
          cessation of transmission to or from the platform, and/or (e) bugs,
          viruses, trojan horses, or the like, which may be transmitted to or
          through the platform, whether or not Chadify is advised of the
          possibility of such damages. Notwithstanding anything herein to the
          contrary, the maximum cumulative and aggregate liability of Chadify
          for all costs, losses or damages from claims arising under or related
          in any way to this agreement, whether in contract, tort or otherwise,
          shall not exceed an amount equal to the total amounts due and payable
          by Chadify to you under this agreement for the month immediately
          preceding the date upon which such damages accrue. The limitation of
          liability herein is a fundamental element of the basis of the bargain
          and reflects a fair allocation of risk. The platform, and any services
          or information offered through or in association with the platform,
          would not be provided without such limitations and you agree that the
          limitations of liability and disclaimers specified herein will survive
          and apply even if found to have failed of their essential purpose.
          Because some jurisdictions do not allow the exclusion or limitation of
          certain categories of damages, in such jurisdictions, you agree that
          the liability of Chadify shall be limited to the fullest extent
          permitted by such jurisdiction.{" "}
        </p>

        <h4>17. No Guarantee of Validity</h4>

        <p>
          Chadify does not endorse, approve, or certify any information provided
          on or through the Platform, nor does it guarantee the accuracy,
          completeness, efficacy, timeliness, or correct sequencing of such
          information. Information provided on or through the Platform may or
          may not be current as of the date of your access, and Chadify has no
          duty to update and maintain such information. Additionally, the
          information provided on or through the Platform may be changed
          periodically without prior notice. All content provided on or through
          the Platform is provided "AS IS." Use of such information is
          voluntary, and reliance on it should only be undertaken after an
          independent review of its accuracy, completeness, efficacy, and
          timeliness. If you have a dispute with one or more users, including
          any users that has purchased items from you as a Buyer or any user
          from whom you have purchased a Digital Good, you release us (and our
          officers, directors, agents, subsidiaries, joint ventures and
          employees) from claims, demands and damages (actual and consequential)
          of every kind and nature, known and unknown, arising out of or in any
          way connected with such disputes.{" "}
        </p>

        <p>
          YOU ARE SOLELY RESPONSIBLE FOR ALL OF YOUR COMMUNICATIONS AND
          INTERACTIONS WITH OTHER USERS OF THE PLATFORM. YOU UNDERSTAND THAT
          Chadify DOES NOT MAKE ANY ATTEMPT TO VERIFY THE STATEMENTS OF USERS OF
          THE PLATFORM.
        </p>

        <h4>18. Disclaimer</h4>

        <p>
          Chadify MAKES NO WARRANTY, REPRESENTATION OR CONDITION THAT: (1) THE
          PLATFORM WILL MEET YOUR REQUIREMENTS; (2) YOUR USE OF THE PLATFORM
          WILL BE UNINTERRUPTED, TIMELY, SECURE OR ERROR-FREE; (3) THE RESULTS
          THAT MAY BE OBTAINED FROM USE OF THE PLATFORM WILL BE ACCURATE OR
          RELIABLE; OR (4) ANY ERRORS IN THE PLATFORM WILL BE CORRECTED. ANY
          CONTENT DOWNLOADED FROM OR OTHERWISE OBTAINED THROUGH THE PLATFORM IS
          ACCESSED AT YOUR OWN RISK, AND YOU SHALL BE SOLELY RESPONSIBLE FOR ANY
          DAMAGE TO YOUR PROPERTY OR PERSON, INCLUDING, BUT NOT LIMITED TO, YOUR
          COMPUTER SYSTEM AND ANY DEVICE YOU USE TO ACCESS THE PLATFORM, OR ANY
          OTHER LOSS THAT RESULTS FROM ACCESSING SUCH CONTENT.
        </p>

        <h4>19. Legal Disputes</h4>

        <p>
          If a dispute arises between you and Chadify, our goal is to provide
          you with a neutral and cost-effective means of resolving the dispute
          quickly. Accordingly, you and Chadify agree that we will resolve any
          claim or controversy at law or equity that arises out of this
          Agreement or our services in accordance with one of the subsections
          below or as we and you otherwise agree in writing. Before resorting to
          these alternatives, we strongly encourage you to first contact us
          directly by email at support@chadify.me to seek a resolution. We will
          consider reasonable requests to resolve the dispute through
          alternative dispute resolution procedures, such as mediation or
          arbitration, as alternatives to litigation.{" "}
        </p>

        <p>
          This Agreement shall be governed in all respects by the laws of the
          Vestland fylkeskommune as they apply to agreements entered into and to
          be performed entirely within Vestland between Vestland residents,
          without regard to conflict of law provisions. You agree that any claim
          or dispute you may have against Chadify must be resolved exclusively
          by a state or federal court located in Vestland fylkeskommune, Norge,
          except as otherwise agreed by the parties or as described in the
          Arbitration Option paragraph below. You agree to submit to the
          personal jurisdiction of the courts located within Vestland
          fylkeskommune, Norge for the purpose of litigating all such claims or
          disputes.{" "}
        </p>

        <p>
          For any claim (excluding claims for injunctive or other equitable
          relief) where the total amount of the award sought is less than
          $10,000, the party requesting relief may elect to resolve the dispute
          in a cost- effective manner through binding non-appearance-based
          arbitration. In the event a party elects arbitration, they shall
          initiate such arbitration through an established alternative dispute
          resolution (“ADR”) provider mutually agreed upon by the parties. The
          ADR provider and the parties must comply with the following rules: (i)
          the arbitration shall be conducted by telephone, online and/or be
          solely based on written submissions, the specific manner shall be
          chosen by the party initiating the arbitration; (ii) the arbitration
          shall not involve any personal appearance by the parties or witnesses
          unless otherwise mutually agreed by the parties; and (iii) any
          judgment on the award rendered by the arbitrator may be entered in any
          court of competent jurisdiction{" "}
        </p>

        <p>
          All claims you bring against Chadify must be resolved in accordance
          with this Legal Disputes Section. All claims filed or brought contrary
          to the Legal Disputes Section shall be considered improperly filed.
          Should you file a claim contrary to the Legal Disputes Section,
          Chadify may recover attorneys' fees and costs up to $1,000, provided
          that Chadify has notified you in writing of the improperly filed
          claim, and you have failed to promptly withdraw the claim.{" "}
        </p>

        <h4>20. Digital Millennium Copyright Act Notice</h4>

        <p>
          If you believe that your copyrighted work has been copied in a way
          that constitutes copyright infringement and is accessible on or
          through the Platform, please notify Chadify’s copyright agent, as set
          forth in the Digital Millennium Copyright Act of 1998 (“DMCA”). For
          your complaint to be valid under the DMCA, you must provide the
          following information in writing:{" "}
        </p>

        <ul>
          <li>
            <p>
              A physical or electronic signature of a person authorized to act
              on behalf of the owner of an exclusive right that is allegedly
              infringed;
            </p>
          </li>
          <li>
            <p>
              Identification of the copyrighted work claimed to have been
              infringed, or, if multiple copyrighted works at a single online
              site are covered by a single notification, a representative list
              of such works at that site;
            </p>
          </li>
          <li>
            <p>
              Identification of the material that is claimed to be infringing or
              to be the subject of infringing activity and that is to be removed
              or access to which is to be disabled, and information reasonably
              sufficient to permit Chadify to locate the material;
            </p>
          </li>
          <li>
            <p>
              Information reasonably sufficient to permit Chadify to contact the
              complaining party, such as an address, telephone number, and, if
              available, an electronic mail address at which the complaining
              party must be contacted;
            </p>
          </li>
          <li>
            <p>
              A statement that the complaining party has a good faith belief
              that use of the material in the manner complained of is not
              authorized by the copyright owner, its agent, or the law; and
            </p>
          </li>
          <li>
            <p>
              A statement that the information in the notification is accurate,
              and under penalty of perjury, that the complaining party is
              authorized to act on behalf of the owner of an exclusive right
              that is allegedly infringed.
            </p>
          </li>
        </ul>

        <p>
          The above information must be submitted to the following address:{" "}
        </p>

        <p>
          Nyborg-Christensen Fitness.
          <br />
          Attention: Chadify Copyright Agent
          <br />
          Lindane 25, 6899 Balestrand <br />
          NORWAY
        </p>
        <p>
          Only DMCA notices mailed to the address above or emailed to
          support@chadify.me will be accepted. All other inquiries or requests
          will be discarded. Upon receiving a complaint related to copyright
          infringement, Chadify may remove the content identified as being
          infringing. In addition, Chadify may, but is under no obligation to,
          terminate the Account of the party that appears to be the infringer.
        </p>
        <h4>21. Survival.</h4>
        <p>
          The following Sections survive any termination of this Agreement: 1,
          3.1.1, 4, 5.1, 5.3, 6.9, 6.10, 7.2, 8, 10, 11, and 14 through 33.
        </p>
        <h4>22. No Agency.</h4>
        <p>
          No agency, partnership, joint venture, employee-employer or
          franchiser-franchisee relationship is intended or created by this
          Agreement.{" "}
        </p>
        <h4>24. Governing Language</h4>
        <p>
          This Agreement is in English and all disputes between the parties
          shall be resolved in English. You understand and acknowledge that any
          foreign language services provided by Chadify are for informational
          purposes only and it is your obligation to obtain independent legal
          advice at your own expense to ensure you understand the terms of this
          Agreement.{" "}
        </p>
        <h4>25. Assignment</h4>
        <p>
          Chadify may freely assign or transfer any or all of the rights and
          obligations described in this Agreement, or this Agreement in its
          entirety in connect with a merger, acquisition, or sale of assets or
          by operation of law or otherwise. You may not assign this Agreement or
          any of your rights and duties hereunder without the prior written
          consent of Chadify. This Agreement shall be binding upon and inure to
          the benefit of the parties hereto and their respective successors and
          assigns.{" "}
        </p>
        <h4>26. Severability</h4>
        <p>
          If any provision of this Agreement is determined by a court to be
          unenforceable or invalid, the validity of the remaining parts, terms
          or provisions shall not be affected by that determination, and such
          court shall substitute a provision that is legal and enforceable and
          is as close to the intentions underlying the original provision as
          possible.{" "}
        </p>
        <h4>27. Publicity</h4>
        <p>
          You may not issue or make any publicity release (including press
          releases and advertising or solicitation materials) or other public
          statement: (i) relating to this Agreement; (ii) using Chadify's name
          or referencing the Platform; or (iii) suggesting or implying any
          endorsement by Chadify of you and/or any Digital Goods without the
          prior written approval of Chadify, which Chadify may withhold in its
          sole discretion.{" "}
        </p>
        <h4>28. Entire Agreement</h4>
        <p>
          This Agreement constitutes the complete and exclusive agreement
          between the parties relating to the subject matter hereof. It
          supersedes all prior proposals, understandings and all other
          agreements, oral and written, between the parties relating to this
          subject matter.{" "}
        </p>
        <h4>29. Waiver</h4>
        <p>
          The waiver or failure by Chadify to exercise any right provided for
          herein will not be deemed a waiver of any further right hereunder. The
          rights and remedies of Chadify set forth in this Agreement are
          cumulative and are in addition to any rights or remedies Chadify may
          otherwise have at law or equity, except with respect to any sole and
          exclusive remedies expressly provided for herein.{" "}
        </p>
        <h4>30. Equitable Actions</h4>
        <p>
          You acknowledge and agree that any breach or threatened breach of this
          Agreement may cause immediate and irreparable harm to Chadify which
          would not be adequately compensated by monetary damages and that
          Chadify may seek injunctive relief, specific performance, and/or other
          equitable relief as a remedy for any such breach or anticipated breach
          without the necessity of posting a bond or other security.
          Notwithstanding any other provision of this Agreement, any such relief
          may be sought in the state or federal courts of the Vestland
          fylkeskommune or any other court of competent jurisdiction anywhere in
          the world (at Chadify's sole discretion), and, you hereby consent to
          the jurisdiction of any such court and waive any objection to venue
          laid therein. Any such relief shall be in addition to and not in lieu
          of any appropriate relief in the way of monetary damages.{" "}
        </p>
        <h4>31. Force Majeure</h4>
        <p>
          Neither you nor Chadify shall be responsible for delays or failures in
          performance resulting from acts of God, strikes, lockouts, riots, acts
          of war and terrorism, embargoes, boycotts, changes in governmental
          regulations, epidemics, fire, communication line failures, power
          failures, earthquakes, other disasters or any other reason where
          failure to perform is beyond the control of, and not caused by, the
          non-performing party.{" "}
        </p>
        <h4>32. Notices</h4>
        <p>
          Any notice, request, approval, authorization, consent, demand or other
          communication required or permitted pursuant to this Agreement shall
          be in writing and shall be deemed given on the earliest of: (a) actual
          receipt, irrespective of the method of delivery; (b) the time of
          transmission from Chadify if sent via email, as date stamped by
          Chadify's systems; (c) on the delivery day following dispatch if sent
          by express mail (or similar next day air courier service); or (d) on
          the sixth (6th) day after mailing by registered or certified United
          States mail, return receipt requested, postage prepaid and addressed
          to the last address provided by a party.{" "}
        </p>
        <p>Notices to Chadify shall be delivered to:</p>
        <p>
          Nyborg-Christensen Fitness.
          <br />
          Lindane 25, 6899 Balestrand
          <br />
          NORWAY
        </p>

        <h4>33. Headings/Interpretation</h4>

        <p>
          The section headings are for convenience only and shall not control or
          affect the meaning or construction of any provision of this Agreement.
          Any graphics or annotations provided in connection with this Agreement
          are for illustration purposes only and do not constitute part of the
          Agreement and changing a graphic does not qualify as a change to this
          Agreement. The list of Prohibited Products and Activities is
          separately maintained, and modifications thereto will not qualify as a
          change to this Agreement.
        </p>
      </div>
    </>
  );
};

export default TermsAndConditions;
