import { commonMessages } from './message.util';

export const userOtpSubject = 'Subby Email Verification';
export const verificationMessage = function (firstName: string, otp: string) {
  return `
    <table border="0" cellpadding="10" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#fd582d;margin-top:20px;" id="bodyTable">
    
        </table>
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:1280px">
            <tbody>
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#fd582d;border-style:solid;border-width:0 1px 1px 1px;">
                            <tbody>
                                <tr>
                                    <td style="background-color:#fd582d;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle">
                                        <h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:600;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0;margin-top:40px;">Hi ${firstName}</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle">
                                        <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0">OTP Email Verification</h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style="">  
                                            <tbody>
                                                <tr>
                                                    <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                                                        <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0"> Congratulations! You're almost set. Enter the sign up OTP to get started.</p></p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton" style="">
                                            <tbody>
                                                <tr>
                                                    <td style="padding-top:20px;padding-bottom:20px" align="center" valign="top">
                                                        <table border="0" cellpadding="0" cellspacing="0" align="center">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="background-color: #fd582d; padding: 12px 35px; border-radius: 10px;" align="center" class="ctaButton"> <a href="#" style="color:#fff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:20px;font-weight:600;font-style:normal;letter-spacing:1px;line-height:20px;text-transform:none;text-decoration:none;display:block" target="_blank" class="text">${otp}</a>
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
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperFooter" style="max-width:1280px">
            <tbody>
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="footer">
                            <tbody>
                                <tr>
                                    <td style="padding: 10px 10px 5px;" align="center" valign="top" class="brandInfo">
                                        <p class="text" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0">©&nbsp;Subby Ltd.</p>
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
};

export const WelcomeToFamilySubject = (familyName: string) => {
  return commonMessages.fn.familyName(familyName);
};
export const WelcomeCredientMessage = function (
  userName: string,
  familyName: string,
  email: string,
  password: string,
  loginLink: string,
) {
  return `
    <table border="0" cellpadding="10" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#fd582d;margin-top:20px;" id="bodyTable">
    
        </table>
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:1280px">
            <tbody>
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#fd582d;border-style:solid;border-width:0 1px 1px 1px;">
                            <tbody>
                                <tr>
                                    <td style="background-color:#fd582d;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style="">
                                            <tbody>
                                                <tr>
                                                    <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                                                        <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;
                                                        font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">
                                                        Dear ${userName}, </br>

                                                        We want to extend a warm welcome to you! We are thrilled to have you join ${familyName},<br/>
                                                        
                                                        As a new community member, you now have access to the services, benefits, and opportunities.<br/>
                                                        
                                                        To get started, please find your login credentials below:<br/>
                                                        
                                                        Email: ${email},<br/>
                                                        Password: ${password}<br/>
                                                        
                                                        OR FOR LINK:<br/>
                                                        
                                                        With these credentials, you can now access our platform and begin exploring everything [App Name] has to offer.<br/>
                                                        Click on the link below to log in and start your journey:<br/>
                                                        
                                                        ${loginLink},<br/>
                                                        
                                                        If you have any questions, concerns, or just want to say hello, don't hesitate to reach out. Our team is here to assist you every step of the way.<br/>
                                                        
                                                        Once again, welcome to the family! We're excited to have you on board and can't wait to see all the amazing things we'll accomplish together.<br/>
                                                        
                                                        Best regards,<br/>
                                                        
                                                        Subby App</p></p>
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
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperFooter" style="max-width:1280px">
            <tbody>
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="footer">
                            <tbody>
                                <tr>
                                    <td style="padding: 10px 10px 5px;" align="center" valign="top" class="brandInfo">
                                        <p class="text" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0">©&nbsp;Subby Ltd.</p>
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
};
