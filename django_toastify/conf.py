from django.conf import settings

DEFAULTS = {
    "POSITION": "top-right",
    "DURATION": 3000,
    "MAX_TOASTS": 3,
    "THEME": "light",
}

def get_setting(name):
    user_settings = getattr(settings, "TOASTIFY", {})
    return user_settings.get(name, DEFAULTS[name])