from django.db import models
from .user import User
from .fridge import Fridge
from .fridge_image import FridgeImage

# This is the Fridge which the user has the specific name
class UserFridge(models.Model):
    UserFridgeID = models.AutoField(primary_key=True)
    UserID = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    FridgeID = models.ForeignKey(Fridge, on_delete=models.CASCADE, null=False, blank=False)
    FridgeImageID = models.OneToOneField(FridgeImage,on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return str(self.FridgeID)
    
    class Meta:
        db_table = 'user_fridge'