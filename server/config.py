from pydantic import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Awesome API"
    admin_email: str
    admin_email_password: str
    frontend_url: str
    session_secret: str
    admin_email_host: str

    class Config:
        # env_file = ".env"
        env_file = ".env"