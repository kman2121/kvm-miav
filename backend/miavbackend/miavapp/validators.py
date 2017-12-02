from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _

def validate_job_type(value):
    if value not in ['haul', 'move']:
        raise ValidationError(
            _('%(value)s is not a valid job type'),
            params={'value': value},
        )

def validate_status(value):
    if value not in ['pending', 'in_progress', 'completed']:
        raise ValidationError(
            _('%(value)s is not a valid status'),
            params={'value': value},
        )
