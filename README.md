# Django Toastify

A modern, highly customizable toast notification system for Django, inspired by React Toastify. It integrates seamlessly with `django.contrib.messages` and provides a clean, responsive UI with smooth animations.

## Features

- **React Toastify Aesthetic:** Professional look and feel with smooth slide and fade animations.
- **Django Integration:** Automatically displays `django.contrib.messages`.
- **Customizable:** Change position, duration, theme, and more via `settings.py`.
- **Progress Bars:** Visual indication of auto-dismiss time.
- **Interactive:** Pause on hover, close button, and responsive mobile support.
- **Stackable:** Smart stacking with a configurable limit to prevent screen clutter.
- **JavaScript API:** Trigger toasts manually from your own scripts.
- **Theme Support:** Built-in Light and Dark themes.

## Installation

1. Install the package using pip:
   ```bash
   pip install django-toastify
   ```
   *(Note: If you are developing locally, use `pip install -e .`)*

2. Add `django_toastify` to your `INSTALLED_APPS` in `settings.py`:
   ```python
   INSTALLED_APPS = [
       ...
       'django_toastify',
       ...
   ]
   ```

## Configuration

You can customize the global behavior by adding a `TOASTIFY` dictionary to your `settings.py`. Here are all the available options with their defaults:

```python
# settings.py

TOASTIFY = {
    "POSITION": "top-right",  # "top-right", "top-left", "bottom-right", "bottom-left"
    "DURATION": 3000,         # Time in milliseconds before auto-dismiss
    "MAX_TOASTS": 5,          # Maximum number of toasts shown at once
    "THEME": "light",         # "light" or "dark"
}
```

### Available Options Detail:

| Key | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `POSITION` | String | `"top-right"` | Corner where toasts appear. |
| `DURATION` | Integer | `3000` | Auto-dismiss delay in ms. Set to `0` to disable (manual close only). |
| `MAX_TOASTS` | Integer | `5` | Limits the number of toasts in the stack. |
| `THEME` | String | `"light"` | Visual style: `"light"` or `"dark"`. |

### Template Tag Overrides

You can also override these settings for specific pages directly in the template tag:

```html
{% show_toasts position="bottom-left" theme="dark" duration=5000 %}
```

## Usage

### In Templates

1. Load the tags and add `show_toasts` to your base template (usually right before `</body>`):

   ```html
   {% load toast_tags %}

   ...

   {% show_toasts %}
   </body>
   ```

This will automatically render any messages sent via `messages.success()`, `messages.error()`, etc.

### JavaScript API

You can also trigger toasts manually in your JavaScript code:

```javascript
showToast({
    type: 'success',       // success, error, warning, info
    message: 'Hello!',     // The message text
    title: 'Greeting',     // Optional title
    duration: 5000         // Optional custom duration
});
```

## Requirements

- Django >= 3.2
- Modern Browser (No IE support)

## License

MIT
