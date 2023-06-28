import type { NextApiRequest, NextApiResponse } from 'next';
import { google as Google } from 'googleapis';

const email = async (req: NextApiRequest, res: NextApiResponse) => {
  // Parse the request body for the email and name
  const { customerEmail } = req.body;
  let data = {
    customerFirstName: req.body.customerFirstName,
    carrierName: req.body.carrierName,
    adbProviderName: req.body.adbProviderName,
    monthlyGrandTotal: req.body.monthlyGrandTotal,
    planSummaryLink: req.body.planSummaryLink,
    adbInformationalLink: req.body.adbInformationalLink,
    agentFullName: req.body.agentFullName,
    agentPhoneNumberHref: req.body.agentPhoneNumberHref,
    agentPhoneNumberPretty: req.body.agentPhoneNumberPretty,
    agentEmail: req.body.agentEmail,
    agentLicenseNumber: req.body.agentLicenseNumber,
  };

  // Load the service account key
  const privateKey = {
    client_email: process.env.SERVICE_WORKER_EMAIL || '',
    private_key: (process.env.GMAIL_API_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  };
  const auth = new Google.auth.JWT(
    privateKey.client_email,
    undefined,
    privateKey.private_key,
    ['https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/gmail.compose'],
    'healthcare@10sa.org',
  );
  const gmail = Google.gmail({ version: 'v1', auth });

  let emailTemplate = `<div>
  <style type="text/css">
    /* start reset */
    div {
      line-height: 1;
    }
    body,
    table,
    td,
    p,
    a,
    li,
    blockquote {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    body {
      -webkit-text-size-adjust: none;
      -ms-text-size-adjust: none;
    }
    table {
      border-spacing: 0;
    }
    table,
    td {
      mso-table-lspace: 0;
      mso-table-rspace: 0;
    }
    img {
      -ms-interpolation-mode: bicubic;
    }
    body {
      margin: 0;
      padding: 0;
    }
    img {
      border: none !important;
      height: auto;
      line-height: 1;
      outline: none;
      text-decoration: none;
    }
    table td {
      border-collapse: collapse !important;
    }
    body,
    p {
      height: 100% !important;
      width: 100% !important;
    }
    .preheader {
      display: none !important;
      visibility: hidden;
      opacity: 0;
      color: transparent;
      height: 0;
      width: 0;
    }
    /*end reset*/
    @media only screen and (max-device-width: 480px) {
      table#tenSA,
      table#tenSA table {
        position: relative;
      }
      table#tenSA .header {
        max-width: 480px !important;
      }
      table#tenSA .template_image {
        height: auto !important;
        max-width: 480px !important;
        width: 100% !important;
        margin: 0 !important;
      }
      table#tenSA .content_container .image_display {
        margin-left: 0 !important;
      }
      table#tenSA .container-fill {
        max-width: 480px !important;
      }
      .main-table,
      .main-footer,
      .mobile-footer,
      .mobile-tagline,
      table#tenSA #table-cells {
        width: 100% !important;
        min-width: 100% !important;
        max-width: 480px !important;
      }
      table#tenSA .tablecell {
        width: 100% !important;
        display: block !important;
      }
      table#tenSA p,
      table#tenSA .gd_p,
      table#tenSA li {
        font-size: 13pt !important;
      }
      table#tenSA h1 {
        font-size: 18pt !important;
      }
      table#tenSA h2 {
        font-size: 16pt !important;
      }
      table#tenSA h3 {
        font-size: 14pt !important;
      }
      table#tenSA #table-right h1,
      table#tenSA #table-right h2,
      table#tenSA #table-right h3,
      table#tenSA #table-2-right h1,
      table#tenSA #table-2-right h2,
      table#tenSA #table-2-right h3,
      table#tenSA #table-3-right h1,
      table#tenSA #table-3-right h2,
      table#tenSA #table-3-right h3,
      table#tenSA #table-4-right h1,
      table#tenSA #table-4-right h2,
      table#tenSA #table-4-right h3 {
        font-size: 13pt !important;
      }
      #table-cells-padding {
        padding: 0 10px 0 10px !important;
      }
      #table-cells {
        width: 100% !important;
      }
      table#tenSA #table-left,
      table#tenSA #table-2-left,
      table#tenSA #table-3-left,
      table#tenSA #table-4-left,
      table#tenSA #table-5-left {
        padding-bottom: 5px !important;
      }
      .main-footer,
      .main-footer table {
        width: 100% !important;
        max-width: 480px !important;
      }
      .main-footer .main-footer-left {
        width: 100% !important;
      }
      .main-footer .main-footer-right {
        width: 0 !important;
      }
      .main-footer img.hide,
      .main-footer td.hide {
        display: none !important;
        width: 0;
        height: auto;
      }
      .main-footer .hide {
        display: none !important;
      }
      .mobile-hide {
        display: none !important;
      }
    }
  </style>
  <table
    class="gd_tbl_wrap"
    align="center"
    border="0"
    cellspacing="0"
    cellpadding="0"
    width="100%"
  >
    <tbody>
      <tr>
        <td
          bgcolor="#f0f0f1"
          style="
            line-height: 1.4;
            background: #f0f0f1;
            margin: 0;
            padding: 20px 0 0 0;
          "
        >
          <table
            style="border-collapse: collapse; margin: 0 auto; width: 600px"
            id="tenSA"
            cellspacing="0"
            cellpadding="0"
            align="center"
            width="600"
            class="main-table"
          >
            <tbody>
              <tr valign="top">
                <td
                  style="
                    border-top-width: 5px;
                    border-top-color: #0d76ad;
                    border-top-style: solid;
                  "
                  valign="top"
                >
                  <table
                    style="
                      border-collapse: collapse;
                      background: #fff;
                      margin: 0 auto;
                    "
                    bgcolor="#FFFFFF"
                    cellspacing="0"
                    cellpadding="0"
                    align="left"
                    width="600"
                    class="main-table"
                  >
                    <tbody>
                      <tr valign="top">
                        <td
                          align="left"
                          class="mobile-hide"
                          valign="top"
                          width="27%"
                        >
                          <table
                            style="
                              border-collapse: collapse;
                              table-layout: auto;
                              margin: 0 auto;
                            "
                            valign="top"
                            cellspacing="0"
                            cellpadding="0"
                            align="left"
                            width="100%"
                          >
                            <tbody>
                              <tr valign="top">
                                <td
                                  width="100%"
                                  id="header-left"
                                >
                                  <a
                                    rel="noopener noreferrer"
                                    href="https://www.10sa.life/"
                                    ><img
                                      height="57"
                                      width="163"
                                      style="border: none"
                                      src="https://lh3.googleusercontent.com/u/7/drive-viewer/AFGJ81pNOXtLmGYqiarsnH7xe_YrnIHKsbVMHWKCn2cZNFkVbhB2z_KrLBqqa_OohgZuQygJ9VmhvgnHlAFFvENd06krQZb9_Q=w1341-h1297"
                                      class="template_image"
                                  /></a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td
                          align="left"
                          class="tablecell"
                          valign="top"
                          width="46%"
                        >
                          <table
                            style="
                              border-collapse: collapse;
                              table-layout: auto;
                              margin: 0 auto;
                            "
                            valign="top"
                            cellspacing="0"
                            cellpadding="0"
                            align="left"
                            width="100%"
                          >
                            <tbody>
                              <tr valign="top">
                                <td
                                  width="100%"
                                  id="main-header"
                                >
                                  <table
                                    style="
                                      border-collapse: collapse;
                                      table-layout: auto;
                                      margin: 0 auto;
                                    "
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    width="100%"
                                  >
                                    <tbody>
                                      <tr>
                                        <td align="center">
                                          <a
                                            rel="noopener noreferrer"
                                            href="https://www.10sa.life/"
                                            ><img
                                              alt="10 Steps Ahead: "
                                              height="auto"
                                              width="225"
                                              style="
                                                border: none;
                                                margin: 10px 0;
                                              "
                                              src="https://lh3.googleusercontent.com/u/7/drive-viewer/AFGJ81qcC1-mDv6FeYpA1uwAB3xHk93CiPrW-eXCCbEHtom_Y9PRsGQzpB9lg5OoysRTufH6DZWqqgF6IZChZgODgEyoA0SI=w603-h1297"
                                              class="template_image"
                                          /></a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td
                          align="left"
                          class="mobile-hide"
                          valign="top"
                          width="27%"
                        >
                          <table
                            style="
                              border-collapse: collapse;
                              table-layout: auto;
                              margin: 0 auto;
                            "
                            valign="top"
                            cellspacing="0"
                            cellpadding="0"
                            align="left"
                            width="100%"
                          >
                            <tbody>
                              <tr valign="top">
                                <td
                                  width="100%"
                                  id="header-right"
                                >
                                  <a
                                    rel="noopener noreferrer"
                                    href="https://www.10sa.life/"
                                    ><img
                                      height="57"
                                      width="161"
                                      style="border: none"
                                      src="https://lh3.googleusercontent.com/u/7/drive-viewer/AFGJ81pNOXtLmGYqiarsnH7xe_YrnIHKsbVMHWKCn2cZNFkVbhB2z_KrLBqqa_OohgZuQygJ9VmhvgnHlAFFvENd06krQZb9_Q=w1341-h1297"
                                      class="template_image"
                                  /></a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  bgcolor="#04689b"
                  style="padding-bottom: 6px; background: #04689b"
                >
                  <table
                    style="
                      border-collapse: collapse;
                      margin: 0 auto;
                    "
                    cellspacing="0"
                    cellpadding="0"
                    align="center"
                    width="600"
                    class="main-table"
                  >
                    <tbody>
                      <tr>
                        <td
                          style="
                            background: #0d76ad;
                            padding: 20px 50px;
                          "
                          width="100%"
                          id="main-headline"
                        >
                          <h1
                            align="center"
                            style="
                              text-align: center;
                              line-height: 1.1;
                              font-weight: normal;
                              color: #ffffff;
                              font-family: arial, helvetica, sans-serif;
                              font-size: 38px;
                              margin: 0;
                              padding: 0;
                            "
                          >
                            Know Your Benefits
                          </h1>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table
                    style="
                      border-collapse: collapse;
                      margin: 0 auto;
                    "
                    cellspacing="0"
                    cellpadding="0"
                    align="center"
                    width="600"
                    class="main-table"
                  >
                    <tbody>
                      <tr>
                        <td
                          style="
                            background: #ffffff;
                            padding: 30px 20px 20px 20px;
                          "
                          width="100%"
                          id="sub-headline-body"
                        >
                          <p
                            align="left"
                            style="
                              text-align: left;
                              line-height: 1.4;
                              color: #333333;
                              font-family: arial, helvetica, sans-serif;
                              font-size: 17px;
                              margin: 0 0 15px 0;
                              padding: 0;
                            "
                            class="gd_p"
                          >
                            Hello ${data.customerFirstName},
                          </p>
                          <p
                            align="left"
                            style="
                              text-align: left;
                              line-height: 1.4;
                              color: #333333;
                              font-family: arial, helvetica, sans-serif;
                              font-size: 17px;
                              margin: 0 0 15px 0;
                              padding: 0;
                            "
                            class="gd_p"
                          >
                            <strong>Congratulations</strong> on your
                            <strong>new insurance coverage</strong> and the
                            peace of mind it will provide! I am glad we were
                            able to find you some great coverage options that
                            best suit your specific needs.
                          </p>
                          <p
                            align="left"
                            style="
                              text-align: left;
                              line-height: 1.4;
                              color: #333333;
                              font-family: arial, helvetica, sans-serif;
                              font-size: 17px;
                              margin: 0 0 15px 0;
                              padding: 0;
                            "
                            class="gd_p"
                          >
                            Your health insurance coverage will
                            be provided to you by ${data.carrierName}, your life insurance &
                            death benefit by ${data.adbProviderName}. These are two separate
                            independent coverages with unique benefits. One for
                            your health coverage (${data.carrierName}), and another for your
                            life insurance & death benefit (${data.adbProviderName}).
                            <strong
                              >The charges will be ${data.monthlyGrandTotal} a month </strong>
                              as discussed.
                          </p>
                          <p
                            align="left"
                            style="
                              text-align: left;
                              line-height: 1.4;
                              color: #333333;
                              font-family: arial, helvetica, sans-serif;
                              font-size: 17px;
                              margin: 0 0 20px 0;
                              padding: 0;
                            "
                            class="gd_p"
                          >
                            Below will be the summary of benefits provided for
                            your
                            <strong>${data.carrierName}</strong> healthcare plan, and
                            <a ref="noreferrer" target="_blank" href="${data.adbInformationalLink}">
                              <strong>click here for ${data.adbProviderName} information.</strong>
                            </a>
                          </p>
                          <table
                            style="
                              border-collapse: collapse;
                              table-layout: auto;
                              margin: 0 auto;
                            "
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                            width="100%"
                          >
                            <tbody>
                              <tr>
                                <td align="center">
                                  <a
                                    style="
                                      color: #0000ee;
                                      text-decoration: underline;
                                      -ms-word-break: break-all;
                                      word-break: break-word;
                                      -webkit-hyphens: none;
                                      -moz-hyphens: none;
                                      hyphens: none;
                                    "
                                    rel="noopener noreferrer"
                                    href="${data.planSummaryLink}"
                                    target="_blank"
                                    ><img
                                      alt="View Summary Button"
                                      height="auto"
                                      width="305"
                                      style="border: none"
                                      src="https://lh3.googleusercontent.com/u/7/drive-viewer/AFGJ81ppXU9GX8NoV-atKCKlAEK2_ZV2qDj1wByakbSJ94GJ6mWWfwim3xxuGjplVM3s9EHTLuQUgQEUe-HYSlJ8UR_klhaG=w1205-h1206"
                                      class="template_image"
                                  /></a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <p
                            align="left"
                            style="
                              text-align: left;
                              line-height: 1.4;
                              color: #333333;
                              font-family: arial, helvetica, sans-serif;
                              font-size: 17px;
                              margin: 50px 0 25px 0;
                              padding: 0;
                            "
                            class="gd_p"
                          >
                            Now that we have entered your coverage into the
                            system, you will be receiving various automated
                            emails from HealthSherpa, please disregard them, as
                            we will be taking care of everything on your behalf.
                            For any further questions, comments, or concerns,
                            please feel free to reach out to your agent whenever
                            necessary, their contact information is below.
                          </p>
                          <p
                            align="left"
                            style="
                              text-align: left;
                              line-height: 1.4;
                              color: #333333;
                              font-family: arial, helvetica, sans-serif;
                              font-size: 17px;
                              margin: 0 0 15px 0;
                              padding: 0;
                            "
                            class="gd_p"
                          >
                            <strong>Agent Name: </strong><span>${data.agentFullName}</span>
                            <br />
                            <strong>Phone: </strong><span><a href="tel:${data.agentPhoneNumberHref}">${data.agentPhoneNumberPretty}</a></span>
                            <br />
                            <strong>Email: </strong><span><a href="mailto:${data.agentEmail}">${data.agentEmail}</a></span>
                            <br />
                            <strong>NPN: </strong><span>${data.agentLicenseNumber}</span>
                            <br />
                          </p>
                          <p
                            align="left"
                            style="
                              text-align: left;
                              line-height: 1.5;
                              color: #333333;
                              font-family: arial, helvetica, sans-serif;
                              font-size: 15px !important;
                              margin: 0 0 15px 0;
                              padding: 0;
                            "
                            class="gd_p"
                          >
                            <em>The Health Care Team</em>
                            <br />
                            <em>10SA Insurance</em>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table
                    style="
                      border-collapse: collapse;
                      margin: 0 auto;
                    "
                    cellspacing="0"
                    cellpadding="0"
                    align="center"
                    width="600"
                    class="main-table"
                  >
                    <tbody>
                      <tr>
                        <td
                          style="
                            background: #0d76ad;
                            padding: 20px;
                          "
                          width="100%"
                          id="main-footer"
                        ></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr valign="top">
                <td
                  valign="top"
                  style="border-collapse: collapse"
                >
                  <table
                    class="mobile-footer"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    style="border-collapse: collapse; margin: 0 auto"
                    width="600"
                  >
                    <tbody>
                      <tr valign="top">
                        <td
                          valign="top"
                          align="center"
                          style="padding: 30px 0"
                        >
                          <table
                            align="left"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                            style="border-collapse: collapse; margin: 0 auto"
                            width="100%"
                          >
                            <tbody>
                              <tr valign="center">
                                <td
                                  width="50"
                                  valign="center"
                                  align="center"
                                  style="border-collapse: collapse"
                                  class="main-footer-right"
                                >
                                  <img
                                    alt="Legal Disclaimer"
                                    style="display: block; border-width: 0; border: 0"
                                    height="auto"
                                    width="50"
                                    src="https://lh3.googleusercontent.com/u/7/drive-viewer/AFGJ81rhkUEKJQsD27mAvgiMRoZogexycNXD1_lkyRdIlZFfIm7taCrxpCCj9sZO3BBU56J03ANzAlPcJGfuPX73DO-3hLZO6w=w1205-h1206"
                                  />
                                </td>
                                <td
                                  valign="center"
                                  style="
                                    border-collapse: collapse;
                                    padding: 0 5px 0 15px;
                                    text-align: left;
                                  "
                                  class="main-footer-left"
                                >
                                  <p
                                    style="
                                      font-size: 10px !important;
                                      font-family: arial, helvetica, sans-serif;
                                      color: #666666;
                                      line-height: 1.2;
                                    "
                                  >
                                    This email was sent by 10 Steps Ahead Financial
                                    LLC, headquartered at 2520 NW 97th Ave, Suite 120,
                                    Doral, FL 33173, for the exclusive use of the
                                    intended recipient. If you're not the intended
                                    recipient delete this email. Confidentiality and
                                    privilege apply. The sender is not responsible for
                                    transmission errors.
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <table>
</div>`;

  // Post email to serverless func
  try {
    // create email with gmail API
    const raw = createEmail(customerEmail, 'Health Care <healthcare@10sa.org>', 'Know Your Benefits', emailTemplate);
    const encodedMessage = Buffer.from(raw).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

    // send email
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    res.status(200).send('Email sent successfully');
  } catch (error: any) {
    console.error('Failed to send email:', error);
    res.status(500).json({ error: error.message });
  }
};

function createEmail(to: string, from: string, subject: string, message: string) {
  const email = `Content-Type: text/html; charset="UTF-8"
MIME-Version: 1.0
Content-Transfer-Encoding: 7bit
to: ${to}
from: ${from}
subject: ${subject}

${message}`;

  return email;
}

export default email;
