from django import template
from django_toastify.conf import get_setting

register = template.Library()

@register.inclusion_tag('django_toastify/toast.html', takes_context=True)
def show_toasts(context, position=None, duration=None, max_toasts=None, theme=None):
    return {
        "messages": context.get("messages", []),
        "position": position or get_setting("POSITION"),
        "duration": duration or get_setting("DURATION"),
        "max_toasts": max_toasts or get_setting("MAX_TOASTS"),
        "theme": theme or get_setting("THEME"),
    }
