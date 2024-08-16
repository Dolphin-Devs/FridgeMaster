from django.db import models
from .user import user
from .fridge import fridge
from .fridge_image import fridge_image

# This is the Fridge which the user has the specific name
class user_fridge(models.Model):
    UserFridgeID = models.AutoField(primary_key=True)
    UserID = models.ForeignKey(user, on_delete=models.CASCADE, null=False, blank=False)
    FridgeID = models.ForeignKey(fridge, on_delete=models.CASCADE, null=False, blank=False)
    FridgeImageID = models.OneToOneField(fridge_image,on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return str(self.UserFridgeID)
    
    class Meta:
        db_table = 'user_fridge'