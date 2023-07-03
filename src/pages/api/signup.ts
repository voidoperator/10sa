import admin from '@/firebase/firebaseAdmin';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as sgMail from '@sendgrid/mail';

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, agency } = req.body;

  try {
    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      emailVerified: false,
    });

    // Send verification email
    const link = await admin.auth().generateEmailVerificationLink(email);

    let emailTemplate = `<table
    cellpadding="0"
    cellspacing="0"
    border="0"
    width="100%"
    class="m_6057872153257422580wrapper"
    bgcolor="#FFFFFF"
    style="font-family: Helvetica, arial, sans-serif"
  >
    <tbody>
      <tr>
        <td valign="top" bgcolor="#FFFFFF" width="100%">
          <table width="100%" role="content-container" align="center" cellpadding="0" cellspacing="0" border="0">
            <tbody>
              <tr>
                <td width="100%">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tbody>
                      <tr>
                        <td>
                          <table
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                            style="width: 100%; max-width: 600px"
                            align="center"
                          >
                            <tbody>
                              <tr>
                                <td
                                  role="modules-container"
                                  style="padding: 0px 0px 0px 0px; color: #000000; text-align: left"
                                  bgcolor="#FFFFFF"
                                  width="100%"
                                  align="left"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    align="center"
                                    width="100%"
                                    role="module"
                                    bgcolor="#f3f3f3"
                                    style="padding: 30px 20px 30px 20px"
                                  >
                                    <tbody>
                                      <tr role="module-content">
                                        <td height="100%" valign="top">
                                          <table
                                            width="540"
                                            style="
                                              width: 540px;
                                              border-spacing: 0;
                                              border-collapse: collapse;
                                              margin: 0px 10px 0px 10px;
                                            "
                                            cellpadding="0"
                                            cellspacing="0"
                                            align="left"
                                            border="0"
                                            bgcolor=""
                                            class="m_6057872153257422580column"
                                          >
                                            <tbody>
                                              <tr>
                                                <td style="padding: 0px; margin: 0px; border-spacing: 0">
                                                  <table
                                                    class="m_6057872153257422580wrapper"
                                                    role="module"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    width="100%"
                                                    style="table-layout: fixed"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style="
                                                            font-size: 6px;
                                                            line-height: 10px;
                                                            padding: 0px 0px 0px 0px;
                                                          "
                                                          valign="top"
                                                          align="center"
                                                        >
                                                          <img
                                                            class="m_6057872153257422580max-width CToWUd"
                                                            border="0"
                                                            style="
                                                              display: block;
                                                              color: #000000;
                                                              text-decoration: none;
                                                              font-family: Helvetica, arial, sans-serif;
                                                              font-size: 16px;
                                                            "
                                                            width="67.5"
                                                            height="50"
                                                            alt=""
                                                            data-bit="iit"
                                                            src="https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81pg943wCBShSesej1icdhwqsIorMZI2lg4ptFMuL7K1zbnj0a7K7lUQ3kDdHjViE9cxqSpDIHjvFvCMuMPDqAQR6V03dA=w1242-h1297"
                                                          />
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  <table
                                                    role="module"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    width="100%"
                                                    style="table-layout: fixed"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style="padding: 0px 0px 20px 0px"
                                                          role="module-content"
                                                          bgcolor=""
                                                        ></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  <table
                                                    class="m_6057872153257422580wrapper"
                                                    role="module"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    width="100%"
                                                    style="table-layout: fixed"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style="
                                                            font-size: 6px;
                                                            line-height: 10px;
                                                            padding: 0px 0px 0px 0px;
                                                          "
                                                          valign="top"
                                                          align="center"
                                                        >
                                                          <img
                                                            class="m_6057872153257422580max-width CToWUd"
                                                            border="0"
                                                            style="
                                                              display: block;
                                                              color: #000000;
                                                              text-decoration: none;
                                                              font-family: Helvetica, arial, sans-serif;
                                                              font-size: 16px;
                                                            "
                                                            width="268"
                                                            height="21"
                                                            alt=""
                                                            data-bit="iit"
                                                            src="https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81rzZEMnUuEh8oH2x2G4hf1E2QZNX0k0MdayT77RoXbTtoFqPSbsNvlPvjXRy9EtXggoUihuBHrbh9soR-q6oSPxCOxrTg=w1242-h1297"
                                                          />
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  <table
                                                    role="module"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    width="100%"
                                                    style="table-layout: fixed"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style="padding: 0px 0px 30px 0px"
                                                          role="module-content"
                                                          bgcolor=""
                                                        ></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  <table
                                                    role="module"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    width="100%"
                                                    style="table-layout: fixed"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style="
                                                            padding: 50px 30px 50px 30px;
                                                            line-height: 40px;
                                                            text-align: inherit;
                                                            background-color: #ffffff;
                                                            border-radius: 8px 8px 0px 0px;
                                                          "
                                                          height="100%"
                                                          valign="top"
                                                          bgcolor="#ffffff"
                                                          role="module-content"
                                                        >
                                                          <div>
                                                            <div style="font-family: inherit; text-align: center">
                                                              <span
                                                                style="
                                                                  font-family: inherit;
                                                                  font-size: 24px;
                                                                  color: #c90e0e;
                                                                "
                                                                >Thank you for signing up for DoublePlay!</span
                                                              >
                                                            </div>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  <table
                                                    role="module"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    width="100%"
                                                    style="table-layout: fixed"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style="
                                                            padding: 18px 20px 18px 20px;
                                                            line-height: 37px;
                                                            text-align: inherit;
                                                            background-color: #ffffff;
                                                            border-radius: 0px 0px 8px 8px;
                                                          "
                                                          height="100%"
                                                          valign="top"
                                                          bgcolor="#ffffff"
                                                          role="module-content"
                                                        >
                                                          <div>
                                                            <div style="font-family: inherit; text-align: center">
                                                              <span style="font-size: 18px"
                                                                >Please click the button below to verify your email
                                                                address&nbsp;</span
                                                              >
                                                            </div>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  <table
                                                    role="module"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    width="100%"
                                                    style="table-layout: fixed; margin-top: 25px"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style="
                                                            padding: 0px 0px 30px 0px;
                                                            border-radius: 8px 8px 0px 0px;
                                                          "
                                                          role="module-content"
                                                          bgcolor="#292929"
                                                        ></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  <table
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    role="module"
                                                    style="table-layout: fixed"
                                                    width="100%"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          align="center"
                                                          bgcolor="#292929"
                                                          style="padding: 0px 0px 0px 0px; background-color: #292929"
                                                        >
                                                          <table
                                                            border="0"
                                                            cellpadding="0"
                                                            cellspacing="0"
                                                            class="m_6057872153257422580wrapper-mobile"
                                                            style="text-align: center"
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td
                                                                  align="center"
                                                                  bgcolor="#ffbe00"
                                                                  style="
                                                                    border-radius: 6px;
                                                                    font-size: 16px;
                                                                    text-align: center;
                                                                    background-color: inherit;
                                                                  "
                                                                >
                                                                  <a
                                                                    target="_blank"
                                                                    href="${link}"
                                                                    style="
                                                                      background-color: #ffbe00;
                                                                      border: 1px solid #ffbe00;
                                                                      border-color: #ffbe00;
                                                                      border-radius: 0px;
                                                                      border-width: 1px;
                                                                      color: #000000;
                                                                      display: inline-block;
                                                                      font-size: 14px;
                                                                      font-weight: normal;
                                                                      letter-spacing: 0px;
                                                                      line-height: normal;
                                                                      padding: 12px 40px 12px 40px;
                                                                      text-align: center;
                                                                      text-decoration: none;
                                                                      border-style: solid;
                                                                      font-family: inherit;
                                                                      border-radius: 8px;
                                                                      cursor: pointer;
                                                                      user-select: none;
                                                                    "
                                                                    >Verify Your Email</a
                                                                  >
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  <table
                                                    role="module"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    width="100%"
                                                    style="table-layout: fixed"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style="
                                                            padding: 0px 0px 30px 0px;
                                                            border-radius: 0px 0px 8px 8px;
                                                          "
                                                          role="module-content"
                                                          bgcolor="292929"
                                                        ></td>
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
  `;

    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: 'Verify your email for DoublePlay',
      html: `${emailTemplate}`,
    };

    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    try {
      await sgMail.send(msg);
      console.log('Email sent');
    } catch (error) {
      console.error(error);
    }

    // init user with form info
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: email,
      agency: agency,
      SID: '',
    });

    res.status(200).json({ userStatus: 'init' });
  } catch (error: unknown) {
    res.status(400).json({ error });
  }
};

export default signup;
