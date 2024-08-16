from django.db import models
from .user import user

# The user security questions
class pro(models.Model):
    ProID = models.AutoField(primary_key=True)
    UserID = models.OneToOneField(user,on_delete=models.CASCADE, null=False, blank=False)
    StartDate = models.DateTimeField(blank=False, null=False)
    ExpireDate = models.DateTimeField(blank=False, null=False)
    SubscriptionType = models.BooleanField(default=False) # True: Yearly, False: montly

    def __str__(self):
        return str(self.ProID)
    
    class Meta:
        db_table = 'pro'