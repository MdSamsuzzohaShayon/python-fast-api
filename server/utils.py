import smtplib, ssl
from config import Settings
from email.message import EmailMessage
from email.utils import make_msgid
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

setting = Settings()

def send_email(send_email_list, subject, text, html):
    # set your email and password
    message = MIMEMultipart("alternative")
    message["Subject"] = subject
    message["From"] = setting.admin_email
    email_list = ""
    for email_item in send_email_list:
        email_list += f"{email_item}, "
    message["To"] = email_list

    # Turn these into plain/html MIMEText objects
    add_text = MIMEText(text, "plain")
    add_html = MIMEText(html, "html")

    # Add HTML/plain-text parts to MIMEMultipart message
    # The email client will try to render the last part first
    message.attach(add_text)
    message.attach(add_html)

    try:
        # send email
        with smtplib.SMTP_SSL(setting.admin_email_host, 465) as smtp:
            smtp.login(setting.admin_email, setting.admin_email_password)
            smtp.sendmail(
                setting.admin_email, email_list, message.as_string()
            )
        print("Email is been sent")
    except smtplib.SMTPException as e:
        print(e)

# send_email(['mdsamsuzzoha5222@gmail.com'], "anything", "This is text", "<h1>This is html</h1>")