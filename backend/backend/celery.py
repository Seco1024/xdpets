from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks(['match'])

app.conf.beat_schedule = {
    'check-preferences-every-minute': {
        'task': 'match.tasks.check_preferences_and_send_emails',
        'schedule': crontab(),
    },
}