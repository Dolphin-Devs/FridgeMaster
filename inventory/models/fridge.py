from django.db import models
from .fridge_image import FridgeImage

# Fridges, Freezers, Pantries
class Fridge(models.Model):
    FridgeID = models.AutoField(primary_key=True)
    FridgeImageID = models.OneToOneField(FridgeImage,on_delete=models.CASCADE, null=True, blank=True)
    FridgeName = models.CharField(max_length=20, null=False, blank=False)
    
    def __str__(self):
        return str(self.FridgeID)
    
    class Meta:
        db_table = 'fridge'