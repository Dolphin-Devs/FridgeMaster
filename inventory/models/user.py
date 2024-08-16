from django.db import models

# User Information
class user(models.Model):
    UserID = models.AutoField(primary_key=True)
    Email = models.CharField(max_length=50, null=False, blank=False)
    UserName = models.CharField(max_length=50, null=False, blank=False)
    Password = models.CharField(max_length=20, null=False, blank=False)
    Pro = models.BooleanField(default=False) # True: Paid, False: Unpaid
    Role = models.BooleanField(default=False) # True: Admin, False: User
    Block = models.BooleanField(default=False) # True: Blocked, False: Unblocked

    def __str__(self):
        return str(self.UserID)

    class Meta:
        db_table = 'user'